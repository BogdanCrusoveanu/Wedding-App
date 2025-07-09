const Header: React.FC<{ seatedCount: number; totalCount: number }> = ({
  seatedCount,
  totalCount,
}) => (
  <header className="text-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Lista invitaților</h1>
    <p className="text-gray-500">
      Selectează invitatul dorit pentru a-i afișa masa. Poți cauta invitatul
      după nume și prenume sau poți afișa invitații de la o masă introducând
      numărul mesei.
    </p>
    {totalCount > 0 && (
      <p className="text-sm text-gray-600 mt-2 font-medium bg-gray-100 rounded-full px-3 py-1 inline-block">
        {seatedCount} / {totalCount} Invitați așezați la masă
      </p>
    )}
  </header>
);

export default Header;
