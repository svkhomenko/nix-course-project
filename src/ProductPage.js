import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductPage(props) {
    let {id} = useParams();

    useEffect(() => {
        addToRecentlyWatched();
    }, [id]);

    return (
        <p>Product page {id}</p>
    );

    function addToRecentlyWatched() {
        let recentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched')) || [];
        let index = recentlyWatched.indexOf(id);

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
}

export default ProductPage;