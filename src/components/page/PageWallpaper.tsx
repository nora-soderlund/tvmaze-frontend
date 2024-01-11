import "./PageWallpaper.css";

type PageWallpaper = {
  image: string;
};

export default function PageWallpaper({ image }: PageWallpaper) {
  return (
    <div className="page-wallpaper">
      <div className="page-wallpaper-filter" style={{
        backgroundImage: `url(${image})`
      }}/>
    </div>
  )
};
