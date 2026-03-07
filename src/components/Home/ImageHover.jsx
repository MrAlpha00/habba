import { IMAGES } from "../../assets/Images/index";
import MediaHoverExpand from "../motion/MediaHoverExpand";

const items = [
  { type: "image", src: IMAGES.GALLERY1 },
  { type: "image", src: IMAGES.GALLERY2 },
  { type: "image", src: IMAGES.GALLERY5 },
  { type: "image", src: IMAGES.GALLERY6 },
  { type: "image", src: IMAGES.GALLERY9 },
];

export default function Gallery() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-10 px-4 py-20 sm:py-28 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl">
        <MediaHoverExpand items={items}/>
      </div>
    </div>
  );
}
