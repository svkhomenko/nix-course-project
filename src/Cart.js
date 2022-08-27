import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ProductFromPopup } from "./Likes.js";
import { packages } from "./tools.js";

function FullProductFromCart({ product, ...props }) {
    const [productNumber, setProductNumber] = useState(product.number);

    useEffect(() => {
        changeProductNumber();
    }, [productNumber]);

    return (
        <Link to={'/product/' + product.id} onClick={linkClick} className={"popup_product_container" + (product.colors[product.colorId - 1].isAvaliable ? "" : " not_avaliable")}>
            <div className="popup_product_img_outer">
                <img className="popup_product_img" src={require("./images/" + product.colors[product.colorId - 1].img)} alt="Product" />
            </div>

            <div className="popup_product_description">
                <div className="popup_product_title">{product.title}</div>
                <div>
                    {product.size[product.sizeId - 1].size}<br />
                    {packages[product.productPackage]}
                </div>

                <div className='popup_product_number_outer'>
                    <div onClick={productNumberDown}
                        className={productNumber === 1 ? "disabled" : ""}>
                        <span className="iconify popup_product_number_btn" data-icon="ep:arrow-left" />
                    </div>
                    <span className="popup_product_number">{productNumber}</span>
                    <div onClick={productNumberUp}>
                        <span className="iconify popup_product_number_btn" data-icon="ep:arrow-right" />
                    </div>   
                </div>
            </div>

            <div className="popup_product_price_container">
                <div className={"popup_product_price" 
                    + (+product.nPrice > +product.nWholesale ? " crossed" : "")}>
                    {product.nPrice}
                </div>
                {+product.nPrice > +product.nWholesale &&
                    <div className="popup_product_wholesale">{product.nWholesale}</div> }
            </div>

            <div onClick={deleteProduct} >
                <span className="iconify popup_delete_btn" data-icon="fluent:delete-24-regular" />
            </div>
        </Link>
    );

    function linkClick(event) {
        if (event.prevent) {
            event.preventDefault();
        }
        else {
            localStorage.setItem('colorId', JSON.stringify(product.colorId));
            props.funcToggleCart();
        }
    }

    function deleteProduct(event) {
        event.prevent = true;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let productIndex = cart.findIndex(pr => pr.id == product.id && pr.colorId == product.colorId && pr.sizeId == product.sizeId && pr.productPackage === product.productPackage);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        props.funcUpdateCart();
    }

    function productNumberUp(event) {
        event.prevent = true;
        setProductNumber(productNumber + 1);
    }   
    
    function productNumberDown(event) {
        event.prevent = true;
        if (productNumber !== 1) {
            setProductNumber(productNumber - 1);
        }
    }

    function changeProductNumber() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let productFromCart = cart.find(pr => pr.id == product.id && pr.colorId == product.colorId && pr.sizeId == product.sizeId && pr.productPackage === product.productPackage);
        if (productFromCart) {
            productFromCart.number = productNumber;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        props.funcUpdateCart();
    }
}

function ProductFromWaitingList({ product, ...props}) {
    return (
        <ProductFromPopup product={product}
                        funcLinkClick={linkClick}
                        funcDeleteProduct={deleteProduct} />
    );

    function linkClick(event) {
        if (event.prevent) {
            event.preventDefault();
        }
        else {
            localStorage.setItem('colorId', JSON.stringify(product.colorId));
            props.funcToggleCart();
        }
    }

    function deleteProduct(event) {
        event.prevent = true;
        let waitingList = JSON.parse(localStorage.getItem('waitingList')) || [];

        let index = waitingList.findIndex(pr => pr.id == product.id && pr.colorId == product.colorId);
        if (index !== -1) {
            waitingList.splice(index, 1);
        }

        localStorage.setItem('waitingList', JSON.stringify(waitingList));
        props.funcUpdateWaitingList();
    }
}

