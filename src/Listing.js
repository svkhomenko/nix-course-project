import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "./ProductCard.js";

class SortContainer extends React.Component {
    render() {
        return (
            <div className="sort_container">
                <div className="sort_nav">
                    Сортировать:
                    <span className={this.props.activeIndex == 0 ? "sort_nav_items active" : "sort_nav_items"} 
                        data-sort-index='0' onClick={this.props.funcSort}>
                        Популярные
                    </span>
                    <span className={this.props.activeIndex == 1 ? "sort_nav_items active" : "sort_nav_items"} 
                        data-sort-index='1' onClick={this.props.funcSort}>
                        Сначала дешевые
                    </span>
                    <span className={this.props.activeIndex == 2 ? "sort_nav_items active" : "sort_nav_items"} 
                        data-sort-index='2' onClick={this.props.funcSort}>
                        Сначала дорогие
                    </span>
                </div>
                <span className="iconify" data-icon="akar-icons:settings-vertical"></span>
            </div>
        );
    }
}

class PageIndexContainer extends React.Component {
    constructor(props) {
        super(props);

        this.pagesArr = [];
    }

    getPagesArr() {
        this.pagesArr = [];
        let currentPage = +this.props.currentPage;
        let numberOfPages = +this.props.numberOfPages;

        if (numberOfPages <= 3) {
            for (let i = 1; i <= numberOfPages; i++) {
                this.pagesArr.push(i);
            }
        }
        else if (currentPage - 2 <= 0) {
            this.pagesArr = [1, 2, 3, -1, numberOfPages];
        }
        else if (currentPage + 2 > numberOfPages) {
            this.pagesArr = [1, -1, numberOfPages - 2, numberOfPages - 1, numberOfPages];
        }
        else {
            this.pagesArr = [1, -1, currentPage - 1, currentPage, currentPage + 1, -2, numberOfPages];
        }
    }

    render() {
        this.getPagesArr();

        return (
            <div className="page_index_container">
                Страница
                {this.pagesArr.map((index) => {
                    if (index > 0) {
                        return (
                            <span key={index}
                                className={index == this.props.currentPage ? "page_index active" : "page_index"}
                                data-page-index={index}
                                onClick={this.props.funcChangePage}>
                                {index}
                            </span>
                        );
                    }
                    else {
                        return (
                            <div key={index} className="page_index_reduction_outer">
                                <div className="page_index_reduction" />
                                <div className="page_index_reduction" />
                                <div className="page_index_reduction" />
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
}

// class ListingContainer extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             products: require('./data/products.json'),
//             sortIndex: 0,
//             maxProductsPerPage: 12,
//             currentPage: 1
//         };

//         this.sortFunctionsArray = [
//             this.sortByPopularity,
//             this.sortCheapFirst,
//             this.sortExpensiveFirst
//         ];

//         this.sortProducts = this.sortProducts.bind(this);
//         this.changePage = this.changePage.bind(this);
//     }

//     componentDidMount() {
//         console.log(this.props);
//         // console.log(this.props.category, this.props.subcategory);

//         this.sortProducts({target:{dataset:{sortIndex:0}}});
//     }

//     sortByPopularity(a, b) {
//         return b.numberOfBuying - a.numberOfBuying;
//     }

//     sortCheapFirst(a, b) {
//         return a.price - b.price;
//     }

//     sortExpensiveFirst(a, b) {
//         return b.price - a.price;
//     }

//     sortProducts(event) {
//         let index = event.target.dataset.sortIndex;
//         this.setState((state) => ({
//             products: state.products.sort(this.sortFunctionsArray[index]),
//             sortIndex: index
//         }));
//     }

//     changePage(event) {
//         this.setState((state) => ({
//             currentPage: event.target.dataset.pageIndex
//         }));
//     }

//     render() {
//         let begin = (this.state.currentPage - 1) * this.state.maxProductsPerPage;
//         let end = begin + this.state.maxProductsPerPage;
//         let products = this.state.products.slice(begin, end);

//         return (
//             <div className="listing_container">
//                 <SortContainer funcSort={this.sortProducts}
//                                 activeIndex={this.state.sortIndex}/>

//                 <div className="listing">
//                     {products.map((item) => {
//                         return (
//                             <ProductCard key={item.id}
//                                             item={item}>
//                             </ProductCard>
//                         );
//                     })}
//                 </div>

//                 <PageIndexContainer funcChangePage={this.changePage}
//                                     currentPage={this.state.currentPage}
//                                     numberOfPages={Math.ceil(this.state.products.length / this.state.maxProductsPerPage)}/>
//             </div> 
//         );
//     }
// }

function ListingContainer(props) {
    let { category, subcategory } = useParams();

    const [sortIndex, setSortIndex] = useState(0);
    const [maxProductsPerPage, setMaxProductsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    
    let sortFunctionsArray = [
        sortByPopularity,
        sortCheapFirst,
        sortExpensiveFirst
    ];
    
    const [products, setProducts] = useState(require('./data/products.json').sort(sortFunctionsArray[sortIndex]));
    
    useEffect(() => {
        let tempProducts = require('./data/products.json').filter(urlFilter);
        setProducts(tempProducts.sort(sortFunctionsArray[sortIndex]));
    }, [category, subcategory]);

    let begin = (currentPage - 1) * maxProductsPerPage;
    let end = begin + maxProductsPerPage;
    let curProducts = setLiked(products.slice(begin, end));

    return (
        <div className="listing_container">
        {
            products.length !== 0
            ? <>
                <SortContainer funcSort={sortProducts}
                            activeIndex={sortIndex}/>

                <div className="listing">
                {curProducts.map((item) => {
                    return (
                        <ProductCard key={item.id}
                            item={item}
                            funcUpdateLikes={props.funcUpdateLikes}>
                        </ProductCard>
                    );
                })}
                </div>

                <PageIndexContainer funcChangePage={changePage}
                                currentPage={currentPage}
                                numberOfPages={Math.ceil(products.length / maxProductsPerPage)}/>
            </>
            : <p>К сожалению, товары данной категории отсутствуют</p>
        }
        </div>
    );

    function urlFilter(product) {
        if (category) {
            if (product.category !== category) {
                return false;
            }
            if (subcategory) {
                if (product.subcategory !== subcategory) {
                    return false;
                }
            }
        }
        return true;
    }

    function sortByPopularity(a, b) {
        return b.numberOfBuying - a.numberOfBuying;
    }

    function sortCheapFirst(a, b) {
        return a.price - b.price;
    }

    function sortExpensiveFirst(a, b) {
        return b.price - a.price;
    }

    function sortProducts(event) {
        let index = event.target.dataset.sortIndex;
        setProducts(products.sort(sortFunctionsArray[index]));
        setSortIndex(index);
    }

    function changePage(event) {
        setCurrentPage(event.target.dataset.pageIndex);
    }

    function setLiked(products) {
        let liked = JSON.parse(localStorage.getItem('liked')) || [];
        return products.map((product) => {
            let temp = {...product};
            if (liked.includes(temp.id)) {
                temp.isLiked = true;
            }
            else {
                temp.isLiked = false;
            }
            return temp;
        });
    }
}

export default ListingContainer;