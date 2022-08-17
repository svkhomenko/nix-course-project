import React from "react";
import { Link, NavLink } from "react-router-dom";

class CatalogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };

        this.showSubcatalog = this.showSubcatalog.bind(this);
    }

    showSubcatalog() {
        this.setState((state) => ({
            isOpen: !state.isOpen
        }));
    }

    render() {
        let className = '';
        let iconfy = null;
        let subcatalog = null;
        if (this.props.item.subcategory.length !== 0) {
            if (this.state.isOpen) {
                className = 'open';
                iconfy = (
                    <em>
                        <span className="iconify" data-icon="ep:arrow-up" />
                    </em>
                );

                subcatalog = (
                    <ul className='subcatalog'>
                        {this.props.item.subcategory.map((item) => (
                            <li key={item.id}>
                                <NavLink to={item.href}
                                        className={({ isActive }) => isActive ? "active" : ""}>
                                    {item.subcategoryName}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                );
            }
            else {
                className = 'close';
                iconfy = (
                    <span>
                        <span className="iconify" data-icon="ep:arrow-down" />
                    </span>
                );
            }
        }

        return (
            <li className={className}>
                <span className="catalog_item" onClick={this.showSubcatalog}>

                    <Link to={this.props.item.href}>
                        {this.props.item.category}
                    </Link>
                    {' '}
                    {iconfy}
                </span>
                {subcatalog}
            </li>
        );
    }
}

class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.catalog = require('./data/catalog.json');
    }

    render() {
        return (
            <ul className='catalog'>
                {this.catalog.map((item) => (
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