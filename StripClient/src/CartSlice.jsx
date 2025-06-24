import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name:"mycart",
    initialState:{
        cart:[]
    },
    reducers:{
        AddToCart:(state, actions)=>{
            const CartData = state.cart.filter(key=>key.id==actions.payload.id);
                if(CartData.length>=1){
                    window.alert("Product already added")
                }
                else{
                    state.cart.push(actions.payload);
                }
            

        }
    }
})


export const {AddToCart} = CartSlice.actions;
export default CartSlice.reducer;


