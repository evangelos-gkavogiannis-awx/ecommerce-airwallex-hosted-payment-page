const productsArray = [
    {
        id: "price_1LnUTFDM1jwCEz8OGoOSXiSM",
        title: "Bananas",
        price: 4.99,
        image:"/images/bananas.jpg"
    },
    {
        id: "price_1LnUTxDM1jwCEz8OAqHYTwKQ",
        title: "Apples",
        price: 9.99,
        image:"/images/apples.jpg"
    },
    {
        id: "price_1LnUUoDM1jwCEz8OvxIcJ7to",
        title: "OrangeJuice",
        price: 39.99,
        image:"/images/orange-juice.jpg"
    }
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

function getProducts() {
    return productsArray;
}

export { productsArray, getProductData, getProducts };