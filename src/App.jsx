import { ThemeProvider, createTheme } from "@mui/material"
import Layout from "./layout"
import { custom } from "./theme"

const App = () => {

  const theme = createTheme({
    components: custom.components,
  })


  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  )
}

export default App
