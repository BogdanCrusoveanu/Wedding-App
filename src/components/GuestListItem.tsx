import { Guest } from "../types/guestListTypes";
import Avatar from "./Avatar";

const GuestListItem: React.FC<{
  guest: Guest;
  onGuestClick: (guest: Guest) => void;
}> = ({ guest, onGuestClick }) => (
  <li
    onClick={() => onGuestClick(guest)}
    className={`p-3 rounded-lg transition-all duration-200 flex items-center gap-4 cursor-pointer ${
      guest.seated
        ? "bg-gray-100 opacity-50"
        : "bg-gray-50 hover:bg-purple-100 hover:shadow-md"
    }`}
  >
    <Avatar name={guest.name} isSeated={guest.seated} />
    <div className="flex-grow">
      <span
        className={`font-medium text-gray-800 ${
          guest.seated ? "line-through" : ""
        }`}
      >
        {guest.name}
      </span>
    </div>
    <span className="text-sm text-gray-500">Masa {guest.table}</span>
  </li>
);

export default GuestListItem;
