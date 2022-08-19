import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import { Recommended, RecentlyWatched } from "./HorizontalList.js";
import Footer from "./Footer.js";
import "./styles/main.css";

class MainPage extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Main />
                <Recommended />
                <RecentlyWatched />
                <Footer />
            </>
        );
    }
} 

export default MainPage;