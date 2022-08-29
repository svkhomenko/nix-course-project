import React from "react";
import { Link } from "react-router-dom";

import { getNumberWithSeparator, addProductToCard, getTotalRating } from "./tools.js";

export class Rating extends React.Component {
    getRatingForStar() {
        let rating = 100 * this.props.rating / 5;
        return 100 - rating;
    }

    render() {
        return (
            <div className="rating_fill">
                <div className="rating" style={{height: this.getRatingForStar() + '%'}}></div>
                <div className="rating_empty"></div>
            </div>
        );
    }
}

class RatingContainer extends React.Component {
    render() {
        return (
            <div className="rating_container">
                <span className="rating_number">{this.props.rating}</span>
                <Rating rating={this.props.rating} />
            </div>
        );
    }
}

class ProductNumberOuter extends React.Component {
    render() {
        return (
            <div>
                <div className='product_number_outer'>
                    <div onClick={this.props.funcDown}
                        className={this.props.number === 1 ? "disabled" : ""}>
                        <span className="iconify product_number_btn" data-icon="ep:arrow-left" />
                    </div>
                    <span className="product_number">{this.props.number}</span>
                    <div onClick={this.props.funcUp}>
                        <span className="iconify product_number_btn" data-icon="ep:arrow-right" />
                    </div>
                </div>
                количество
            </div>
        );
    }
}

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: this.props.item.isLiked,
            productNumber: 1,
            isInCart: this.props.item.isInCart
        };

        this.linkClick = this.linkClick.bind(this);
        this.likeClick = this.likeClick.bind(this);
        this.productNumberUp = this.productNumberUp.bind(this);
        this.productNumberDown = this.productNumberDown.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item.isLiked !== this.props.item.isLiked) {
            this.setState((state, props) => ({
                isLiked: props.item.isLiked
            }));
        }
        if (prevProps.item.isInCart !== this.props.item.isInCart) {
            this.setState((state, props) => ({
                isInCart: props.item.isInCart
            }));
        }
    }

    linkClick(event) {
        if (event.prevent) {
            event.preventDefault();
        }
        else if (!window.location.pathname.includes('/product/')) {
            let page = JSON.parse(localStorage.getItem('prevMainPage')) || {};
            page.y = window.pageYOffset;
            localStorage.setItem('prevMainPage', JSON.stringify(page));
        }
    }

    likeClick(event) {
        event.prevent = true;
        this.setState((state) => ({
            isLiked: !state.isLiked
        }));

        let id = this.props.item.id;
        let liked = JSON.parse(localStorage.getItem('liked')) || [];
        let likedIndex = liked.indexOf(id);

        if (likedIndex !== -1) {
            liked.splice(likedIndex, 1);
        }
        else {
            liked.push(id);
        }

        localStorage.setItem('liked', JSON.stringify(liked));

        this.props.funcUpdateLikes();
    }

    productNumberUp(event) {
        event.prevent = true;
        this.setState((state) => ({
            productNumber: state.productNumber + 1
        }));
    }   
    
    productNumberDown(event) {
        event.prevent = true;
        this.setState((state) => {
            if (state.productNumber === 1) {
                return {};
            }

            return ({
                productNumber: state.productNumber - 1
            });
        });
    }

    addToCart(event) {
        event.prevent = true;
        this.setState((state) => ({
            isInCart: true
        }));

        addProductToCard(this.props.item.colors[0].isAvaliable, this.props.item.id, this.state.productNumber);

        this.props.funcUpdateCart();
    }

    render() {
        let item = this.props.item;

        let likeBtn = null;
        if (this.state.isLiked) {
            likeBtn = (
                <span className="like_outer" onClick={this.likeClick}>
                    <span className="iconify" data-icon="ant-design:heart-filled" />
                </span> 
            );
        }
        else {
            likeBtn = (
                <div className="like_outer" onClick={this.likeClick}>
                    <span className="iconify" data-icon="ant-design:heart-outlined" />
                </div> 
            );
        }

        let inCartBtn = null;
        if (item.colors[0].isAvaliable) {
            inCartBtn = (
                <button onClick={this.addToCart} 
                    className={'product_cart_add_btn button' 
                                + (this.state.isInCart ? " negative" : "")} >
                {this.state.isInCart ? "В корзине" : "В корзину"} 
                </button> 
            );
        }
        else {
            inCartBtn = (
                <button onClick={this.addToCart} 
                    className={'product_cart_add_btn button' 
                                + (this.state.isInCart ? " negative" : "")}
                    style={{width: "100%"}}>
                {this.state.isInCart ? "В листе ожидания" : "В лист ожидания"}
                </button> 
            );
        }

        return (
            <Link to={'/product/' + item.id} onClick={this.linkClick} className={item.colors[0].isAvaliable ? 'product_card' : 'product_card not_avaliable'}>
                <div className="product_img_outer">
                    <img className="product_img" src={require("./images/" + item.colors[0].img)} alt="Product" />
                    {likeBtn}
                </div>
                <div className="product_title">
                    {item.title}{", "}{item.size[0].size}
                </div>
                <div className="product_colors">
                    {item.colors.map((color) => ( 
                        <div key={color.id}
                                className="product_color"
                                style={{backgroundColor: color.color}} />
                    ))}
                </div>
                <div className="product_values">
                    <div>
                        <div className="product_price">{getNumberWithSeparator(item.price)}</div>
                        цена
                    </div>
                    <div className="product_wholesale_outer">
                        <div className="product_wholesale">{getNumberWithSeparator(item.wholesale)}</div>
                        опт от <span className="product_wholesale_min">{getNumberWithSeparator(item.wholesaleMin)}</span>
                    </div>
                    {item.colors[0].isAvaliable 
                    ? <ProductNumberOuter funcDown={this.productNumberDown} number={this.state.productNumber} funcUp={this.productNumberUp}/> 
                    : <RatingContainer rating={getTotalRating(item.comments)}/>}
                </div>
                <div className="product_cart_add_outer">
                    {inCartBtn}
                    {item.colors[0].isAvaliable && <RatingContainer rating={getTotalRating(item.comments)}/>}
                </div>
            </Link>
        );
    }
}

export default ProductCard;