import React from "react";

import Header from "./Header.js";
import CatalogContainer from './Catalog.js';
import ListingContainer from './Listing.js';
import { Recommended, RecentlyWatched } from "./HorizontalList.js";
import Footer from "./Footer.js";
import "./styles/main.css";

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updateLikesProp: 1,
            isCatalogOpen: true,
            updateCartProp: 1
        }
        
        this.toggleCatalog = this.toggleCatalog.bind(this);
        this.updateLikes = this.updateLikes.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }

    toggleCatalog() {
        this.setState((state) => ({
            isCatalogOpen: !state.isCatalogOpen
        }));
    }

    updateLikes() {
        this.setState((state) => ({
            updateLikesProp: Math.random()
        }));
    }

    updateCart() {
        this.setState((state) => ({
            updateCartProp: Math.random()
        }));
    }

    render() {
        return (
            <>
                <Header funcToggleCatalog={this.toggleCatalog}
                        updateLikesProp={this.state.updateLikesProp}
                        updateCartProp={this.state.updateCartProp} />
                <main>
                    {this.state.isCatalogOpen && <CatalogContainer />}
                    <ListingContainer funcUpdateLikes={this.updateLikes} 
                                    funcUpdateCart={this.updateCart} 
                                    updateLikesProp={this.state.updateLikesProp}
                                    updateCartProp={this.state.updateCartProp} />
                </main>
                <Recommended funcUpdateLikes={this.updateLikes}
                            funcUpdateCart={this.updateCart}
                            updateLikesProp={this.state.updateLikesProp}
                            updateCartProp={this.state.updateCartProp} />
                <RecentlyWatched />
                <Footer />
            </>
        );
    }
}

export default MainPage;