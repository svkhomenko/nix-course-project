import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ProductFromPopup({ product, funcLinkClick, funcDeleteProduct }) {
    return (
        <Link to={'/product/' + product.id} onClick={funcLinkClick} className={"popup_product_container" + (product.colors[product.colorId - 1].isAvaliable ? "" : " not_avaliable")}>
            <div className="popup_product_img_outer">
                <img className="popup_product_img" src={require("./images/" + product.colors[product.colorId - 1].img)} alt="Product" />
            </div>

            <div className="popup_product_description">
                <div className="popup_product_title">{product.title}</div>
            </div>

            <div className="popup_product_price_container">
                <div className="popup_product_price">
                    {product.price}
                </div>
            </div>

            <div onClick={funcDeleteProduct} >
                <span className="iconify popup_delete_btn" data-icon="fluent:delete-24-regular" />
            </div>
        </Link>
    );
}

function ProductFromLikes({ product, ...props}) {
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
            props.funcToggleLikes();
        }
    }

    function deleteProduct(event) {
        event.prevent = true;
        let liked = JSON.parse(localStorage.getItem('liked')) || [];

        let index = liked.findIndex(id => id == product.id);
        if (index !== -1) {
            liked.splice(index, 1);
        }

        localStorage.setItem('liked', JSON.stringify(liked));
        props.funcUpdateLikes();
    }
}

function Likes(props) {
    const [likesProducts, setLikesProducts] = useState(getLikesProducts());

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, []);

    return (
        <>
            <div className="popup_background" onClick={props.funcToggleLikes} />
            <div className="popup_container">
                <div className="popup_outer">
                    <div onClick={props.funcToggleLikes}>
                        <span className="iconify popup_close_btn" data-icon="ep:close-bold" />
                    </div>

                    <div className="popup_header">Избранное</div>
                    {
                        likesProducts.length !== 0
                        ? <>
                            {likesProducts.map((product) => (
                                <ProductFromLikes key={product.id} 
                                                    product={product}
                                                    funcToggleLikes={props.funcToggleLikes}
                                                    funcUpdateLikes={updateLikesProducts} />
                            ))}
                        </>
                        : <p>В избранное ничего не добавлено</p>
                    }
                </div>
            </div>
        </>
    );

    function getLikesProducts() {
        let liked = JSON.parse(localStorage.getItem('liked')) || [];
        let products = require('./data/products.json');

        return liked.map(id => {
            let { colors, title, price } = products.find(pr => pr.id == id);
            return { colors, title, price, id, colorId: 1 };
        }); 
    }

    function updateLikesProducts() {
        setLikesProducts(getLikesProducts());
        props.funcUpdateLikes();
    }
}

export default Likes;