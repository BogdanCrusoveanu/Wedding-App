import { Guest } from "../types/guestListTypes";

const GuestListItem: React.FC<{
  guest: Guest;
  onGuestClick: (guest: Guest) => void;
}> = ({ guest, onGuestClick }) => (
  <li
    onClick={() => onGuestClick(guest)}
    className={`p-4 rounded-lg transition-all duration-200 flex justify-between items-center cursor-pointer ${
      guest.seated
        ? "bg-gray-100 text-gray-400 line-through hover:bg-gray-200"
        : "bg-gray-50 hover:bg-purple-100 hover:shadow-md"
    }`}
  >
    {guest.name}
  </li>
);

export default GuestListItem;
