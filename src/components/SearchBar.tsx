const SearchBar: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClear: () => void;
}> = ({ searchTerm, onSearchChange, onClear }) => (
  <div className="relative mb-4">
    <input
      type="text"
      placeholder="Search by name or table number..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
    />
    {searchTerm && (
      <button
        onClick={onClear}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        aria-label="Clear search"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    )}
  </div>
);

export default SearchBar;
