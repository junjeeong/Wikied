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
      <p className="font-bold text-green-200 text-[10px] leading-[11.5px] Tablet:text-[20px] Tablet:leading-[23px] PC:text-[30px] PC:leading-[34.5px]">
        {texts.subtitle}
      </p>
      <p
        className={`${
          mode === "light" ? "text-gray-500" : "text-gray-50"
        } text-[16px] leading-[18.4px] Mobile:mt-[10px] Tablet:text-[32px] Tablet:leading-[36.8px] mt-[20px] PC:text-[50px] PC:leading-[57.5px]`}
      >
        {texts.line1}
        <br />
        {texts.line2}
      </p>
    </div>
  );
};

export default LandingTexts;
