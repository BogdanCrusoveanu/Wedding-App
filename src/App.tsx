import { useEffect, useMemo, useState } from "react";
import { Guest } from "./types/guestListTypes";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GuestList from "./components/GuestList";
import Seeder from "./components/Seeder";
import GuestModal from "./components/GuestModal";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  Firestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { getAuth, Auth, signInAnonymously } from "firebase/auth";
import { initialGuests } from "./constants/constants";
import ViewToggle from "./components/ViewToggle";
import TableView from "./components/TableView";
import StatsView from "./components/StatsView";

const animationStyle = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
`;

const firebaseConfig = {
  apiKey: "AIzaSyAAn2ghEshy9-BYoi4VL9TM3xrsKsPtiiA",
  authDomain: "wedding-app-c9832.firebaseapp.com",
  projectId: "wedding-app-c9832",
  storageBucket: "wedding-app-c9832.firebasestorage.app",
  messagingSenderId: "864535363983",
  appId: "1:864535363983:web:416947b9590a495a060bfa",
};

const appId = "1:864535363983:web:416947b9590a495a060bfa";

const App: React.FC = () => {
  const [db, setDb] = useState<Firestore | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"guest" | "table" | "stats">(
    "guest"
  );

  useEffect(() => {
    try {
      const app: FirebaseApp = initializeApp(firebaseConfig);
      const firestoreDb: Firestore = getFirestore(app);
      const auth: Auth = getAuth(app);
      setDb(firestoreDb);

      const authenticate = async () => {
        try {
          await signInAnonymously(auth);
          setUserId(auth.currentUser?.uid || "anonymous");
        } catch (error) {
          console.error("Authentication Error:", error);
          setUserId("anonymous-error");
        }
      };
      authenticate();
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!db || !userId) return;

    const guestCollectionPath = `/apps/${appId}/guests`;
    const guestCollectionRef = collection(db, guestCollectionPath);

    const unsubscribe = onSnapshot(
      guestCollectionRef,
      (snapshot) => {
        const guestData = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Guest)
        );
        setGuests(guestData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching guests:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, userId]);

  const updateGuestSeating = async (guestId: string, seatedStatus: boolean) => {
    if (!db) return;
    const guestDocRef = doc(db, `/apps/${appId}/guests`, guestId);
    try {
      await updateDoc(guestDocRef, { seated: seatedStatus });
      setSelectedGuest(null);
      setSearchTerm(""); // Reset search term after updating status
    } catch (error) {
      console.error("Error updating guest status:", error);
    }
  };

  const seedDatabase = async () => {
    if (!db) return;
    setIsSeeding(true);
    const guestCollectionPath = `/apps/${appId}/guests`;
    const guestCollectionRef = collection(db, guestCollectionPath);

    try {
      const existingGuests = await getDocs(guestCollectionRef);
      if (!existingGuests.empty) {
        console.warn("Database already contains guests. Seeding not required.");
        return;
      }
      const batch = writeBatch(db);
      initialGuests.forEach((guest) => {
        const newGuestRef = doc(guestCollectionRef);
        batch.set(newGuestRef, guest);
      });
      await batch.commit();
      console.log("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding database: ", error);
    } finally {
      setIsSeeding(false);
    }
  };

  const tables = useMemo(() => {
    const groupedByTable = guests.reduce((acc, guest) => {
      const tableNum = guest.table;
      if (!acc[tableNum]) {
        acc[tableNum] = [];
      }
      acc[tableNum].push(guest);
      return acc;
    }, {} as Record<number, Guest[]>);

    return Object.entries(groupedByTable)
      .map(([tableNumber, tableGuests]) => ({
        tableNumber: parseInt(tableNumber),
        guests: tableGuests,
        seatedCount: tableGuests.filter((g) => g.seated).length,
      }))
      .sort((a, b) => a.tableNumber - b.tableNumber);
  }, [guests]);

  const filteredAndSortedGuests = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return guests
      .filter((guest) => {
        // If search is empty, show all guests
        if (!normalizedSearch) return true;

        // Check for match in guest name
        const nameMatch = guest.name.toLowerCase().includes(normalizedSearch);

        // Check for an exact match in table number
        const tableMatch = guest.table.toString() === normalizedSearch;

        return nameMatch || tableMatch;
      })
      .sort((a, b) => {
        if (a.seated !== b.seated)
          return (a.seated ? 1 : 0) - (b.seated ? 1 : 0);
        return a.name.localeCompare(b.name);
      });
  }, [guests, searchTerm]);

  const handleTableClick = (tableNumber: number) => {
    setViewMode("guest");
    setSearchTerm(tableNumber.toString());
  };

  const seatedCount = useMemo(
    () => guests.filter((g) => g.seated).length,
    [guests]
  );

  const renderCurrentView = () => {
    switch (viewMode) {
      case "guest":
        return (
          <GuestList
            guests={filteredAndSortedGuests}
            loading={loading}
            onGuestClick={setSelectedGuest}
          />
        );
      case "table":
        return (
          <TableView
            tables={tables}
            loading={loading}
            onTableClick={handleTableClick}
          />
        );
      case "stats":
        return (
          <StatsView
            seatedCount={seatedCount}
            totalCount={guests.length}
            tableCount={tables.length}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{animationStyle}</style>
      <div className="bg-gray-100 font-sans">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <Header seatedCount={seatedCount} totalCount={guests.length} />
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onClear={() => setSearchTerm("")}
            />
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            <div key={viewMode}>{renderCurrentView()}</div>
            {guests.length === 0 && !loading && (
              <Seeder
                onSeed={seedDatabase}
                isSeeding={isSeeding}
                isAuthReady={!!userId}
              />
            )}
          </div>
        </div>
        <GuestModal
          guest={selectedGuest}
          onClose={() => setSelectedGuest(null)}
          onMarkSeated={(id) => updateGuestSeating(id, true)}
          onResetSeating={(id) => updateGuestSeating(id, false)}
        />
      </div>
    </>
  );
};

export default App;
