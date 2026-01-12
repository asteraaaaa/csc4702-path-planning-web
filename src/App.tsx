import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Interactive from "./pages/Interactive";
import Challenges from "./pages/Challenges";
import Reflection from "./pages/Reflection";
import Resources from "./pages/Resources";
import {JSX} from "react";

function App(): JSX.Element {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/interactive" element={<Interactive />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/reflection" element={<Reflection />} />
                <Route path="/resources" element={<Resources />} />
            </Routes>
        </>
    );
}

export default App;
