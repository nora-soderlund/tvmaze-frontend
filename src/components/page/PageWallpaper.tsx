import "./PageWallpaper.css";

type PageWallpaperProps = {
  image: string;
  "data-testid"?: string;
};

export default function PageWallpaper({ image, "data-testid": dataTestId }: PageWallpaperProps) {
  return (
    <div className="page-wallpaper" data-testid={dataTestId}>
      <div className="page-wallpaper-filter" style={{
        backgroundImage: `url(${image})`
      }}/>
    </div>
  )
};
