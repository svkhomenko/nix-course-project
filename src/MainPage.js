import React from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import { Recommended, RecentlyWatched } from "./HorizontalList.js";
import Footer from "./Footer.js";
import "./styles/main.css";

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recommendedProp: 1
        }
        
        this.updateLikes = this.updateLikes.bind(this);
    }

    updateLikes() {
        this.setState((state) => ({
            recommendedProp: Math.random()
        }));
    }

    render() {
        return (
            <>
                <Header />
                <Main funcUpdateLikes={this.updateLikes} />
                <Recommended updateProp={this.state.recommendedProp} />
                <RecentlyWatched />
                <Footer />
            </>
        );
    }
} 

export default MainPage;