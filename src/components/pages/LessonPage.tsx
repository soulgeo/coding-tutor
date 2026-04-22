import { useParams } from "react-router";
import Layout from "../layout/Layout";
import CodeEditor, { DEFAULT_CODE } from "../ui/CodeEditor";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Lesson } from "../../data/courseData";
import { db } from "../../firebase";
import MarkdownRenderer from "../ui/MarkdownRenderer";
import { executePythonCode } from "../../api/codeService.ts";
import { getCurrentUser } from "../../context/AuthContext.tsx";
import { useUnits } from "../../context/UnitContext.tsx";
import Loading from "../ui/Loading";
import toast from "react-hot-toast";
import LessonNavigation from "../ui/LessonNavigation";
import type { UserData } from "../../data/userData";

const SUCCESS_MESSAGES = [
  "Correct!",
  "Spot on!",
  "You nailed it!",
  "Awesome job!",
  "Great work!",
  "Keep it up!",
];

const LessonPage = () => {
  const { unitId, id } = useParams();
  const { loading: unitsLoading } = useUnits();
  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [code, setCode] = useState("");
  const [stdout, setStdout] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let active = true;

    const loadLessonData = async () => {
      if (!id) return;

      const docRef = doc(db, "lessons", id);
      const docSnap = await getDoc(docRef);

      if (active) {
        if (docSnap.exists()) {
          const data = docSnap.data() as Lesson;
          setLessonData(data);
          setCode(data.pretypedCode || DEFAULT_CODE);
          setStdout(""); // Reset stdout for new lesson
        } else {
          console.error(`Lesson with id ${id} doesn't exist`);
        }
      }
    };

    loadLessonData();

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    let active = true;

    const fetchProgress = async () => {
      const user = await getCurrentUser();
      if (!user || !unitId || !id) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (active && userDocSnap.exists()) {
        const userData = userDocSnap.data() as UserData;
        const completedLessons =
          userData.unitsProgress?.[unitId]?.completedLessons || [];
        setIsCompleted(completedLessons.includes(id));
      }
    };

    fetchProgress();

    return () => {
      active = false;
    };
  }, [unitId, id]);

  const runCode = async () => {
    setLoading(true);
    try {
      const stdout = await executePythonCode(code);
      setStdout(stdout);
      setLoading(false);
    } catch (error) {
      console.error("Run Error:", error);
    }
  };

  const submitCode = async () => {
    try {
      const user = await getCurrentUser();
      if (user === null || !id || !unitId) return;

      const stdout = await executePythonCode(code);

      if (stdout.trim() === lessonData?.expectedOutput.trim()) {
        const randomMessage =
          SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
        toast.success(randomMessage);
        await updateDoc(doc(db, "users", user.uid), {
          [`unitsProgress.${unitId}.completedLessons`]: arrayUnion(id),
        });
        setIsCompleted(true);
      } else {
        toast.error(`Incorrect, try again.`);
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <Layout fullWidth={true}>
      {lessonData && !unitsLoading ? (
        <>
          <LessonNavigation
            unitId={unitId}
            lessonId={id}
            currentLesson={lessonData}
            isCompleted={isCompleted}
          />
          <div className="flex flex-col md:flex-row w-full gap-4 p-4 md:h-180">
            <div className="bg-base-100 w-full h-full flex-1 p-4 md:overflow-y-auto mb-4 rounded-lg">
              <MarkdownRenderer content={lessonData.content} />
            </div>
            <div className="w-full md:w-32 flex-1 flex flex-col gap-0">
              <div className="h-3/5">
                <CodeEditor
                  pretypedCode={lessonData.pretypedCode}
                  value={code}
                  onChange={setCode}
                />
              </div>
              <div className="flex flex-row gap-2 py-4">
                <button
                  onClick={runCode}
                  className="btn btn-primary rounded-full"
                >
                  Run
                </button>
                <button
                  onClick={submitCode}
                  className={`btn ${isCompleted ? "btn-primary" : "btn-accent"} rounded-full`}
                >
                  Submit
                </button>
              </div>
              <div className="h-2/5 bg-base-200 p-4 rounded-lg font-mono overflow-auto whitespace-pre-wrap break-all min-h-40">
                {loading ? <Loading size="sm" /> : stdout}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default LessonPage;
