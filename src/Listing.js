import React from "react";
import ProductCard from "./ProductCard.js";

class SortContainer extends React.Component {
    render() {
        return (
            <div className="sort_container">
                <div className="sort_nav">
                    Сортировать:
                    <span className={this.props.activeIndex === 0 ? "sort_nav_items active" : "sort_nav_items"} 
                        data-sort-index='0' onClick={this.props.funcSort}>
                        Популярные
                    </span>
                    <span className={this.props.activeIndex === 1 ? "sort_nav_items active" : "sort_nav_items"} 
                        data-sort-index='1' onClick={this.props.funcSort}>
                        Сначала дешевые
                    </span>
                    <span className={this.props.activeIndex === 2 ? "sort_nav_items active" : "sort_nav_items"} 
                        data-sort-index='2' onClick={this.props.funcSort}>
                        Сначала дорогие
                    </span>
                </div>
                <span className="iconify" data-icon="akar-icons:settings-vertical"></span>
            </div>
        );
    }
}

class ListingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: require('./data/products.json'),
            sortIndex: 0
        };

        this.sortFunctionsArray = [
            this.sortByPopularity,
            this.sortCheapFirst,
            this.sortExpensiveFirst
        ];

        this.sortProducts = this.sortProducts.bind(this);
    }

    componentDidMount() {
        this.sortProducts({target:{dataset:{sortIndex:0}}});
    }

    sortByPopularity(a, b) {
        return b.numberOfBuying - a.numberOfBuying;
    }

    sortCheapFirst(a, b) {
        return a.price - b.price;
    }

    sortExpensiveFirst(a, b) {
        return b.price - a.price;
    }

    sortProducts(event) {
        let index = event.target.dataset.sortIndex;
        this.setState((state) => ({
            products: state.products.sort(this.sortFunctionsArray[index]),
            sortIndex: index
        }));
    }

    render() {
        return (
            <div className="listing_container">
                <SortContainer funcSort={this.sortProducts}
                                activeIndex={this.state.sortIndex}/>

                <div className="listing">
                    {this.state.products.map((item) => (
                        <ProductCard key={item.id}
                                        item={item}>
                        </ProductCard>
                    ))}
                </div>
                

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