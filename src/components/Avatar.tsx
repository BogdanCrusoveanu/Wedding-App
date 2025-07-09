import { getInitials, stringToColor } from "../helpers/avatarHelpers";

const Avatar: React.FC<{
  name: string;
  size?: "sm" | "lg";
  isSeated?: boolean;
}> = ({ name, size = "sm", isSeated = false }) => {
  const initials = getInitials(name);
  const bgColor = stringToColor(name);
  const sizeClasses =
    size === "sm" ? "w-10 h-10 text-sm" : "w-20 h-20 text-2xl";

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${sizeClasses} ${
        isSeated ? "filter grayscale" : ""
      }`}
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
