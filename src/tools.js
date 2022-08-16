import React from "react";

export class AItem extends React.Component {
    render() {
        return (
            <a href={this.props.href} className={this.props.className}>{this.props.text}</a>
        );
    }
}