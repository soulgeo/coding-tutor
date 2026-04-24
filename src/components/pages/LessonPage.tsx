import { useParams } from "react-router";
import Layout from "../layout/Layout";
import CodeEditor, { DEFAULT_CODE } from "../ui/CodeEditor";
import { arrayUnion, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import type { Lesson } from "../../data/courseData";
import { db } from "../../firebase";
import MarkdownRenderer from "../ui/MarkdownRenderer";
import { executePythonCode } from "../../api/codeService.ts";
import { getCurrentUser } from "../../context/AuthContext.tsx";
import { useUnits } from "../../context/UnitContext.tsx";
import Loading from "../ui/Loading";
import toast from "react-hot-toast";
import LessonNavigation from "../ui/LessonNavigation";
import ProgressBar from "../ui/ProgressBar";
import type { UserData } from "../../data/userData";
import { Play, HelpCircle } from "lucide-react";
import HintModal, { type HintModalHandle } from "../ui/HintModal";
import 'animate.css';

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
  const { units, loading: unitsLoading } = useUnits();
  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const hintModalRef = useRef<HintModalHandle>(null);

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
          setOutput(""); // Reset stdout for new lesson
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
        const completed =
          userData.unitsProgress?.[unitId]?.completedLessons || [];
        setCompletedLessons(completed);
        setIsCompleted(completed.includes(id));
        setFailedAttempts(userData.lessonsProgress?.[id]?.failedAttempts || 0);
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
      const { stdout, stderr } = await executePythonCode(code);
      if (stderr !== "") {
        setIsError(true);
        setOutput(stderr);
      } else {
        setIsError(false);
        setOutput(stdout);
      }
      setLoading(false);
    } catch (error) {
      console.error("Run Error:", error);
    }
  };

  const submitCode = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (user === null || !id || !unitId) return;

      const { stdout, stderr } = await executePythonCode(code);

      if (stderr !== "") {
        setIsError(true);
        setOutput(stderr);
        toast.error(`Incorrect, try again.`);
        await updateDoc(doc(db, "users", user.uid), {
          [`lessonsProgress.${id}.failedAttempts`]: increment(1),
        });
        setFailedAttempts((prev) => prev + 1);
        setLoading(false);
        return;
      } else {
        setIsError(false);
        setOutput(stdout);
      }
      setLoading(false);

      if (stdout.trim() === String(lessonData?.expectedOutput ?? "").trim()) {
        const randomMessage =
          SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
        const message = lessonData?.successMessage || randomMessage;
        toast.success(message);
        await updateDoc(doc(db, "users", user.uid), {
          [`unitsProgress.${unitId}.completedLessons`]: arrayUnion(id),
        });
        setCompletedLessons((prev) => Array.from(new Set([...prev, id])));
        setIsCompleted(true);
      } else {
        toast.error(`Incorrect, try again.`);
        await updateDoc(doc(db, "users", user.uid), {
          [`lessonsProgress.${id}.failedAttempts`]: increment(1),
        });
        setFailedAttempts((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const totalLessonsInUnit = (unitId && units?.[unitId]?.lessons.length) || 0;
  const sortedUnitIds = Object.keys(units || {}).sort();
  const currentUnitNumber = sortedUnitIds.indexOf(unitId || "") + 1;

  const openHintModal = () => hintModalRef.current?.showModal();

  return (
    <Layout fullWidth={true}>
      {lessonData && !unitsLoading ? (
        <>
          <div className="flex flex-row justify-between items-center w-full px-6">
            <div className="flex flex-row items-center gap-4 w-1/4 md:w-1/3">
              <span className="text-sm font-bold hidden md:inline whitespace-nowrap">
                Unit {currentUnitNumber}:
              </span>
              <ProgressBar
                completed={completedLessons.length}
                total={totalLessonsInUnit}
                className="w-full"
              />
            </div>

            <LessonNavigation
              unitId={unitId}
              lessonId={id}
              currentLesson={lessonData}
              isCompleted={isCompleted}
            />
          </div>
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
                  <Play size={16} />
                  Run
                </button>
                <button
                  onClick={submitCode}
                  className={`btn ${isCompleted ? "btn-primary" : "btn-accent"} rounded-full`}
                >
                  <Play size={16} />
                  Submit
                </button>
                {failedAttempts >= 2 && lessonData.hint && (
                  <button
                    onClick={openHintModal}
                    className="btn btn-secondary rounded-full animate__animated animate__fadeIn animate__faster"
                  >
                    <HelpCircle size={16} />
                    Hint
                  </button>
                )}
              </div>
              <div
                className={`h-2/5 bg-base-200 p-4 rounded-lg font-mono overflow-auto whitespace-pre-wrap break-all min-h-40 ${isError ? "text-error" : ""}`}
              >
                {loading ? <Loading size="sm" /> : output}
              </div>
            </div>
          </div>

          <HintModal ref={hintModalRef} hint={lessonData.hint || ""} />
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default LessonPage;
