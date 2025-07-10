import { Guest } from "../types/guestListTypes";
import Avatar from "./Avatar";

interface GuestModalProps {
  guest: Guest | null;
  onClose: () => void;
  onMarkSeated: (id: string) => void;
  onResetSeating: (id: string) => void;
}

const GuestModal: React.FC<GuestModalProps> = ({
  guest,
  onClose,
  onMarkSeated,
  onResetSeating,
}) => {
  if (!guest) return null;

  return (
    // The semi-transparent background overlay.
    // The flex container for centering is now applied only on small screens and up.
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 sm:flex sm:items-center sm:justify-center sm:p-4">
      {/* The modal panel.
              On mobile (default), it takes the full width and height and uses flex to center its own content.
              On small screens and up (sm:), it reverts to a standard card with auto height and max-width.
            */}
      <div className="bg-white w-full h-full flex flex-col justify-center p-6 text-center shadow-xl transform transition-transform duration-300 sm:h-auto sm:max-w-sm sm:rounded-2xl sm:p-8">
        <div className="flex justify-center mb-4">
          <Avatar name={guest.name} size="lg" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{guest.name}</h2>
        <p className="text-lg text-gray-600">Stă la</p>
        <p className="text-5xl font-bold text-purple-600 my-4">
          Masa {guest.table}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {guest.seated ? (
            <button
              onClick={() => onResetSeating(guest.id)}
              className="w-full font-medium bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors"
            >
              Resetează
            </button>
          ) : (
            <button
              onClick={() => onMarkSeated(guest.id)}
              className="w-full font-medium bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors border-2 border-green-700"
            >
              Așează la masă
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full font-medium bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            Închide
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
