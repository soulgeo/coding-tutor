import { Link, useParams } from "react-router";
import Layout from "../layout/Layout";
import CodeEditor from "../ui/CodeEditor";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useEffectEvent, useState } from "react";
import type { Lesson } from "../../data/courseData";
import { db } from "../../firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function LessonPage() {
  const id = useParams().id;
  const [lesson, setLessonData] = useState<Lesson | null>(null);

  const fetchLessonData = useEffectEvent(async () => {
    if (!id) { return; }
    const docRef = doc(db, "lessons", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLessonData(docSnap.data() as Lesson);
    } else {
      console.error(`Lesson with id ${id} doesn't exist`);
    }
  });

  useEffect(() => {
    fetchLessonData();
  }, []);

  const prev = "";
  const next = "";

  return (
    <Layout fullWidth={true}>
      {lesson ? (
        <>
          <div className="flex flex-row justify-end w-full px-4 gap-2">
            <div className="flex flex-row gap-2">
              <Link to={prev} className="btn btn-primary btn-circle">{"<"}</Link>
              <Link to={next} className="btn btn-primary btn-circle">{">"}</Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full p-4">
            <div className="bg-base-100 w-full h-full md:max-h-[70vh] flex-1 p-4 md:overflow-y-auto mb-4">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {lesson.content}
                </ReactMarkdown>
              </div>
            </div>
            <div className="w-full md:w-32 flex-1">
              <CodeEditor />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}

export default LessonPage;
