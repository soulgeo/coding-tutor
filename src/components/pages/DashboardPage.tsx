import { useEffect, useEffectEvent, useState } from "react";
import Layout from "../layout/Layout";
import UnitsGrid from "../ui/UnitsGrid";
import { getCurrentUser } from "../../context/AuthContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import type { UserData } from "../../data/userData";
import type { Unit } from "../../data/courseData";

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [units, setUnits] = useState<Record<string, Unit> | null>(null);

  const fetchUserData = useEffectEvent(async () => {
    const user = await getCurrentUser();
    if (user === null) {
      return;
    }
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data() as UserData);
    } else {
      console.error("User is not logged in");
    }
  });

  const fetchUnitData = useEffectEvent(async () => {
    const colRef = collection(db, "units");
    const colSnap = await getDocs(colRef);
    const units = colSnap.docs.reduce(
      (acc, doc) => {
        acc[doc.id] = doc.data() as Unit;
        return acc;
      },
      {} as Record<string, Unit>,
    );

    setUnits(units);
  });

  useEffect(() => {
    fetchUserData();
    fetchUnitData();
  }, []);

  return (
    <Layout>
      {userData ? (
        <>
          <div className="text-center font-bold text-4xl mt-10 mb-5">
            {userData.displayName}'s Dashboard
          </div>
          <div className="text-center text-lg mb-10">
            Continue where you left off...
          </div>
          <UnitsGrid
            units={units}
            unitsProgress={userData.unitsProgress}
          ></UnitsGrid>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};
export default DashboardPage;
