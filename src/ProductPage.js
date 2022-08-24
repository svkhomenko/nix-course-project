import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Rating } from "./ProductCard.js";
import { getNumberWithSeparator, addProductToCard } from "./tools.js";

function MainDescriptionAddOuter(props) {
    if (props.isAvaliable) {
        return (
            <div className="main_description_add_outer">
                <button onClick={props.funcAddToCart} 
                    className={'main_description_add_btn button' 
                                + (props.isInCart ? " negative" : "")} >
                    {props.isInCart ? "В корзине" : "В корзину"} 
                </button> 
                <a href={getPrevMainPage()} onClick={goBack()} className='main_description_continue_btn button negative'>Продолжить покупки</a>
            </div>
        );
    }
    else {
        return (
            <>
                <button onClick={props.funcAddToCart} 
                    className={'main_description_add_btn button' 
                                + (props.isInCart ? " negative" : "")}
                    style={{width: "100%", marginBottom: "15px"}} >
                    {props.isInCart ? "В листе ожидания" : "В лист ожидания"}
                </button> 
                <a href={getPrevMainPage()} onClick={goBack()} className='main_description_continue_btn button negative'>Продолжить покупки</a>
            </>
        );
    }

    function getPrevMainPage() {
        let page = JSON.parse(localStorage.getItem('prevMainPage')) || {};
        if (page.href) {
            return page.href;
        }
        return '/';
    }

    function goBack() {
        let page = JSON.parse(localStorage.getItem('prevMainPage')) || {};
        page.goBack = true;
        localStorage.setItem('prevMainPage', JSON.stringify(page));
    }
}

