import React from "react";
import { AItem } from './tools.js';

class NavMenu extends React.Component {
    render() {
        let navMenuItems = [
            {
                id: 1,
                href: '#',
                text: 'о нас',
                isActive: false
            },
            {
                id: 2,
                href: '#',
                text: 'опт',
                isActive: false
            },
            {
                id: 3,
                href: '#',
                text: 'оплата и доставка',
                isActive: false
            },
            {
                id: 4,
                href: '#',
                text: 'акции',
                isActive: true
            },
            {
                id: 5,
                href: '#',
                text: 'блог',
                isActive: false
            },
            {
                id: 6,
                href: '#',
                text: 'контакты',
                isActive: false
            },
        ];

        return (
            <nav className="nav_menu">
                {navMenuItems.map((item) => {
                    let className = 'nav_menu_items';
                    if (item.isActive) {
                        className += ' active';
                    }

                    return <AItem key={item.id}
                            href={item.href}
                            className={className}
                            text={item.text} />
                    }
                )}
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
    render() {
        let catalogHorizontalItems = [
            {
                id: 1,
                href: '#',
                text: 'сумки',
                isActive: false
            },
            {
                id: 2,
                href: '#',
                text: 'для дома',
                isActive: false
            },
            {
                id: 3,
                href: '#',
                text: 'косметички',
                isActive: true
            },
            {
                id: 4,
                href: '#',
                text: 'для путешествий',
                isActive: false
            },
            {
                id: 5,
                href: '#',
                text: 'для животных',
                isActive: false
            },
            {
                id: 6,
                href: '#',
                text: 'для рукоделия',
                isActive: false
            },
            {
                id: 7,
                href: '#',
                text: 'органайзеры',
                isActive: false
            },
            {
                id: 8,
                href: '#',
                text: 'пепельницы',
                isActive: false
            },
            {
                id: 9,
                href: '#',
                text: 'подарки для нее',
                isActive: false
            },
            {
                id: 10,
                href: '#',
                text: 'подарки для него',
                isActive: false
            },
        ];

        return (
            <nav className="catalog_horizontal">
                {catalogHorizontalItems.map((item) => {
                    let className = 'catalog_horizontal_items';
                    if (item.isActive) {
                        className += ' active';
                    }

                    return <AItem key={item.id}
                            href={item.href}
                            className={className}
                            text={item.text} />
                    }
                )}
            </nav>
        ); 
    }
}

class BreadcrumbsContainer extends React.Component {
    render() {
        let breadcrumbs = [
            {
                id: 1,
                href: '/',
                text: 'главная',
            },
            {
                id: 2,
                href: '#',
                text: 'каталог',
            },
        ];

        return (
            <div className="breadcrumbs_container">
                {breadcrumbs.map((item) => {
                    return <AItem key={item.id}
                            href={item.href}
                            className='breadcrumbs'
                            text={item.text} />
                    }
                )}
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