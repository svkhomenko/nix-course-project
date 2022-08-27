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
    let waitingList = JSON.parse(localStorage.getItem('waitingList')) || [];

    let tempProducts = products.map((product) => {
        let temp = {...product};
        let prInCart = cart.find(pr => +pr.id === +temp.id);
        if (prInCart) {
            temp.isInCart = true;
        }
        else {
            temp.isInCart = false;
        }
        return temp;
    });

    return tempProducts.map((product) => {
        let temp = {...product};
        let prInWaitingList = waitingList.find(pr => pr.id == temp.id);
        if (prInWaitingList) {
            temp.isInCart = true;
        }
        return temp;
    });
}

export function getNumberWithSeparator(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function addProductToCard(isAvaliable, id, number, colorId = 1, sizeId = 1, productPackage = "without") {
    if (isAvaliable) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        let product = cart.find(pr => +pr.id === +id && +pr.colorId === +colorId && +pr.sizeId === +sizeId && pr.productPackage === productPackage);
        if (product) {
            product.number += number;
        }
        else {
            cart.push({
                id: id,
                number: number,
                colorId: colorId,
                sizeId: sizeId,
                productPackage: productPackage
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    else {
        let waitingList = JSON.parse(localStorage.getItem('waitingList')) || [];

        let product = waitingList.find(pr => pr.id == id && pr.colorId == colorId);
        if (!product) {
            waitingList.push({
                id: id,
                colorId: colorId
            });
            
            localStorage.setItem('waitingList', JSON.stringify(waitingList));
        }
    }
}

export function getTotalRating(comments) {
    let sum = 0;
    for (let i = 0; i < comments.length; i++) {
        sum += +comments[i].rating;
    }
    if (comments.length) {
        return +(sum / comments.length).toFixed(1);
    }
    return 0;
}

export let packages = {
    "gift": "Подарочная упаковка",
    "regular": "Обычная упаковка",
    "without": "Без упаковки"
}