function ProductPage(props) {
    let {id} = useParams();
    id = +id;
    let product = require('./data/products.json').find(pr => pr.id == id);
    const [curColorIndex, setCurColorIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(getIsLiked());
    const [sizeIndex, setSizeIndex] = useState(0);
    const [productNumber, setProductNumber] = useState(1);
    const [isInCart, setIsInCart] = useState(getIsInCart());

    let tempColors = [];
    let tempAdditionalImages = [];
    if (product) {
        tempColors = product.colors[curColorIndex].img;
        tempAdditionalImages = JSON.parse(JSON.stringify(product.additionalImages));
    }

    const [mainImg, setMainImg] = useState(tempColors);
    const [additionalImages, setAdditionalImages] = useState(tempAdditionalImages);
    
    useEffect(() => {
        addToRecentlyWatched();
        window.scrollTo(0, 0);
        
        setIsLiked(getIsLiked());
        setIsInCart(getIsInCart());
        setMainImg(tempColors);
        setAdditionalImages(tempAdditionalImages);
    }, [id]);

    useEffect(() => {
        setIsLiked(getIsLiked());
    }, [props.updateLikesProp]);

    useEffect(() => {
        setIsInCart(getIsInCart());
    }, [props.updateCartProp]);
    
    if (!product) {
        return (<p>К сожалению, данный товар отсутствует</p>);
    }

    return (
        <>
            <div className="h_product_title_container">
                <div className="h_product_title">{product.title}</div>

                <span className="h_rating_number">{product.rating}</span>
                <Rating rating={product.rating} />
            </div>
            <div className="h_product_subtitle">Арт. {product.sku + "" + (curColorIndex + 1)}</div>

            <main className={product.colors[curColorIndex].isAvaliable ? "" : "not_avaliable"}>
                <div className="main_img_container">
                    <div className="main_product_img_outer">
                        <img className="main_product_img" src={require("./images/" + mainImg)} alt="Product" />
                        {getLikedBtn()}
                    </div>

                    <div className="main_listing_img_container">
                        {additionalImages.map((img) => (
                            <div className="main_listing_img_outer" key={img.id} onClick={changeMainImg.bind(null, null, img.id - 1)}>
                                <img className="main_listing_img" src={require("./images/" + img.img)} alt="Product" />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="main_description_container">
                    <div className="main_description_category">
                        Цвет:
                        <div className="main_description_share">
                            Поделиться:
                            <a href="#"><span className="iconify" data-icon="akar-icons:link-chain"></span></a>
                            <a href="#"><span className="iconify" data-icon="cib:viber"></span></a>
                            <a href="#"><span className="iconify" data-icon="uil:telegram-alt"></span></a>
                        </div>
                    </div>

                    <div className="main_description_img_container">
                        {product.colors.map((img) => (
                            <div key={img.id} onClick={changeMainColor.bind(null, null, img.id - 1)}
                                    className={"main_listing_img_outer" + getClassName(img, curColorIndex)}>
                                <img className="main_listing_img" src={require("./images/" + img.img)} alt="Product" />
                            </div>
                        ))}
                    </div>

                    <div className="main_description_category">
                        Размер:
                    </div>

                    <div className="main_description_size_container">
                        {product.size.map((size) => (
                            <div key={size.id} onClick={changeSize.bind(null, null, size.id - 1)}
                                className={"main_description_size" + getClassName(size, sizeIndex)}>
                                {size.size}
                            </div>
                        ))}
                    </div>

                    <div className="main_description_category">
                        Количество:
                    </div>
                    
                    <div className='main_description_number_outer'>
                        <div onClick={productNumberDown}
                            className={productNumber === 1 ? "disabled" : ""}>
                            <span className="iconify main_description_number_btn" data-icon="ep:arrow-left" />
                        </div>
                        <span className="main_description_number">{productNumber}</span>
                        <div onClick={productNumberUp}>
                            <span className="iconify main_description_number_btn" data-icon="ep:arrow-right" />
                        </div>   
                    </div>

                    <div className="main_description_category">
                        Подарочная упаковка:
                    </div>

                    <select className="main_description_package" defaultValue="" name="package">
                        <option value="" disabled>Выбрать упаковку</option>
                        <option value="gift">Подарочная упаковка</option>
                        <option value="regular">Обычная упаковка</option>
                        <option value="without">Без упаковки</option>
                    </select>

                    <div className="main_description_category">
                        Цена:
                    </div> 

                    <div className="main_description_price_container">
                        <div className="main_description_price">{getNumberWithSeparator(product.price)}</div>
                        <div className="main_description_wholesale">{getNumberWithSeparator(product.wholesale)}</div>
                        <div className="main_description_wholesale_outer">
                            опт от{' '}
                            <span className="main_description_wholesale_min">{getNumberWithSeparator(product.wholesaleMin)}</span>
                            {' '}в корзине
                        </div>
                    </div>

                    <MainDescriptionAddOuter funcAddToCart={addToCart}
                                            isInCart={isInCart} 
                                            isAvaliable={product.colors[curColorIndex].isAvaliable} />

                    <div className="main_nav_container">
                        <div className="main_nav_item description">Описание</div>
                        <div className="main_nav_item comments active">Отзывы (<span className="main_nav_comments_number">12</span>)</div>
                    </div>

                    <div className="main_comments_outer">
                        <div className="main_comment_container">
                            <div className="main_comment_header">
                                <div className="main_comment_title">
                                    <span className="main_comment_author">Алексей,</span>
                                    <time className="main_comment_date" dateTime="2022-05-22">22.05.2022</time>
                                </div>
                                <div className="main_comment_rating_empty">
                                    <div className="main_comment_rating_fill"></div>
                                </div>
                            </div>
                            <div className="main_comment_text">
                                Стильная женская косметичка - неотъемлемый атрибут каждой девушки!
                            </div>
                        </div>
            
                        <div className="main_comment_container">
                            <div className="main_comment_header">
                                <div className="main_comment_title">
                                    <span className="main_comment_author">Елена,</span>
                                    <time className="main_comment_date" dateTime="2022-06-01">01.06.2022</time>
                                </div>
                                <div className="main_comment_rating_empty">
                                    <div className="main_comment_rating_fill"></div>
                                </div>
                            </div>
                            <div className="main_comment_text">
                                Она удобная, практичная и многофункциональная. Косметичка способна уместить всю косметику, необходимую в дороге, при этом не занимая много места. Так же в нее можно поместить наушники, различные украшения, деньги, мобильный телефон, солнцезащитные очки и другие мелочи.
                            </div>
                        </div>
            
                        <div className="main_comment_container">
                            <div className="main_comment_header">
                                <div className="main_comment_title">
                                    <span className="main_comment_author">Светлана,</span>
                                    <time className="main_comment_date" dateTime="2022-06-20">20.06.2022</time>
                                </div>
                                <div className="main_comment_rating_empty">
                                    <div className="main_comment_rating_fill"></div>
                                </div>
                            </div>
                            <div className="main_comment_text">
                                Косметичка прозрачная выполнена из ПВХ. Габариты косметички: длина 31 см, ширина 22,5 см, высота 11 см. Идеальна для бассейна, душа.
                            </div>
                        </div>
                        
                        <div className="main_load_comments_btn">Загрузить еще</div>
            
                        <div className="main_your_comment_header">Добавить отзыв</div>
            
                        <form className="main_your_comment_form">
                            <div className="main_your_comment_inputs_outer">
                                <input className="main_your_comment_inputs" type="text" name="name" placeholder="Введите имя" required />
                                <input className="main_your_comment_inputs" type="email" name="email" placeholder="Адрес электронной почты" required />
                            </div>
                            <div className="main_your_comment_inputs_outer">
                                <textarea className="main_your_comment_inputs" name="comment" rows="6" placeholder="Добавьте комментарий" required />
                                <div className="main_your_comment_btns_outer">
                                    <div className="main_your_comment_label">Поставьте оценку</div>
                                    <div className="main_your_comment_rating">
                                        <input type="radio" id="star-5" name="rating" value="5" />
                                        <label htmlFor="star-5" title="Оценка «5»"></label>	
                                        <input type="radio" id="star-4" name="rating" value="4" />
                                        <label htmlFor="star-4" title="Оценка «4»"></label>    
                                        <input type="radio" id="star-3" name="rating" value="3" />
                                        <label htmlFor="star-3" title="Оценка «3»"></label>  
                                        <input type="radio" id="star-2" name="rating" value="2" />
                                        <label htmlFor="star-2" title="Оценка «2»"></label>    
                                        <input type="radio" id="star-1" name="rating" value="1" />
                                        <label htmlFor="star-1" title="Оценка «1»"></label>
                                    </div>
                                    <button className="button" type="submit">отправить</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* <div className="main_description_outer">
                        <p>Косметичка прозрачная WashBag на молнии и гладкой ручкой, представленна в двух размерах. Женская и мужская силиконовая сумка полностью герметична и защищена от попадания влаги и намокания. Дорожная косметичка и сумка хорошо держат форму, высококачественные замки прослужат не один год. Косметичка полностью прозрачна, что придаёт ей более изяшный вид, прозрачный дизайн позволяет легко найти то, что вам нужно без особых усилий. </p>
                        <p>Возьмите универсальный органайзер с собой в дорогу, путешествие, отдых, на фитнес. Водонепроницаемую сумочку идеально взять с собой в баню, в бассейн, на пляж, в душ. Косметичку пенал применяют также для школьных принадлежностей, канцелярии. В неё с лёгкостью поместится любой ассортимент косметики, личные вещи, средства гигиены и одежда. Сумка-косметичка - унисекс,подходит для женщин,мужчин и детей.</p>
                    </div>  */}

                </div>

                <div className="main_colors_container">
                    <div className="main_color pink"></div>
                    <div className="main_color grey"></div>
                    <div className="main_color beige"></div>
                </div>
            </main>
        </>
    );

    function addToRecentlyWatched() {
        let recentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched')) || [];
        let index = recentlyWatched.indexOf(id);

        let product = require('./data/products.json').find(pr => pr.id === id);
        if (!product) {
            return;
        }
        
        if (index !== -1) {
            recentlyWatched.splice(index, 1);
        }
        recentlyWatched.push(id);

        if (recentlyWatched.length > 6) {
            recentlyWatched.shift();
        } 

        localStorage.setItem('recentlyWatched', JSON.stringify(recentlyWatched));

        props.funcUpdateRecentlyWatched();
    }

    function getIsLiked() {
        return (JSON.parse(localStorage.getItem('liked')) || []).includes(id);
    }

    function getLikedBtn() {
        let likeBtn = null;
        if (isLiked) {
            likeBtn = (
                <span className="main_like_outer" onClick={likeClick}>
                    <span className="iconify" data-icon="ant-design:heart-filled" />
                </span> 
            );
        }
        else {
            likeBtn = (
                <div className="main_like_outer" onClick={likeClick}>
                    <span className="iconify" data-icon="ant-design:heart-outlined" />
                </div> 
            );
        }
        return likeBtn;
    }

    function likeClick() {
        setIsLiked(!isLiked);

        let liked = JSON.parse(localStorage.getItem('liked')) || [];
        let likedIndex = liked.indexOf(id);

        if (likedIndex !== -1) {
            liked.splice(likedIndex, 1);
        }
        else {
            liked.push(id);
        }

        localStorage.setItem('liked', JSON.stringify(liked));

        props.funcUpdateLikes();
    }

    function changeMainImg(event, index) {
        let mImg = mainImg;

        setMainImg(additionalImages[index].img);

        additionalImages[index].img = mImg;
        setAdditionalImages(additionalImages);
    }

    function getClassName(item, index) {
        let className = "";

        if (item.id === index + 1) {
            className += " chosen";
        }

        if (!item.isAvaliable) {
            className += " not_avaliable";
        }

        return className;
    }

    function changeMainColor(event, nextColorIndex) {
        setCurColorIndex(nextColorIndex);
        setAdditionalImages(JSON.parse(JSON.stringify(product.additionalImages)));
        setMainImg(product.colors[nextColorIndex].img);
    }

    function changeSize(event, nextSizeInex) {
        if (product.size[nextSizeInex].isAvaliable) {
            setSizeIndex(nextSizeInex);
        }
    }

    function productNumberUp() {
        setProductNumber(productNumber + 1);
    }   
    
    function productNumberDown() {
        if (productNumber !== 1) {
            setProductNumber(productNumber - 1);
        }
    }

    function getIsInCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let prInCart = cart.find(pr => pr.id == id);
        if (prInCart) {
            return true;
        }
        else {
            return false;
        }
    }

    function addToCart() {
        setIsInCart(true);
        addProductToCard(id, productNumber, curColorIndex + 1, sizeIndex + 1, getProductPackage());
        props.funcUpdateCart();
    }

    function getProductPackage() {
        let select = document.querySelector('.main_description_package');
        if (select && select.value) {
            return select.value;
        }
        return "without";
    }
}

export default ProductPage;