import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './MainPage.js';

// function Page() {
//     return (
//         <h1>Page</h1>
//     );
// }


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<MainPage />} />
                {/* <Route exact path="/page" element={<Page />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
