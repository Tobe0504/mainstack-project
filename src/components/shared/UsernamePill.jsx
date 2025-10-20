import Tooltip from "./Tooltip";

const UsernamePill = ({ firstName, lastName }) => {
  const firstLetter = firstName?.[0]?.toUpperCase();
  const lastLetter = lastName?.[0]?.toUpperCase();
  return (
    <Tooltip content={`${firstName} ${lastName}`} preferredPosition="bottom">
      <div className=" w-8 h-8 flex items-center justify-center rounded-full bg-gradient-1 text-mainstack-primary-white font-sans font-semibold text-sm cursor-pointer">
        {firstLetter}
        {lastLetter}
      </div>
    </Tooltip>
  );
};

export default UsernamePill;
