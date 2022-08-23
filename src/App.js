import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header.js";
import CatalogContainer from './Catalog.js';
import ListingContainer from './Listing.js';
import ProductPage from './ProductPage.js';
import { Recommended, RecentlyWatched } from "./HorizontalList.js";
import Footer from "./Footer.js";
import "./styles/main.css";
import "./styles/product.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updateLikesProp: 1,
            isCatalogOpen: true,
            updateCartProp: 1,
            updateRecentlyWatchedProp: 1
        }
        
        this.toggleCatalog = this.toggleCatalog.bind(this);
        this.updateLikes = this.updateLikes.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.updateRecentlyWatched = this.updateRecentlyWatched.bind(this);
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

    updateRecentlyWatched() {
        this.setState((state) => ({
            updateRecentlyWatchedProp: Math.random()
        }));
    }

    render() {
        return (
            <>
                <Router>
                    <Header funcToggleCatalog={this.toggleCatalog}
                            updateLikesProp={this.state.updateLikesProp}
                            updateCartProp={this.state.updateCartProp} />

                    <Routes>
                        {["/", "/:category", "/:category/:subcategory"]
                            .map((path, index) => 
                                <Route path={path} key={index} element={
                                    <main>
                                        <CatalogContainer funcToggleCatalog={this.toggleCatalog}
                                                isCatalogOpen={this.state.isCatalogOpen}
                                                isMainPage={true} />
                                        <ListingContainer funcUpdateLikes={this.updateLikes} 
                                                        funcUpdateCart={this.updateCart} 
                                                        updateLikesProp={this.state.updateLikesProp}
                                                        updateCartProp={this.state.updateCartProp} />
                                    </main> 
                                } />
                        )}

                        {["/about-us", "/wholesale", "/payment-and-delivery", "/blog", "/contacts", "/sitemap"]
                            .map((path, index) => 
                                <Route path={path} key={index} element={
                                    <>
                                        <CatalogContainer funcToggleCatalog={this.toggleCatalog}
                                                isCatalogOpen={this.state.isCatalogOpen}
                                                isMainPage={false} />
                                        <p>{path}</p>
                                    </>
                                } />
                        )}

                        <Route path="/product/:id" element={
                            <>
                                <CatalogContainer funcToggleCatalog={this.toggleCatalog}
                                                isCatalogOpen={this.state.isCatalogOpen}
                                                isMainPage={false} />
                                <ProductPage funcUpdateRecentlyWatched={this.updateRecentlyWatched}
                                                funcUpdateLikes={this.updateLikes}
                                                updateLikesProp={this.state.updateLikesProp} />
                            </>
                        } />
                    </Routes>

                    <Recommended funcUpdateLikes={this.updateLikes}
                                funcUpdateCart={this.updateCart}
                                updateLikesProp={this.state.updateLikesProp}
                                updateCartProp={this.state.updateCartProp} />
                    <RecentlyWatched funcUpdateLikes={this.updateLikes}
                                funcUpdateCart={this.updateCart}
                                updateLikesProp={this.state.updateLikesProp}
                                updateCartProp={this.state.updateCartProp}
                                updateRecentlyWatchedProp={this.state.updateRecentlyWatchedProp} />
                    <Footer />
                </Router>
            </>
        );
    }
}

export default App;