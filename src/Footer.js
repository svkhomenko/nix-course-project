import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="footer_logo_outer">
                    <img src={require("./images/logo_white.png")} alt="logo" />
                </div>
                <div className="footer_block">
                    <a href="/sitemap">Карта сайта</a>
                    <a href="/">Каталог</a>
                    <a href="/about-us">О нас</a>
                    <a href="/payment-and-delivery">Оплата и доставка</a>
                </div>
                <div className="footer_block">
                    <a href="/wholesale">Опт</a>
                    <a href="/">Акции</a>
                    <a href="/blog">Блог</a>
                    <a href="/contacts">Контакты</a>
                </div>
                <div className="footer_links_outer">
                    <div>
                        <a href="#" className="footer_links">Пользовательское соглашение</a>
                        <a href="#" className="footer_links">Политика конфиденцииальности</a>
                    </div>
                    <a href="#" className="footer_network"><span className="iconify" data-icon="tabler:brand-vk"></span></a>
                    <a href="#" className="footer_network"><span className="iconify" data-icon="uil:telegram-alt"></span></a>
                    <a href="#" className="footer_network"><span className="iconify" data-icon="akar-icons:instagram-fill"></span></a>
                </div>
            </footer>
        );
    }
}

export default Footer;