import { ReactNode } from "react";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function LightGalleryWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <LightGallery
      onInit={onInit}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      elementClassNames="row"
    >
      {children}
    </LightGallery>
  );
}
