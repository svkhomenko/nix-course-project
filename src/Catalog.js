import React from "react";
import { AItem } from './tools.js';

class CatalogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        };
    }

    render() {
        let className = '';
        let iconfy = null;
        let subcatalog = null;
        if (this.props.item.subcategory.length !== 0) {
            if (this.state.isOpen) {
                className = 'open';
                iconfy = <span className="iconify" data-icon="ep:arrow-up"></span>;

                subcatalog = (
                    <ul className='subcatalog'>
                        {this.props.item.subcategory.map((item) => (
                            <li key={item.id}>
                                <AItem href={item.href}
                                    className=''
                                    text={item.subcategoryName} />
                            </li>
                        ))}
                    </ul>
                );
            }
            else {
                className = 'close';
                iconfy = <span className="iconify" data-icon="ep:arrow-down"></span>;
            }
        }

        return (
            <li className={className}>
                <span className="catalog_item">
                    <a href={this.props.item.href}>
                        {this.props.item.category}
                    </a>
                    {' '}
                    {iconfy}
                </span>
                {subcatalog}
            </li>
        );
    }
}

class Catalog extends React.Component {
    render() {
        let catalog = [
            {
                id: 1,
                category: "сумки",
                href: '#',
                subcategory: [
                    {
                        id: 1,
                        subcategoryName: "сумка для ноутбука",
                        href: '#',
                    },
                    {
                        id: 2,
                        subcategoryName: "сумка для фотоаппарата",
                        href: '#',
                    },
                    {
                        id: 3,
                        subcategoryName: "спортивная/дорожная сумка",
                        href: '#',
                    },
                ]
            },
            {
                id: 2,
                category: "для дома",
                href: '#',
                subcategory: [
                    {
                        id: 1,
                        subcategoryName: "органайзер для вещей",
                        href: '#',
                    },
                    {
                        id: 2,
                        subcategoryName: "чехол для мебели",
                        href: '#',
                    },
                    {
                        id: 3,
                        subcategoryName: "органайзер для мелочей",
                        href: '#',
                    },
                    {
                        id: 4,
                        subcategoryName: "плейсматы",
                        href: '#',
                    },
                    {
                        id: 5,
                        subcategoryName: "органайзер для проводов",
                        href: '#',
                    },
                ]
            },
            {
                id: 3,
                category: "косметички",
                href: '#',
                subcategory: [
                    {
                        id: 1,
                        subcategoryName: "дорожный органайзер",
                        href: '#',
                    },
                    {
                        id: 2,
                        subcategoryName: "для сумочки",
                        href: '#',
                    },
                    {
                        id: 3,
                        subcategoryName: "непромокаемые",
                        href: '#',
                    },
                ]
            },
            {
                id: 4,
                category: "для путешествий",
                href: '#',
                subcategory: [
                    {
                        id: 1,
                        subcategoryName: "органайзер для документов",
                        href: '#',
                    },
                    {
                        id: 2,
                        subcategoryName: "футляр для зубной щетки",
                        href: '#',
                    },
                    {
                        id: 3,
                        subcategoryName: "маски для сна",
                        href: '#',
                    },
                    {
                        id: 4,
                        subcategoryName: "чехол для чемодана",
                        href: '#',
                    },
                ]
            },
            {
                id: 5,
                category: "аксессуары для очков",
                href: '#',
                subcategory: [
                    {
                        id: 1,
                        subcategoryName: "футляр для очков",
                        href: '#',
                    },
                    {
                        id: 2,
                        subcategoryName: "цепочка для очков",
                        href: '#',
                    },
                    {
                        id: 3,
                        subcategoryName: "атомайзер",
                        href: '#',
                    },
                ]
            },
            {
                id: 6,
                category: "товары для животных",
                href: '#',
                subcategory: [
                    {
                        id: 1,
                        subcategoryName: "коврик под миску",
                        href: '#',
                    },
                    {
                        id: 2,
                        subcategoryName: "коврик под лоток",
                        href: '#',
                    },
                    {
                        id: 3,
                        subcategoryName: "защитный воротник",
                        href: '#',
                    },
                ]
            },
            {
                id: 7,
                category: "рукоделие",
                href: '#',
                subcategory: [
                    {
                        id: 1,
                        subcategoryName: "бисер",
                        href: '#',
                    },
                    {
                        id: 2,
                        subcategoryName: "стразы пришивные",
                        href: '#',
                    },
                    {
                        id: 3,
                        subcategoryName: "органайзеры пластиковые",
                        href: '#',
                    },
                ]
            },
            {
                id: 8,
                category: "пояс для инструментов",
                href: '#',
                subcategory: []
            },
            {
                id: 9,
                category: "таблетницы",
                href: '#',
                subcategory: []
            },
            {
                id: 10,
                category: "пепельницы",
                href: '#',
                subcategory: []
            },
            {
                id: 11,
                category: "бахилы силиконовые",
                href: '#',
                subcategory: []
            },
            {
                id: 12,
                category: "четки",
                href: '#',
                subcategory: []
            },
            {
                id: 13,
                category: "подарки для нее",
                href: '#',
                subcategory: []
            },
            {
                id: 14,
                category: "подарки для него",
                href: '#',
                subcategory: []
            },
        ];

        return (
            <ul className='catalog'>
                {catalog.map((item) => (
                    <CatalogItem key={item.id}
                                item={item} />
                ))}
            </ul>
        );
    }
}

class CatalogContainer extends React.Component {
    render() {
        return (
            <div className="catalog_container">
                <h2 className="catalog_title">каталог</h2>
                <Catalog />
            </div>
        );
    }
}

export default CatalogContainer;