import { createSlice } from "@reduxjs/toolkit";

//this will be our model for our reducers
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,//this quantity is from the product page
        total: 0, 
    },
    reducers: {
        addProduct: (state, action) => {
            //push the after effects of the action into the product array
            state.products.push(action.payload)
            state.quantity += 1;
            //the state total will be the multiply of price and quantity
            state.total += action.payload.price * action.payload.quantity
        },
        //reset the state after we checkout
        reset: (state) => {
            state = initialState;
        }
    }
})
//destructure the addProduct and reset, we can use this anywhere in our app
export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;