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
                <Route path="/:category" element={<MainPage />} />
                <Route path="/:category/:subcategory" element={<MainPage />} />

                {["/about-us", "/wholesale", "/payment-and-delivery", "/blog", "/contacts", "/sitemap"]
                    .map((path, index) => 
                        <Route path={path} element={<MainPage />} key={index} />
                )}

                {/* <Route exact path="/page" element={<Page />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
