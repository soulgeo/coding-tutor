import { useEffect, useEffectEvent, useState } from "react";
import Layout from "../layout/Layout";
import AutoGrid from "../ui/AutoGrid";
import { getCurrentUser } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import type { UserData } from "../../context/UserData";

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const units = [
    {
      name: "Unit 1",
      description: "Your First Python Program",
      exercisesTotal: 10,
      exercisesComplete: 6,
    },
    {
      name: "Unit 2",
      description: "Your First Python Program",
      exercisesTotal: 10,
      exercisesComplete: 2,
    },
    {
      name: "Unit 3",
      description: "Your First Python Program",
      exercisesTotal: 10,
      exercisesComplete: 0,
    },
    {
      name: "Unit 4",
      description: "Your First Python Program",
      exercisesTotal: 10,
      exercisesComplete: 0,
    },
    {
      name: "Unit 5",
      description: "Your First Python Program",
      exercisesTotal: 10,
      exercisesComplete: 0,
    },
  ]

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
      console.log("User is not logged in");
    }
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Layout>
      {userData ? (
        <>
          <div className="text-center font-bold text-4xl mt-10 mb-5">
            {userData.displayName}'s Dashboard
          </div>
          <div className="text-center text-lg mb-10">Continue where you left off...</div>
          <AutoGrid
            units={units}
          ></AutoGrid>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};
export default DashboardPage;
