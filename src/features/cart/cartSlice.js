import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart:[],
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
            item.totalPrice = item.quantity * item.unitPrice;

            if(item.quantity === 0) cartSlice.caseReducers.removeItemFromCart(state, action);
        
        },
        clearCart(state){
            state.cart = []
        }
    }
})

export const {addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;


export const getCart = (store) => store.cart.cart;

export const gettotalPizza = (store) =>
    store.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalPrice = (store) =>
    store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getCurrentQuantityById = id => store =>
    store.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
