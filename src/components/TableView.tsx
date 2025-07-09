import { useEffect, useRef, useState } from "react";
import { TableInfo } from "../types/guestListTypes";
import TableListItem from "./TableListItem";
import ScrollToTopButton from "./ScrollToTopButton";

const TableView: React.FC<{
  tables: TableInfo[];
  loading: boolean;
  onTableClick: (tableNumber: number) => void;
}> = ({ tables, loading, onTableClick }) => {
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
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : (
          <ul className="space-y-3 py-3">
            {tables.map((table) => (
              <TableListItem
                key={table.tableNumber}
                table={table}
                onTableClick={onTableClick}
              />
            ))}
          </ul>
        )}
      </div>
      {showScrollButton && <ScrollToTopButton onClick={scrollToTop} />}
    </div>
  );
};

export default TableView;
