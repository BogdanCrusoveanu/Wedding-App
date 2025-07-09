import { Guest } from "../types/guestListTypes";
import GuestListItem from "./GuestListItem";

const GuestList: React.FC<{
  guests: Guest[];
  loading: boolean;
  onGuestClick: (guest: Guest) => void;
}> = ({ guests, loading, onGuestClick }) => (
  <div className="h-80 overflow-y-auto pr-2 border-t border-b border-gray-200 animate-fade-in">
    {loading ? (
      <p className="text-center text-gray-500 py-10">
        Se incarca lista de invitati...
      </p>
    ) : (
      <ul className="space-y-3 py-3">
        {guests.length > 0 ? (
          guests.map((guest) => (
            <GuestListItem
              key={guest.id}
              guest={guest}
              onGuestClick={onGuestClick}
            />
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">
            Nu exista invitati cu acest nume.
          </li>
        )}
      </ul>
    )}
  </div>
);

export default GuestList;
