import React from "react";
import ProductCard from "./ProductCard.js";

class HorizontalListContainer extends React.Component {
    render() {
        return (
            <div className="horizontal_list_container">
                <h2 className="horizontal_list_title">{this.props.title}</h2>
                <div className={this.props.products.length == 6
                    ? "horizontal_list_full" 
                    : "horizontal_list_not_full"}>
                    {this.props.products.map((item) => (
                        <ProductCard key={item.id}
                                        item={item}>
                        </ProductCard>
                    ))}
                </div>
            </div>
        );
    }
}

export class Recommended extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        let allProducts = require('./data/products.json') || [];

        this.setState((state) => ({
            products: allProducts
                                .sort((a, b) => b.numberOfBuying - a.numberOfBuying)
                                .slice(0, 6)
        }));
    }

    render() {
        let products = this.state.products;

        return (
            <>
                {products.length != 0 &&
                <HorizontalListContainer title="Рекомендуем"
                    products={products}/>}
            </>
        );
    }
}

export class RecentlyWatched extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };

        // localStorage.setItem('recentlyWatched', JSON.stringify([]));
    }

    componentDidMount() {
        let idArr = JSON.parse(localStorage.getItem('recentlyWatched')) || [];
        let allProducts = require('./data/products.json') || [];

        this.setState((state) => ({
            products: allProducts.filter(product => idArr.find(id => id == product.id))
        }));
    }

    render() {
        let products = this.state.products;

        return (
            <>
                {products.length != 0 &&
                <HorizontalListContainer title="Недавно просмотренные"
                    products={products}/>}
            </>
        );
    }
}