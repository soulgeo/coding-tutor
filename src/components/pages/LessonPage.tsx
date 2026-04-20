import { Link, useParams } from "react-router";
import Layout from "../layout/Layout";
import CodeEditor, { DEFAULT_CODE } from "../ui/CodeEditor";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useCallback, useState, useMemo } from "react";
import type { Lesson } from "../../data/courseData";
import { db } from "../../firebase";
import MarkdownRenderer from "../ui/MarkdownRenderer";
import { executePythonCode } from "../../api/codeService.ts";
import { getCurrentUser } from "../../context/AuthContext.tsx";
import { useUnits } from "../../context/UnitContext.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "../ui/Loading";
import toast from "react-hot-toast";

const LessonPage = () => {
  const { unitId, id } = useParams();
  const { units, loading: unitsLoading } = useUnits();
  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [code, setCode] = useState("");
  const [stdout, setStdout] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLessonData = useCallback(async () => {
    if (!id) {
      return;
    }
    const docRef = doc(db, "lessons", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Lesson;
      setLessonData(data);
      setCode(data.pretypedCode || DEFAULT_CODE);
      setStdout(""); // Reset stdout for new lesson
    } else {
      console.error(`Lesson with id ${id} doesn't exist`);
    }
  }, [id]);

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
        toast.success("Correct!")
        await updateDoc(doc(db, "users", user.uid), {
          [`unitsProgress.${unitId}.completedLessons`]: arrayUnion(id),
        });
      } else {
        toast.error(`Incorrect, try again.`);
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  useEffect(() => {
    fetchLessonData();
  }, [fetchLessonData]);

  const navigation = useMemo(() => {
    if (!units || !unitId || !id) return { prevLink: "", nextLink: "" };

    const sortedUnitIds = Object.keys(units).sort();
    const flatLessons = sortedUnitIds.flatMap((uId) =>
      units[uId].lessons.map((lId) => ({ unitId: uId, lessonId: lId }))
    );

    const currentIndex = flatLessons.findIndex(
      (l) => l.lessonId === id && l.unitId === unitId
    );

    let prevLink = "";
    let nextLink = "";

    if (currentIndex > 0) {
      const prev = flatLessons[currentIndex - 1];
      prevLink = `/units/${prev.unitId}/lessons/${prev.lessonId}`;
    }

    if (currentIndex !== -1 && currentIndex < flatLessons.length - 1) {
      const next = flatLessons[currentIndex + 1];
      nextLink = `/units/${next.unitId}/lessons/${next.lessonId}`;
    }

    return { prevLink, nextLink };
  }, [units, unitId, id]);

  const { prevLink, nextLink } = navigation;

  return (
    <Layout fullWidth={true}>
      {lessonData && !unitsLoading ? (
        <>
          <div className="flex flex-row justify-end w-full px-4 gap-2">
            <div className="flex flex-row gap-2">
              {prevLink ? (
                <Link to={prevLink} className="btn btn-primary btn-circle">
                  <ChevronLeft size={20} />
                </Link>
              ) : (
                <button className="btn btn-primary btn-circle btn-disabled" disabled>
                  <ChevronLeft size={20} />
                </button>
              )}
              {nextLink ? (
                <Link to={nextLink} className="btn btn-primary btn-circle">
                  <ChevronRight size={20} />
                </Link>
              ) : (
                <button className="btn btn-primary btn-circle btn-disabled" disabled>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
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
                <button onClick={runCode} className="btn btn-primary">
                  Run
                </button>
                <button onClick={submitCode} className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="h-2/5 bg-base-200 p-4 rounded-lg font-mono overflow-auto whitespace-pre-wrap break-all">
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
