export const addItemToCart = (cartItems, itemToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === itemToAdd.id);
    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === itemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }

    return [ ...cartItems, {...itemToAdd, quantity: 1}];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        item => item.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(
            item => item.id !== cartItemToRemove.id
          );
    }

    return cartItems.map(
        item =>
        item.id === cartItemToRemove.id ?
        {...item, quantity: item.quantity - 1} :
        item
    );
};