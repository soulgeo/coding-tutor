import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { Unit } from "../data/courseData";

interface UnitContextType {
  units: Record<string, Unit> | null;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useUnits() {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error("useUnits must be used within a UnitProvider");
  }
  return context;
}

export const UnitProvider = ({ children }: Props) => {
  const [units, setUnits] = useState<Record<string, Unit> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchUnits = async () => {
      try {
        const colRef = collection(db, "units");
        const colSnap = await getDocs(colRef);
        const unitsData = colSnap.docs.reduce(
          (acc, doc) => {
            acc[doc.id] = doc.data() as Unit;
            return acc;
          },
          {} as Record<string, Unit>,
        );
        if (active) {
          setUnits(unitsData);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchUnits();

    return () => {
      active = false;
    };
  }, []);

  const value = {
    units,
    loading,
  };

  return (
    <UnitContext.Provider value={value}>
      {children}
    </UnitContext.Provider>
  );
}
