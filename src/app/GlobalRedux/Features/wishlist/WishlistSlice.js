import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlist: [], //TODO get the wishlist from the local storage
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action) {
            const { id } = action.payload
            const existingProduct = state.wishlist.find(product => product.id === id)

            if (!existingProduct) {
                state.wishlist.push(action.payload)
            }
        },
        removeFromWishlist(state, action) {
            const { id } = action.payload
            state.wishlist = state.wishlist.filter(product => product.id !== id)
        },
    },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer