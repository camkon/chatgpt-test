import { useEffect } from "react"
import Layout from "./layout"
import { useNavigate } from "react-router-dom"

const App = () => {

  const navigate = useNavigate()
  const key = sessionStorage.getItem('gpttestkey')

  useEffect(() => {
    if(key === null) {
      navigate('/sign-in')
    }
  }, [key])

  return <Layout />
}

export default App
