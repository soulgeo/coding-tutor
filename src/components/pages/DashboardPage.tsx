import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import UnitsGrid from "../ui/UnitsGrid";
import { getCurrentUser } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import type { UserData } from "../../data/userData";
import { useUnits } from "../../context/UnitContext";
import Loading from "../ui/Loading";
import Statistics from "../ui/Statistics";

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { units, loading: unitsLoading } = useUnits();

  useEffect(() => {
    let active = true;

    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        if (user === null) {
          return;
        }
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (active) {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          } else {
            console.error("User document does not exist in Firestore");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Layout>
      {userData && units && !unitsLoading ? (
        <>
          <div className="text-center font-bold text-4xl mt-10 mb-5">
            {userData.displayName}'s Dashboard
          </div>
          <div className="text-center text-lg mb-10">
            Continue where you left off...
          </div>
          <div className="w-full mb-10">
            <UnitsGrid
              units={units}
              unitsProgress={userData.unitsProgress}
            ></UnitsGrid>
          </div>
          <Statistics userData={userData} units={units} />
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};
export default DashboardPage;
