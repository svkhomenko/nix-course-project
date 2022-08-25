import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard.js";
import { setFromCart, setLiked} from "./tools.js";

class HorizontalListContainer extends React.Component {
    render() {
        return (
            <div className="horizontal_list_container">
                <h2 className="horizontal_list_title">{this.props.title}</h2>
                <div className={this.props.products.length === 6
                    ? "horizontal_list_full" 
                    : "horizontal_list_not_full"}>
                    {this.props.products.map((item) => (
                        <ProductCard key={item.id}
                                    item={item}
                                    funcUpdateLikes={this.props.funcUpdateLikes}
                                    funcUpdateCart={this.props.funcUpdateCart} />
                    ))}
                </div>
            </div>
        );
    }
}

export function Recommended(props) {
    const [products, setProducts] = useState(getProducts());

    useEffect(() => {
        setProducts(getProducts());
    }, [props.updateLikesProp, props.updateCartProp, props.updateRatingProp]);

    return (
        <>
            {products.length !== 0 &&
            <HorizontalListContainer title="Рекомендуем"
                products={products}
                funcUpdateLikes={props.funcUpdateLikes}
                funcUpdateCart={props.funcUpdateCart} />}
        </>
    );

    function getProducts() {
        return setFromCart(setLiked(require('./data/products.json')
                        .sort((a, b) => b.numberOfBuying - a.numberOfBuying)
                        .slice(0, 6)));
    }
}

export function RecentlyWatched(props) {
    const [products, setProducts] = useState(getProducts());

    useEffect(() => {
        setProducts(getProducts());
    }, [props.updateLikesProp, props.updateCartProp, props.updateRecentlyWatchedProp, props.updateRatingProp]);

    return (
        <>
            {products.length !== 0 &&
            <HorizontalListContainer title="Недавно просмотренные"
                products={products}
                funcUpdateLikes={props.funcUpdateLikes}
                funcUpdateCart={props.funcUpdateCart} />}
        </>
    );

    function getProducts() {
        let idArr = JSON.parse(localStorage.getItem('recentlyWatched')) || [];
        let allProducts = require('./data/products.json');

        return setFromCart(setLiked(allProducts.filter(product => idArr.find(id => +id === +product.id))
                                                .sort((a, b) => idArr.findIndex(id => +id === +b.id) - idArr.findIndex(id => +id === +a.id))));
    }
}