import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [], //TODO get the cart from the local storage
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { id, quantity } = action.payload
            const existingProduct = state.cart.find(product => product.id === id)

            if (existingProduct) {
                existingProduct.quantity += quantity
            } else {
                state.cart.push(action.payload)
            }
        },
        removeFromCart(state, action) {
            const { id, quantity } = action.payload
            const existingProduct = state.cart.find(product => product.id === id)

            if (existingProduct) {
                existingProduct.quantity -= quantity

                if (existingProduct.quantity <= 0) {
                    state.cart = state.cart.filter(product => product.id !== id)
                }
            }
        },
    },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer

