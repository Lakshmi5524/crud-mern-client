import React, { useState } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import LonginScreen from "./screens/LoginScreen/LoginScreen.js"
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen.js"
import LandingPage from "./screens/LandingPage/LandingPage.js"
import Mynotes from "./screens/MyNotes/Mynotes"
import CreateNote from "./screens/CreateNote/CreateNote"
import SingleNote from "./screens/CreateNote/SingleNote"

const App = () => {
  const [search, setSearch] = useState("")
  console.log(search)
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LonginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/createnote" component={CreateNote} />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/mynotes" component={() => <Mynotes search={search} />} />
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
