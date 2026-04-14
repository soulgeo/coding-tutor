import Layout from "../layout/Layout"
import AutoGrid from "../ui/AutoGrid"


const DashboardPage = () => {

  return (
    <Layout>
      <div className="font-extrabold text-4xl mt-10 mb-5">Dashboard</div>
      <div className="text-lg mb-10">Continue where you left off...</div>
      <AutoGrid items={["This", "Is", "A", "Test", "And", "It", "Looks", "Right"]}></AutoGrid>
    </Layout>
  )
}
export default DashboardPage
