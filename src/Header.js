import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.navMenuItems = require('./data/navMenu.json');
    }

    render() {
        return (
            <nav className="nav_menu">
                {this.navMenuItems.map((item) => (
                    <NavLink key={item.id}
                            to={item.href}
                            className={({ isActive }) => isActive ? "nav_menu_items active" : "nav_menu_items"}>
                        {item.text}
                    </NavLink>
                ))}
            </nav>
        ); 
    }
}

function Intro(props) {
    const [likesNumber, setLikesNumber] = useState(getLikedNumber());
    const [cartNumber, setCartNumber] = useState(getCartNumber());

    useEffect(() => {
        setLikesNumber(getLikedNumber());
    }, [props.updateLikesProp]);

    useEffect(() => {
        setCartNumber(getCartNumber());
    }, [props.updateCartProp]);

    return (
        <div className="intro">
            <a href="/" className="logo_container">
                <div className="logo_outer">
                    <img src={require("./images/logo.png")} alt="logo" />
                </div>
                <div className="logo_subtext">вместе дешеле.org</div>
            </a>
            
            <div className="intro_telephone_outer">
                <span className="iconify" data-icon="carbon:phone-filled"></span>
                <a href="tel: +19688905556">+1 (968) 890 55 56</a>
            </div>
            
            <h1>Интернет-магазин с бесплатной доставкой</h1>

            <div className="intro_btns_container">
                <div className="intro_btns_outer">
                    <span className="iconify" data-icon="bi:person-fill"></span>
                    <div className="intro_btn_subtext">Войти</div>
                </div>
                <div className="intro_btns_outer">
                    <span className="iconify" data-icon="ant-design:heart-filled"></span>
                    <div className="intro_btn_subtext intro_likes">{likesNumber}</div>
                </div>
                <div className="intro_btns_outer" onClick={remove}>
                    <span className="iconify" data-icon="ps:shopping-cart"></span>
                    <div className="intro_btn_subtext intro_cart">{cartNumber}</div>
                </div>
            </div>
        </div>
    );

    function getLikedNumber() {
        let liked = JSON.parse(localStorage.getItem('liked')) || [];
        return liked.length;
    }

    function getCartNumber() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let products = require('./data/products.json');

        let totalCost = cart.reduce((prevValue, curValue) => {
            let product = products.find(pr => pr.id == curValue);
            return prevValue + +product.price; 
        }, 0);

        let reducedCost = cart.reduce((prevValue, curValue) => {
            let product = products.find(pr => pr.id == curValue);

            if (product.wholesaleMin <= totalCost) {
                return prevValue + +product.wholesale; 
            }
            else {
                return prevValue + +product.price; 
            }
        }, 0);

        return reducedCost;
    }

    function remove() {
        localStorage.setItem('cart', JSON.stringify([]));
        console.log(localStorage.getItem('cart'));
    }
}

function SearchContainer(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');

    useEffect(() => {
        setSearch(searchParams.get('search') || '');
    }, [searchParams]);

    return (
        <div className="search_container">
            <button className="catalog_btn button" onClick={props.funcToggleCatalog}>
                <span className="iconify" data-icon="bx:menu-alt-right"></span>
                каталог
            </button>

            <form action="/">
                <input className="search_input" value={search} onChange={handleChange} type="search" name="search" placeholder="Введите что вам нужно" />
                <button className="search_btn button" type="submit">Поиск</button>
            </form>
        </div>
    );

    function handleChange(event) {
        setSearch(event.target.value);
    }
}

class CatalogHorizontal extends React.Component {
    constructor(props) {
        super(props);

        this.catalogHorizontalItems = require('./data/catalogHorizontal.json');
    }

    render() {
        return (
            <nav className="catalog_horizontal">
                {this.catalogHorizontalItems.map((item) => (
                    <NavLink key={item.id}
                            to={item.href}
                            className={({ isActive }) => isActive ? "catalog_horizontal_items active" : "catalog_horizontal_items"}>
                        {item.text}
                    </NavLink>
                ))}
            </nav>
        );
    }
}

class BreadcrumbsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.breadcrumbs = require('./data/breadcrumbs.json');
    }

    render() {
        return (
            <div className="breadcrumbs_container">
                {this.breadcrumbs.map((item) => (
                    <Link key={item.id}
                            to={item.href}
                            className='breadcrumbs'>
                        {item.text}
                    </Link>
                ))}
            </div>
        ); 
    }
}

class Header extends React.Component {
    render() {
        return (
            <header>
                <NavMenu />
                <Intro updateLikesProp={this.props.updateLikesProp}
                        updateCartProp={this.props.updateCartProp} />
                <SearchContainer funcToggleCatalog={this.props.funcToggleCatalog} />
                <CatalogHorizontal />
                <BreadcrumbsContainer />
            </header>
        );
    }
}

export default Header;