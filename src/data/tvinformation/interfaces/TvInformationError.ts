export default class TvInformationError extends Error {
  constructor(
    message: string,
    public readonly body: string
    ) {
    super(`TvInformationError: ${message}\n${body}`);
  }
}
