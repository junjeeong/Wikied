import Bold from "../../public/icons/ic_bold.svg";
import Italic from "../../public/icons/ic_italic.svg";
import Underline from "../../public/icons/ic_underline.svg"

const CustomToolbar = () => (
  <div id="toolbar">
    <button className="ql-bold" aria-label="Bold">
      <Bold width={24} height={24} />
    </button>
    <button className="ql-italic" aria-label="Italic"></button>
    <Italic width={24} height={24} />
    {/* <button className="ql-underline" aria-label="Underline"></button>
    <button className="ql-align" value="" aria-label="Align Left">
      <img src="/icons/align-left.svg" alt="Align Left" />
    </button>
    <button className="ql-align" value="center" aria-label="Align Center">
      <img src="/icons/align-center.svg" alt="Align Center" />
    </button>
    <button className="ql-align" value="right" aria-label="Align Right">
      <img src="/icons/align-right.svg" alt="Align Right" />
    </button>
    <select className="ql-color"></select>
    <select className="ql-background"></select>
    <button className="ql-image" aria-label="Image"></button> */}
  </div>
);

export default CustomToolbar;