import React from "react";
import {BrowseRouter as Router, Routes, Route} from "react-router-dom"
import weather from "./weather"

function App(){
    return(
        <Router>
        <Routes>
        <Route path='/weather' element={<weather/>}>
        </Routes></Router>
    )
}

export default App;