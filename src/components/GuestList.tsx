import { useEffect, useRef, useState } from "react";
import { Guest } from "../types/guestListTypes";
import GuestListItem from "./GuestListItem";
import ScrollToTopButton from "./ScrollToTopButton";

const GuestList: React.FC<{
  guests: Guest[];
  loading: boolean;
  onGuestClick: (guest: Guest) => void;
}> = ({ guests, loading, onGuestClick }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (listRef.current) {
      setShowScrollButton(listRef.current.scrollTop > 100);
    }
  };

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative animate-fade-in">
      <div
        ref={listRef}
        className="h-80 overflow-y-auto pr-2 border-t border-b border-gray-200"
      >
        {loading ? (
          <p className="text-center text-gray-500 py-10">
            Se încarcă lista de invitați...
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
                Nu am găsit invitați cu acest nume.
              </li>
            )}
          </ul>
        )}
      </div>
      {showScrollButton && <ScrollToTopButton onClick={scrollToTop} />}
    </div>
  );
};

export default GuestList;
