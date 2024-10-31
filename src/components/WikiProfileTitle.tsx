import CustomLinkContainer from "@/containers/CustomLinkContainer";

interface UserName {
  name: string;
}

const WikiProfileTitle = ({ name }: UserName) => {
  return (
    <div className="flex flex-col w-full gap-8 Mobile:gap-6">
      <p className="text-5xl font-semibold Mobile:text-3xl">{name}</p>
      <CustomLinkContainer />
    </div>
  );
};

export default WikiProfileTitle;
