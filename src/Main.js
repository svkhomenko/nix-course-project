import React from "react";
import CatalogContainer from './Catalog.js';
import ListingContainer from './Listing.js';

class Main extends React.Component {
    render() {
        return (
            <main>
                <CatalogContainer />
                <ListingContainer funcUpdateLikes={this.props.funcUpdateLikes} />
            </main>
        );
    }
} 

export default Main;