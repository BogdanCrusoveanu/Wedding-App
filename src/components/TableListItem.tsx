import { TableInfo } from "../types/guestListTypes";

const TableListItem: React.FC<{
  table: TableInfo;
  onTableClick: (tableNumber: number) => void;
}> = ({ table, onTableClick }) => (
  <li
    onClick={() => onTableClick(table.tableNumber)}
    className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-purple-100 hover:shadow-md transition-all duration-200 flex justify-between items-center"
  >
    <span className="font-bold text-lg text-purple-800">
      Masa {table.tableNumber}
    </span>
    <span className="text-sm text-gray-600 bg-gray-200 rounded-full px-2 py-1">
      {table.seatedCount} / {table.guests.length} așezați
    </span>
  </li>
);

export default TableListItem;
