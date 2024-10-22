interface LandingTextsProps {
  texts: {
    subtitle: string;
    line1: string;
    line2: string;
  };
  textAlign?: "left" | "right";
  mode?: "light" | "dark";
}

const LandingTexts = ({
  texts,
  textAlign = "left",
  mode = "light",
}: LandingTextsProps) => {
  return (
    <div className={`${textAlign === "left" ? "text-left" : "text-right"}`}>
      <p className="text-[10px] leading-[11.5px] font-bold text-green200">
        {texts.subtitle}
      </p>
      <p
        className={`${
          mode === "light" ? "text-gray500" : "text-gray50"
        } text-lg leading-[18.4px] mt-[10px]`}
      >
        {texts.line1}
        <br />
        {texts.line2}
      </p>
    </div>
  );
};

export default LandingTexts;
