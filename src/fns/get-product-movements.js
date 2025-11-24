function getProductMovement(movements){
    const productMap = {};

    movements.forEach(movement => {
        const { productId, amount, type, product } = movement;
    
        if(!productMap[productId]){
            productMap[productId] = { name: product.name, amount: 0 }
        }

        const amountChange = type === "in" ? amount: -amount;
        productMap[productId].amount += amountChange;
    })

    const products = Object.values(productMap) 

    return { products };
}

module.exports = getProductMovement;