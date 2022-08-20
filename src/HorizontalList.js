import React, { useState, useEffect } from "react";
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

export function Recommended(props) {
    const [products, setProducts] = useState(getProducts());

    useEffect(() => {
        setProducts(getProducts());
    }, [props.updateProp]);


    return (
        <>
            {products.length != 0 &&
            <HorizontalListContainer title="Рекомендуем"
                products={products}/>}
        </>
    );

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

    function getProducts() {
        return setLiked(require('./data/products.json')
                                    .sort((a, b) => b.numberOfBuying - a.numberOfBuying)
                                    .slice(0, 6));
    }
}

// export class Recommended extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             products: []
//         };
//     }

//     componentDidMount() {
//         let allProducts = require('./data/products.json');
//         // console.log(allProducts);

//         this.setState((state) => ({
//             products: allProducts
//                                 .sort((a, b) => b.numberOfBuying - a.numberOfBuying)
//                                 .slice(0, 6)
//         }));
//     }

//     componentDidUpdate() {
//         console.log('dfkxj');
//     }

//     setLiked(products) {
//         let liked = JSON.parse(localStorage.getItem('liked')) || [];
//         return products.map((product) => {
//             let temp = {...product};
//             if (liked.includes(temp.id)) {
//                 temp.isLiked = true;
//             }
//             else {
//                 temp.isLiked = false;
//             }
//             return temp;
//         });
//     }

//     render() {
//         let products = this.setLiked(this.state.products);

//         return (
//             <>
//                 {products.length != 0 &&
//                 <HorizontalListContainer title="Рекомендуем"
//                     products={products}/>}
//             </>
//         );
//     }
// }

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
        let allProducts = require('./data/products.json');

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