import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUnits } from "../../context/UnitContext";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from "../ui/Loading";
import Layout from "../layout/Layout";
import type { UserData } from "../../data/userData";

const ContinueLearningPage = () => {
  const navigate = useNavigate();
  const { units, loading: unitsLoading } = useUnits();
  const { currentUser, userLoggedIn, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading || unitsLoading) return;

    if (!userLoggedIn || !currentUser) {
      navigate("/");
      return;
    }

    const findFirstUncompletedLesson = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && units) {
        const userData = docSnap.data() as UserData;
        const sortedUnitIds = Object.keys(units).sort();

        for (const uId of sortedUnitIds) {
          const unit = units[uId];
          const completed = userData.unitsProgress?.[uId]?.completedLessons || [];
          for (const lId of unit.lessons) {
            if (!completed.includes(lId)) {
              navigate(`/units/${uId}/lessons/${lId}`, { replace: true });
              return;
            }
          }
        }
        // If all completed, land on unit 1 lesson 1
        if (sortedUnitIds.length > 0) {
          const firstUnitId = sortedUnitIds[0];
          const firstLessonId = units[firstUnitId].lessons[0];
          if (firstLessonId) {
            navigate(`/units/${firstUnitId}/lessons/${firstLessonId}`, {
              replace: true,
            });
            return;
          }
        }
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    };

    findFirstUncompletedLesson();
  }, [authLoading, unitsLoading, userLoggedIn, currentUser, units, navigate]);

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    </Layout>
  );
};

export default ContinueLearningPage;
