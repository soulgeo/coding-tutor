import { useAuth } from "../../context/AuthContext"
import Layout from "../layout/Layout"
import AutoGrid from "../ui/AutoGrid"


const DashboardPage = () => {
  const { currentUser } = useAuth()

  return (
    <Layout>
      <div>Welcome {currentUser?.email}</div>
      <AutoGrid items={["This", "Is", "A", "Test"]}></AutoGrid>
    </Layout>
  )
}
export default DashboardPage
