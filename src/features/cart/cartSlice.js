import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart:[{
        pizzaId: 1,
        name: "Margherita",
        unitPrice: 12,
        quantity:2,
        totalPrice:24,
    }],
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItemToCart(state, action){
            //payload will be the item which is being pushed into the object
            state.cart.push(action.payload)
        },
        removeItemFromCart(state, action){
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action){
            const item = state.cart.find((id)=>id.pizzaId === action.payload)
            item.quantity+=1;
            item.totalPrice = item.quantity*item.unitPrice;
        },
        decreaseItemQuantity(state, action){
            const item = state.cart.find(id => id.pizzaId === action.payload)
            item.quantity-=1;
            item.totalPrice = item.quantity * item.totalPrice;
        
        },
        clearCart(state){
            state.cart = []
        }
    }
})

export const {addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;