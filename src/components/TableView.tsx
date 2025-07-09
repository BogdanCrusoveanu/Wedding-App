import { TableInfo } from "../types/guestListTypes";
import TableListItem from "./TableListItem";

const TableView: React.FC<{
  tables: TableInfo[];
  loading: boolean;
  onTableClick: (tableNumber: number) => void;
}> = ({ tables, loading, onTableClick }) => (
  <div className="h-80 overflow-y-auto pr-2 border-t border-b border-gray-200 animate-fade-in">
    {loading ? (
      <p className="text-center text-gray-500 py-10">Se Încarcă...</p>
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
);

export default TableView;
