export function setLiked(products) {
    let liked = JSON.parse(localStorage.getItem('liked')) || [];
    return products.map((product) => {
        let temp = {...product};
        if (liked.includes(temp.id)) {
            temp.isLiked = true;
        }
        else {
            temp.isLiked = false;
        }
        return temp;
    });
}

export function setFromCart(products) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return products.map((product) => {
        let temp = {...product};
        if (cart.includes(temp.id)) {
            temp.isInCart = true;
        }
        else {
            temp.isInCart = false;
        }
        return temp;
    });
}

export function getNumberWithSeparator(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}