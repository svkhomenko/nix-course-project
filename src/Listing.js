import React from "react";
import ProductCard from "./ProductCard.js";

class SortContainer extends React.Component {
    render() {
        return (
            <div className="sort_container">
                <div className="sort_nav">
                    Сортировать:
                    <a href="#" className="sort_nav_items active">Популярные</a>
                    <a href="#" className="sort_nav_items">Сначала дешевые</a>
                    <a href="#" className="sort_nav_items">Сначала дорогие</a>
                </div>
                <span className="iconify" data-icon="akar-icons:settings-vertical"></span>
            </div>
        );
    }
}

class Listing extends React.Component {
    constructor(props) {
        super(props);

        this.products = require('./data/products.json');
    }

    render() {
        return (
            <div className="listing">
                {this.products.map((item) => (
                    <ProductCard key={item.id}
                                    item={item}>
                    </ProductCard>
                ))}
            </div>
        );
    }
}

class ListingContainer extends React.Component {
    render() {
        return (
            <div className="listing_container">
                <SortContainer />
                <Listing />
                

                {/* <div class="page_index_container">
                    Страница
                    <a href="#" class="page_index active">1</a>
                    <a href="#" class="page_index">2</a>
                    <a href="#" class="page_index">3</a>
                    <div class="page_index_reduction_outer">
                        <div class="page_index_reduction"></div>
                        <div class="page_index_reduction"></div>
                        <div class="page_index_reduction"></div>
                    </div>
                    <a href="#" class="page_index">15</a>
                </div> */}
            </div> 
        );
    }
}

export default ListingContainer;