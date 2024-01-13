import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PageHeader from "../../components/page/PageHeader";
import TvInformationShowMock from "../data/interfaces/TvInformationShow.mock.json";
import TvmazeDataSource from "../../data/tvinformation/sources/tvmaze/TvmazeDataSource";
import { act } from "react-dom/test-utils";
import { redirect } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  redirect: jest.fn()
}));

describe("PageHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should enable the search visibility on click", () => {
    render(<PageHeader/>);

    const searchIconElement = screen.getByTestId("icon-magnifying-glass");
    expect(searchIconElement).toBeInTheDocument();

    fireEvent.click(searchIconElement);

    const headerElement = screen.getByTestId("header");
    expect(headerElement.classList.contains("page-header-transitioned")).toBeTruthy();
  });

  test("Should disable the search visibility on click", () => {
    render(<PageHeader/>);

    const searchIconElement = screen.getByTestId("icon-magnifying-glass");
    expect(searchIconElement).toBeInTheDocument();

    fireEvent.click(searchIconElement);

    const closeIconElement = screen.getByTestId("icon-times");
    expect(closeIconElement).toBeInTheDocument();

    fireEvent.click(closeIconElement);

    const headerElement = screen.getByTestId("header");
    expect(headerElement.classList.contains("page-header-transitioned")).toBeFalsy();
  });

  describe("Search changes", () => {
    beforeEach(async () => {
      const result = render(<PageHeader/>);

      jest.spyOn(TvmazeDataSource.prototype, "getShowsByQuery").mockResolvedValueOnce([ TvInformationShowMock ]);
  
      const searchIconElement = screen.getByTestId("icon-magnifying-glass");
      expect(searchIconElement).toBeInTheDocument();
  
      fireEvent.click(searchIconElement);
  
      const inputElement = screen.getByTestId("input");
      expect(inputElement).toBeInTheDocument();
  
      await act(async () => {
        jest.useFakeTimers();
  
        fireEvent.change(inputElement, {
          target: {
            value: "Example"
          }
        });
  
        jest.runAllTimers();
      });
  
      await waitFor(() => expect(result.getByText("Search results")).toBeInTheDocument());
    });

    test("Should get shows from TvmazeDataSource on dynamic input change", async () => {
      expect(TvmazeDataSource.prototype.getShowsByQuery).toHaveBeenCalledWith("Example", expect.any(AbortSignal));
    });

    test("Should redirect to the show page on show thumbnail click", async () => {
      const showThumbnailElement = screen.getByTestId("show-thumbnail");
  
      await act(async () => {
        fireEvent.click(showThumbnailElement);
      });
  
      expect(redirect).toHaveBeenCalledWith(`/shows/${TvInformationShowMock.id}`);
    });
  });

  test("Should cancel long-running requests on new requests", async () => {
    const result = render(<PageHeader/>);

    jest.useFakeTimers();
    jest.spyOn(AbortController.prototype, "abort");
    jest.spyOn(TvmazeDataSource.prototype, "getShowsByQuery").mockReturnValue(new Promise(() => {}));

    const searchIconElement = screen.getByTestId("icon-magnifying-glass");
    expect(searchIconElement).toBeInTheDocument();

    fireEvent.click(searchIconElement);

    const inputElement = screen.getByTestId("input");
    expect(inputElement).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(inputElement, {
        target: {
          value: "Example"
        }
      });

      jest.runAllTimers();
    });

    await waitFor(() => expect(result.getByTestId("loading")).toBeInTheDocument());

    await act(async () => {
      fireEvent.change(inputElement, {
        target: {
          value: "Example 2"
        }
      });

      jest.runAllTimers();
    });

    expect(AbortController.prototype.abort).toHaveBeenCalledTimes(1);
  });
});
