import PieChart from "./PieChart";

const StatsView: React.FC<{
  seatedCount: number;
  totalCount: number;
  tableCount: number;
}> = ({ seatedCount, totalCount, tableCount }) => (
  <div className="h-80 flex flex-col items-center justify-center p-4 border-t border-b border-gray-200 animate-fade-in">
    {totalCount > 0 ? (
      <>
        <PieChart seated={seatedCount} total={totalCount} />
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-700">
            <strong className="font-semibold text-gray-900">
              {totalCount}
            </strong>{" "}
            Invitați
          </p>
          <p className="text-gray-700">
            <strong className="font-semibold text-gray-900">
              {tableCount}
            </strong>{" "}
            Mese
          </p>
        </div>
      </>
    ) : (
      <p className="text-center text-gray-500">
        Nu sunt date disponibile despre invitați pentru statistici.
      </p>
    )}
  </div>
);

export default StatsView;
