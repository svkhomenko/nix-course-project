import React from "react";
import CatalogContainer from './Catalog.js';

class Main extends React.Component {
    render() {
        return (
            <main>
                <CatalogContainer />

                {/* <div class="listing_container">
                    <div class="sort_container">
                        <div class="sort_nav">
                            Сортировать:
                            <a href="#" class="sort_nav_items active">Популярные</a>
                            <a href="#" class="sort_nav_items">Сначала дешевые</a>
                            <a href="#" class="sort_nav_items">Сначала дорогие</a>
                        </div>
                        <span class="iconify" data-icon="akar-icons:settings-vertical"></span>
                    </div>

                    <div class="listing">
                        <a class="product_card not_avaliable" href="#">
                            <div class="product_img_outer">
                                <img class="product_img" src="../images/product1.png" alt="Product image">
                                <div class="like_outer like">
                                    <span class="iconify like" data-icon="ant-design:heart-filled"></span>
                                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                                </div>
                            </div>
                            <div class="product_title">
                                Косметичка непромокаемая, 31/22/11 см
                            </div>
                            <div class="product_colors">
                                <div class="product_color white"></div>
                                <div class="product_color black"></div>
                                <div class="product_color pink"></div>
                            </div>
                            <div class="product_values">
                                <div>
                                    <div class="product_price">123</div>
                                    цена
                                </div>
                                <div class="product_wholesale_outer">
                                    <div class="product_wholesale">103</div>
                                    опт от <span class="product_wholesale_min">5 000</span>
                                </div>
                                <div>
                                    <div class='product_number_outer'>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-left"></span>
                                        <span class="product_number">1</span>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-right"></span>
                                    </div>
                                    количество
                                </div>
                            </div>
                            <div class="product_cart_add_outer">
                                <button class='product_cart_add_btn button'>В корзину</button>
                                <div class="rating_container">
                                    <span class="rating_number">4.7</span>
                                    <div class="rating_fill">
                                        <div class="rating"></div>
                                        <div class="rating_empty"></div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a class="product_card" href="#">
                            <div class="product_img_outer">
                                <img class="product_img" src="../images/product1.png" alt="Product image">
                                <div class="like_outer like">
                                    <span class="iconify like" data-icon="ant-design:heart-filled"></span>
                                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                                </div>
                            </div>
                            <div class="product_title">
                                Косметичка непромокаемая, 31/22/11 см
                            </div>
                            <div class="product_colors">
                                <div class="product_color white"></div>
                                <div class="product_color black"></div>
                                <div class="product_color pink"></div>
                            </div>
                            <div class="product_values">
                                <div>
                                    <div class="product_price">123</div>
                                    цена
                                </div>
                                <div class="product_wholesale_outer">
                                    <div class="product_wholesale">103</div>
                                    опт от <span class="product_wholesale_min">5 000</span>
                                </div>
                                <div>
                                    <div class='product_number_outer'>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-left"></span>
                                        <span class="product_number">1</span>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-right"></span>
                                    </div>
                                    количество
                                </div>
                            </div>
                            <div class="product_cart_add_outer">
                                <button class='product_cart_add_btn button'>В корзину</button>
                                <div class="rating_container">
                                    <span class="rating_number">4.7</span>
                                    <div class="rating_fill">
                                        <div class="rating"></div>
                                        <div class="rating_empty"></div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a class="product_card" href="#">
                            <div class="product_img_outer">
                                <img class="product_img" src="../images/product1.png" alt="Product image">
                                <div class="like_outer like">
                                    <span class="iconify like" data-icon="ant-design:heart-filled"></span>
                                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                                </div>
                            </div>
                            <div class="product_title">
                                Косметичка непромокаемая, 31/22/11 см
                            </div>
                            <div class="product_colors">
                                <div class="product_color white"></div>
                                <div class="product_color black"></div>
                                <div class="product_color pink"></div>
                            </div>
                            <div class="product_values">
                                <div>
                                    <div class="product_price">123</div>
                                    цена
                                </div>
                                <div class="product_wholesale_outer">
                                    <div class="product_wholesale">103</div>
                                    опт от <span class="product_wholesale_min">5 000</span>
                                </div>
                                <div>
                                    <div class='product_number_outer'>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-left"></span>
                                        <span class="product_number">1</span>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-right"></span>
                                    </div>
                                    количество
                                </div>
                            </div>
                            <div class="product_cart_add_outer">
                                <button class='product_cart_add_btn button'>В корзину</button>
                                <div class="rating_container">
                                    <span class="rating_number">4.7</span>
                                    <div class="rating_fill">
                                        <div class="rating"></div>
                                        <div class="rating_empty"></div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a class="product_card" href="#">
                            <div class="product_img_outer">
                                <img class="product_img" src="../images/product1.png" alt="Product image">
                                <div class="like_outer like">
                                    <span class="iconify like" data-icon="ant-design:heart-filled"></span>
                                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                                </div>
                            </div>
                            <div class="product_title">
                                Косметичка непромокаемая, 31/22/11 см
                            </div>
                            <div class="product_colors">
                                <div class="product_color white"></div>
                                <div class="product_color black"></div>
                                <div class="product_color pink"></div>
                            </div>
                            <div class="product_values">
                                <div>
                                    <div class="product_price">123</div>
                                    цена
                                </div>
                                <div class="product_wholesale_outer">
                                    <div class="product_wholesale">103</div>
                                    опт от <span class="product_wholesale_min">5 000</span>
                                </div>
                                <div>
                                    <div class='product_number_outer'>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-left"></span>
                                        <span class="product_number">1</span>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-right"></span>
                                    </div>
                                    количество
                                </div>
                            </div>
                            <div class="product_cart_add_outer">
                                <button class='product_cart_add_btn button'>В корзину</button>
                                <div class="rating_container">
                                    <span class="rating_number">4.7</span>
                                    <div class="rating_fill">
                                        <div class="rating"></div>
                                        <div class="rating_empty"></div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a class="product_card" href="#">
                            <div class="product_img_outer">
                                <img class="product_img" src="../images/product1.png" alt="Product image">
                                <div class="like_outer like">
                                    <span class="iconify like" data-icon="ant-design:heart-filled"></span>
                                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                                </div>
                            </div>
                            <div class="product_title">
                                Косметичка непромокаемая, 31/22/11 см
                            </div>
                            <div class="product_colors">
                                <div class="product_color white"></div>
                                <div class="product_color black"></div>
                                <div class="product_color pink"></div>
                            </div>
                            <div class="product_values">
                                <div>
                                    <div class="product_price">123</div>
                                    цена
                                </div>
                                <div class="product_wholesale_outer">
                                    <div class="product_wholesale">103</div>
                                    опт от <span class="product_wholesale_min">5 000</span>
                                </div>
                                <div>
                                    <div class='product_number_outer'>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-left"></span>
                                        <span class="product_number">1</span>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-right"></span>
                                    </div>
                                    количество
                                </div>
                            </div>
                            <div class="product_cart_add_outer">
                                <button class='product_cart_add_btn button'>В корзину</button>
                                <div class="rating_container">
                                    <span class="rating_number">4.7</span>
                                    <div class="rating_fill">
                                        <div class="rating"></div>
                                        <div class="rating_empty"></div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a class="product_card not_avaliable" href="#">
                            <div class="product_img_outer">
                                <img class="product_img" src="../images/product1.png" alt="Product image">
                                <div class="like_outer like">
                                    <span class="iconify like" data-icon="ant-design:heart-filled"></span>
                                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                                </div>
                            </div>
                            <div class="product_title">
                                Косметичка непромокаемая, 31/22/11 см
                            </div>
                            <div class="product_colors">
                                <div class="product_color white"></div>
                                <div class="product_color black"></div>
                                <div class="product_color pink"></div>
                            </div>
                            <div class="product_values">
                                <div>
                                    <div class="product_price">123</div>
                                    цена
                                </div>
                                <div class="product_wholesale_outer">
                                    <div class="product_wholesale">103</div>
                                    опт от <span class="product_wholesale_min">5 000</span>
                                </div>
                                <div>
                                    <div class='product_number_outer'>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-left"></span>
                                        <span class="product_number">1</span>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-right"></span>
                                    </div>
                                    количество
                                </div>
                            </div>
                            <div class="product_cart_add_outer">
                                <button class='product_cart_add_btn button'>В корзину</button>
                                <div class="rating_container">
                                    <span class="rating_number">4.7</span>
                                    <div class="rating_fill">
                                        <div class="rating"></div>
                                        <div class="rating_empty"></div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a class="product_card" href="#">
                            <div class="product_img_outer">
                                <img class="product_img" src="../images/product1.png" alt="Product image">
                                <div class="like_outer like">
                                    <span class="iconify like" data-icon="ant-design:heart-filled"></span>
                                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                                </div>
                            </div>
                            <div class="product_title">
                                Косметичка непромокаемая, 31/22/11 см
                            </div>
                            <div class="product_colors">
                                <div class="product_color white"></div>
                                <div class="product_color black"></div>
                                <div class="product_color pink"></div>
                            </div>
                            <div class="product_values">
                                <div>
                                    <div class="product_price">123</div>
                                    цена
                                </div>
                                <div class="product_wholesale_outer">
                                    <div class="product_wholesale">103</div>
                                    опт от <span class="product_wholesale_min">5 000</span>
                                </div>
                                <div>
                                    <div class='product_number_outer'>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-left"></span>
                                        <span class="product_number">1</span>
                                        <span class="iconify product_number_btn" data-icon="ep:arrow-right"></span>
                                    </div>
                                    количество
                                </div>
                            </div>
                            <div class="product_cart_add_outer">
                                <button class='product_cart_add_btn button'>В корзину</button>
                                <div class="rating_container">
                                    <span class="rating_number">4.7</span>
                                    <div class="rating_fill">
                                        <div class="rating"></div>
                                        <div class="rating_empty"></div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="page_index_container">
                        Страница
                        <a href="#" class="page_index active">1</a>
                        <a href="#" class="page_index">2</a>
                        <a href="#" class="page_index">3</a>
                        <div class="page_index_reduction_outer">
                            <div class="page_index_reduction"></div>
                            <div class="page_index_reduction"></div>
                            <div class="page_index_reduction"></div>
                        </div>
                        <a href="#" class="page_index">15</a>
                    </div>
                </div> */}
            </main>
        );
    }
} 

export default Main;