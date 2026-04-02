import Layout from "../layout/Layout"
import CodeEditor from "../ui/CodeEditor"

interface Props {
  title: string;
  description: string;
}

function ExercisePage({title, description}: Props) {
  return (
    <Layout>
      <div className="flex flex-row w-full text-xl font-bold p-4">
        <h1>{title}</h1>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full flex-1 p-4">
          {description}
        </div>
        <div className="w-full md:w-32 flex-1 p-4">
          <CodeEditor />
        </div>
      </div>
    </Layout>
  )
}

export default ExercisePage
