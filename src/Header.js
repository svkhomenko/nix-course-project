import React from "react";
import { Link, NavLink } from "react-router-dom";

class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.navMenuItems = require('./data/navMenu.json') || [];
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

class Intro extends React.Component {
    render() {
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
                        <div className="intro_btn_subtext intro_likes">0</div>
                    </div>
                    <div className="intro_btns_outer">
                        <span className="iconify" data-icon="ps:shopping-cart"></span>
                        <div className="intro_btn_subtext intro_cart">1234</div>
                    </div>
                </div>
            </div>
        );
    }
}

class SearchContainer extends React.Component {
    render() {
        return (
            <div className="search_container">
                <button className="catalog_btn button">
                    <span className="iconify" data-icon="bx:menu-alt-right"></span>
                    каталог
                </button>

                <form>
                    <input className="search_input" type="search" name="search" placeholder="Введите что вам нужно" />
                    <button className="search_btn button">Поиск</button>
                </form>
            </div>
        );
    }
}

class CatalogHorizontal extends React.Component {
    constructor(props) {
        super(props);

        this.catalogHorizontalItems = require('./data/catalogHorizontal.json') || [];
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

        this.breadcrumbs = require('./data/breadcrumbs.json') || [];
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
                <Intro />
                <SearchContainer />
                <CatalogHorizontal />
                <BreadcrumbsContainer />
            </header>
        );
    }
} 

export default Header;