import React, { useState, useEffect } from "react";

import { packages } from "./tools.js";

function Cart(props) {
    const [cartProducts, setCartProducts] = useState(getCartProducts());
    const [totalCost, setTotalCost] = useState(getTotalCost());
    const [reducedCost, setReducedCost] = useState(getReducedCost());

    useEffect(() => {
        setTotalCost(getTotalCost());
    }, [cartProducts]);

    useEffect(() => {
        setReducedCost(getReducedCost());
    }, [totalCost]);

    return (
        <>
            <div className="cart_background" onClick={props.funcToggleCart} />
            <div className="cart_container">
                <div className="cart_outer">
                    <div onClick={props.funcToggleCart}>
                        <span className="iconify cart_close_btn" data-icon="ep:close-bold" />
                    </div>
                    <div className="cart_header">Корзина</div>

                    {/*
                        colorId: 1
                        id: 7
                        number: 1
                        productPackage: "without"
                        sizeId: 1 
                     */}

                    {
                        cartProducts.length !== 0
                        ? <>
                            {cartProducts.map((product, index) => {
                                return (
                                    <div className="cart_product_container" key={index}>
                                        <div className="cart_product_img_outer">
                                            <img className="cart_product_img" src={require("./images/" + product.colors[product.colorId - 1].img)} alt="Product" />
                                        </div>

                                        <div className="cart_product_description">
                                            <div className="cart_product_title">{product.title}</div>
                                            <div>
                                                {product.size[product.sizeId - 1].size}<br />
                                                {packages[product.productPackage]}
                                            </div>

                                            <div className='cart_product_number_outer'>
                                                <span className="iconify cart_product_number_btn" data-icon="ep:arrow-left"></span>
                                                <span className="cart_product_number">{product.number}</span>
                                                <span className="iconify cart_product_number_btn" data-icon="ep:arrow-right"></span>
                                            </div>
                                        </div>

                                        <div className="cart_product_price_container">
                                            <div className={"cart_product_price" 
                                                + (+product.nPrice > +product.nWholesale ? " crossed" : "")}>
                                                {product.nPrice}
                                            </div>
                                            {+product.nPrice > +product.nWholesale &&
                                                <div className="cart_product_wholesale">{product.nWholesale}</div> }
                                        </div>

                                        <div onClick={deleteProduct.bind(product)} >
                                            <span className="iconify cart_delete_btn" data-icon="fluent:delete-24-regular" />
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                        : <p>Корзина пуста</p>
                    }

                    {/* <div className="cart_product_container">
                        <div className="cart_product_img_outer">
                            <img className="cart_product_img" src={require("./images/product1.png")} alt="Product" />
                        </div>

                        <div className="cart_product_description">
                            <div className="cart_product_title">Косметичка непромокаемая</div>
                            <div>
                                31/22/11 см<br />
                                Подарочная упаковка
                            </div>

                            <div className='cart_product_number_outer'>
                                <span className="iconify cart_product_number_btn" data-icon="ep:arrow-left"></span>
                                <span className="cart_product_number">1</span>
                                <span className="iconify cart_product_number_btn" data-icon="ep:arrow-right"></span>
                            </div>
                        </div>

                        <div className="cart_product_price_container">
                            <div className="cart_product_price crossed">123</div>
                            <div className="cart_product_wholesale">103</div>
                        </div>
                
                        <span className="iconify cart_delete_btn" data-icon="fluent:delete-24-regular" />
                    </div> */}

                </div>

                <div className="cart_total_container">
                    <div className="cart_total_outer">
                        Итого:
                        {totalCost > reducedCost &&
                            <div className="cart_total_wholesale_price">{reducedCost}</div> }
                        <div className={"cart_total_price" 
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

    // function getTotalCost() {
    //     let products = require('./data/products.json');

    //     return cartProducts.reduce((prevValue, curProductFromCart) => {
    //         let product = products.find(pr => +pr.id === +curProductFromCart.id);
    //         if (product) {
    //             return prevValue + product.price * curProductFromCart.number; 
    //         }
    //         return prevValue;
    //     }, 0);
    // }

    function getTotalCost() {
        return cartProducts.reduce((prevValue, curProduct) => {
            curProduct.nPrice = curProduct.price * curProduct.number;
            return prevValue + curProduct.price * curProduct.number; 
        }, 0);
    }

    // function getReducedCost() {
    //     let products = require('./data/products.json');

    //     return cartProducts.reduce((prevValue, curProductFromCart) => {
    //         let product = products.find(pr => +pr.id === +curProductFromCart.id);

    //         if (product) {
    //             if (product.wholesaleMin <= totalCost) {
    //                 return prevValue + product.wholesale * curProductFromCart.number; 
    //             }
    //             else {
    //                 return prevValue + product.price * curProductFromCart.number;
    //             }
    //         }
    //         return prevValue;
    //     }, 0);
    // }

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

    function deleteProduct() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let productIndex = cart.findIndex(pr => pr.id == this.id && pr.colorId == this.colorId && pr.sizeId == this.sizeId && pr.productPackage === this.productPackage);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setCartProducts(getCartProducts());
    }
}

export default Cart;