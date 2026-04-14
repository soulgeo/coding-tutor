import { useEffect, useEffectEvent, useState } from "react";
import Layout from "../layout/Layout";
import AutoGrid from "../ui/AutoGrid";
import { getCurrentUser } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import type { UserData } from "../../context/UserData";

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

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
            items={["This", "Is", "A", "Test", "And", "It", "Looks", "Right"]}
          ></AutoGrid>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};
export default DashboardPage;
