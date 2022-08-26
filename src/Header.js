import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, NavLink } from "react-router-dom";

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
                <div className="intro_btns_outer" onClick={props.funcToggleCart}>
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

        let totalCost = cart.reduce((prevValue, curProductFromCart) => {
            let product = products.find(pr => +pr.id === +curProductFromCart.id);
            if (product) {
                return prevValue + product.price * curProductFromCart.number; 
            }
            return prevValue;
        }, 0);

        let reducedCost = cart.reduce((prevValue, curProductFromCart) => {
            let product = products.find(pr => +pr.id === +curProductFromCart.id);

            if (product) {
                if (product.wholesaleMin <= totalCost) {
                    return prevValue + product.wholesale * curProductFromCart.number; 
                }
                else {
                    return prevValue + product.price * curProductFromCart.number;
                }
            }
            return prevValue;
        }, 0);

        return reducedCost;
    }
}

function SearchContainer(props) {
    const [searchParams] = useSearchParams();
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

export function BreadcrumbsContainer(props) {
    let { id, category, subcategory } = useParams();
    const [breadcrumbs, setBreadcrumbs] = useState(getBreadcrumbs());

    useEffect(() => {
        setBreadcrumbs(getBreadcrumbs());
    }, [id, category, subcategory, props.path]);

    return (
        <div className="breadcrumbs_container">
            {breadcrumbs.map((item) => (
                <Link key={item.id}
                        to={item.href}
                        className='breadcrumbs'>
                    {item.text}
                </Link>
            ))}
        </div>
    ); 

    function getBreadcrumbs() {
        let pathname = window.location.pathname;
        let pathnameArr = pathname.split('/').filter(path => path);
        let tempBreadcrumbs = [
            {
                id: 1,
                href: "/",
                text: "главная"
            },
            {
                id: 2,
                href: "/",
                text: "каталог"
            }
        ];
    
        if (pathnameArr.length !== 0) {
            if (pathnameArr[0] === 'product') {
                let product = require('./data/products.json').find(pr => +pr.id === +pathnameArr[1]);
                if (product) {
                    tempBreadcrumbs.push({
                        id: 3,
                        href: window.location.pathname,
                        text: product.title
                    });
                }
            }
            else {
                let navItem = require('./data/navMenu.json').find(item => item.href === `/${pathnameArr[0]}`);
                if (navItem) {
                    tempBreadcrumbs[1].href = navItem.href;
                    tempBreadcrumbs[1].text = navItem.text;
                }
                else if (pathnameArr[0] === 'sitemap') {
                    tempBreadcrumbs[1].href = "/sitemap";
                    tempBreadcrumbs[1].text = "Карта сайта";
                }
                else {
                    let category = require('./data/catalog.json').find(item => item.href === `/${pathnameArr[0]}`);
                    if (category) {
                        tempBreadcrumbs.push({
                            id: 3,
                            href: category.href,
                            text: category.category
                        });

                        let subcategory = category.subcategory.find(item => item.href === `/${pathnameArr[0]}/${pathnameArr[1]}`);
                        if (subcategory) {
                            tempBreadcrumbs.push({
                                id: 4,
                                href: subcategory.href,
                                text: subcategory.subcategoryName
                            });
                        }
                    }
                }
            }
        }
        return tempBreadcrumbs;        
    }
}


class Header extends React.Component {
    render() {
        return (
            <header>
                <NavMenu />
                <Intro funcToggleCart={this.props.funcToggleCart}
                        updateLikesProp={this.props.updateLikesProp}
                        updateCartProp={this.props.updateCartProp} />
                <SearchContainer funcToggleCatalog={this.props.funcToggleCatalog} />
                <CatalogHorizontal />
            </header>
        );
    }
}

export default Header;