function Cart(props) {
    const [cartProducts, setCartProducts] = useState(getCartProducts());
    const [totalCost, setTotalCost] = useState(getTotalCost());
    const [reducedCost, setReducedCost] = useState(getReducedCost());
    const [waitingListProducts, setWaitingListProducts] = useState(getWaitingListProducts());

    useEffect(() => {
        setTotalCost(getTotalCost());
    }, [cartProducts]);

    useEffect(() => {
        setReducedCost(getReducedCost());
    }, [totalCost]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, []);

    return (
        <>
            <div className="popup_background" onClick={props.funcToggleCart} />
            <div className="popup_container">
                <div className="popup_outer">
                    <div onClick={props.funcToggleCart}>
                        <span className="iconify popup_close_btn" data-icon="ep:close-bold" />
                    </div>
                    <div className="popup_header">Корзина</div>
                    {
                        cartProducts.length !== 0
                        ? <>
                            {cartProducts.map((product) => (
                                <FullProductFromCart key={product.id + "-" + product.colorId + "-" + product.sizeId + "-" + product.productPackage} 
                                                    product={product}
                                                    funcToggleCart={props.funcToggleCart}
                                                    funcUpdateCart={updateCart} />
                            ))}
                        </>
                        : <p>Корзина пуста</p>
                    }

                    <div className="popup_header second">Лист ожидания</div>
                    {
                        waitingListProducts.length !== 0
                        ? <>
                            {waitingListProducts.map((product) => (
                                <ProductFromWaitingList key={product.id + "-" + product.colorId} 
                                                    product={product}
                                                    funcToggleCart={props.funcToggleCart}
                                                    funcUpdateWaitingList={updateWaitingList} />
                            ))}
                        </>
                        : <p>Лист ожидания пуст</p>
                    }
                </div>

                <div className="popup_total_container">
                    <div className="popup_total_outer">
                        Итого:
                        {totalCost > reducedCost &&
                            <div className="popup_total_wholesale_price">{reducedCost}</div> }
                        <div className={"popup_total_price" 
                            + (totalCost > reducedCost ? " crossed" : "")}>
                            {totalCost}
                        </div>
                    </div>
                    <button className='main_description_add_btn button'>
                        Оформить заказ
                    </button> 
                </div>

            </div>
        </>
    );

    function getCartProducts() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let products = require('./data/products.json');

        return cart.map(cartProduct => {
            let { colors, title, size, price, wholesale, wholesaleMin } = products.find(pr => +pr.id === +cartProduct.id);
            return { colors, title, size, price, wholesale, wholesaleMin, ...cartProduct };
        }); 
    }

    function getTotalCost() {
        return cartProducts.reduce((prevValue, curProduct) => {
            curProduct.nPrice = curProduct.price * curProduct.number;
            return prevValue + curProduct.price * curProduct.number; 
        }, 0);
    }

    function getReducedCost() {
        return cartProducts.reduce((prevValue, curProduct) => {
            if (curProduct.wholesaleMin <= totalCost) {
                curProduct.nWholesale = curProduct.wholesale * curProduct.number;
                return prevValue + curProduct.wholesale * curProduct.number; 
            }
            else {
                curProduct.nWholesale = curProduct.price * curProduct.number;
                return prevValue + curProduct.price * curProduct.number;
            }
        }, 0);
    }

    function updateCart() {
        setCartProducts(getCartProducts());
        props.funcUpdateCart();
    }

    function getWaitingListProducts() {
        let waitingList = JSON.parse(localStorage.getItem('waitingList')) || [];
        let products = require('./data/products.json');

        return waitingList.map(waitingListProduct => {
            let { colors, title, price } = products.find(pr => pr.id == waitingListProduct.id);
            return { colors, title, price, ...waitingListProduct };
        }); 
    }

    function updateWaitingList() {
        setWaitingListProducts(getWaitingListProducts());
    }
}

export default Cart;