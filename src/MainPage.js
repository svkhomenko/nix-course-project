import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import "./styles/main.css";

class MainPage extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Main />
            </>
        );
    }
} 

export default MainPage;