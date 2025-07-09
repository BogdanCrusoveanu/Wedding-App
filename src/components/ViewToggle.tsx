const ViewToggle: React.FC<{
  viewMode: "guest" | "table" | "stats";
  setViewMode: (mode: "guest" | "table" | "stats") => void;
}> = ({ viewMode, setViewMode }) => (
  <div className="flex justify-center mb-4">
    <div className="flex rounded-lg bg-gray-200 p-1">
      <button
        onClick={() => setViewMode("guest")}
        className={`px-4 py-1 text-sm font-medium rounded-md transition-all ${
          viewMode === "guest"
            ? "bg-white shadow text-purple-700"
            : "text-gray-600"
        }`}
      >
        Afișează invitații
      </button>
      <button
        onClick={() => setViewMode("table")}
        className={`px-4 py-1 text-sm font-medium rounded-md transition-all ${
          viewMode === "table"
            ? "bg-white shadow text-purple-700"
            : "text-gray-600"
        }`}
      >
        Afișează mesele
      </button>
      <button
        onClick={() => setViewMode("stats")}
        className={`px-4 py-1 text-sm font-medium rounded-md transition-all ${
          viewMode === "stats"
            ? "bg-white shadow text-purple-700"
            : "text-gray-600"
        }`}
      >
        Statistici
      </button>
    </div>
  </div>
);

export default ViewToggle;
