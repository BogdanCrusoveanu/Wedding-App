const Seeder: React.FC<{
  onSeed: () => void;
  isSeeding: boolean;
  isAuthReady: boolean;
}> = ({ onSeed, isSeeding, isAuthReady }) => (
  <div className="mt-6 text-center">
    <p className="text-sm text-gray-600 mb-3">Your guest list is empty.</p>
    <button
      onClick={onSeed}
      disabled={isSeeding || !isAuthReady}
      className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:bg-blue-300 disabled:cursor-wait"
    >
      {isSeeding
        ? "Adding Guests..."
        : !isAuthReady
        ? "Authenticating..."
        : "Add Sample Guests"}
    </button>
  </div>
);

export default Seeder;
