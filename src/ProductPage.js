import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Rating } from "./ProductCard.js";
import { getNumberWithSeparator, addProductToCard, getTotalRating } from "./tools.js";

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

function Comment({comment}) {
    return (
        <div className="main_comment_container">
            <div className="main_comment_header">
                <div className="main_comment_title">
                    <span className="main_comment_author">{comment.author + ", "}</span>
                    <time className="main_comment_date" dateTime={getDateTime()}>{comment.date}</time>
                </div>
                <div className="main_comment_rating_empty">
                    <div className="main_comment_rating_fill" 
                    style={getRatingStyle()} />
                </div>
            </div>
            <div className="main_comment_text">
                {comment.text}
            </div>
        </div>
    );

    function getDateTime() {
        let reg = /^(\d{2}).(\d{2}).(\d{4})$/;
        return comment.date.replace(reg, '$3-$2-$1');
    }

    function getRatingStyle() {
        let rating = 100 * comment.rating / 5;
        return {width: rating + "%"}
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
    const [curNavItemIndex, setCurNavItemIndex] = useState(1);
    const [visibleCommentsNumber, setVisibleCommentsNumber] = useState(3);
    const [comments, setComments] = useState(product.comments);

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
                <div className="h_product_title">{product.title}{", "}{product.size[sizeIndex].size}</div>
                <span className="h_rating_number">{getTotalRating(comments)}</span>
                <Rating rating={getTotalRating(comments)} />
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

                    {product.colors[curColorIndex].isAvaliable &&
                    <>
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
                    </>}

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
                        <div className={"main_nav_item" + (curNavItemIndex === 0 ? " active" : '')}
                            onClick={changeNavItem.bind(null, null, 0)}>
                            Описание
                        </div>
                        <div className={"main_nav_item" + (curNavItemIndex === 1 ? " active" : '')}
                            onClick={changeNavItem.bind(null, null, 1)}>
                            Отзывы ({comments.length})
                        </div>
                    </div>

                    {curNavItemIndex === 0 && 
                        <div className="main_description_outer">
                            {product.description
                                        .split('\n')
                                        .map((text, index) => <p key={index}>{text}</p>)}
                        </div> }

                    {curNavItemIndex === 1 &&
                        <>
                            {comments.slice(0, visibleCommentsNumber)
                                            .map(comment => <Comment key={comment.id} comment={comment}/>)}

                            {visibleCommentsNumber < comments.length 
                            && <div className="main_load_comments_btn" onClick={addMoreComments}>Загрузить еще</div>}
                
                            <div className="main_your_comment_header">Добавить отзыв</div>
                
                            <form className="main_your_comment_form" onSubmit={submitNewComment}>
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
                        </> }
                </div>

                <div className="main_colors_container">
                    {product.mainColors.map(color => <div key={color.id} className="main_color" style={{backgroundColor: color.color}} />)}
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

    function changeNavItem(event, index) {
        setCurNavItemIndex(index);
    }

    function addMoreComments() {
        setVisibleCommentsNumber(visibleCommentsNumber + 3);
    }

    function submitNewComment(event) {
        event.preventDefault();
        let form = document.getElementsByClassName("main_your_comment_form")[0];
        let date = new Date();

        let comment = {
            id: product.comments.length + 1,
            author: form.name.value,
            date: `${addNull(date.getDate())}.${addNull(date.getMonth() + 1)}.${date.getFullYear()}`,
            rating: form.rating.value || 0,
            text: form.comment.value
        };

        product.comments.push(comment);
        setComments([...product.comments]);
        form.reset();

        props.funcUpdateRating();
    }

    function addNull(number) {
        if (number > 9) {
            return number;
        }
        return '0' + number;
    }
}

export default ProductPage;