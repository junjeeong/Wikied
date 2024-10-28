import LinkIcon from "/public/icons/ic_link.svg";

interface CustomLinkProps {
  link: string;
  size?: "small" | "medium";
  handleClick: () => void;
}

const CustomLink = ({
  link,
  size = "medium",
  handleClick,
}: CustomLinkProps) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-[5px] w-fit px-[10px] py-[3px] rounded-[10px] bg-green-50 text-green-200 hover:bg-[#d1f0e7]"
    >
      <LinkIcon className={`${size === "medium" ? "w-5 h-5" : "w-4 h-4"}`} />
      <p className={`${size === "medium" ? "text-md" : "text-xs"}`}>{link}</p>
    </button>
  );
};

export default CustomLink;
