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
                alert("Product already added");
            }
            else{
                state.cart.push(actions.payload);
            }
        },
        Increment:(state,actions)=>{
            for(let i =0;i<state.cart.length;i++){
                if(state.cart[i].id==actions.payload.id){
                    state.cart[i].qnty++;
                }
            }

        },
        Decrement:(state, actions)=>{
            for(let i =0;i<state.cart.length;i++){
                if(state.cart[i].id==actions.payload.id)
                    {
                    if(state.cart[i].qnty<=1)
                        {
                        alert("You cant take less then one product")
                    }
                    else{
                        state.cart[i].qnty--
                    }
                }
            }
            
        },
        RemoveItem:(state, actions)=>{
            state.cart=state.cart.filter(key=>key.id != actions.payload.id);
        }

    }
})


export const {AddToCart, Increment, Decrement,RemoveItem} = CartSlice.actions;
export default CartSlice.reducer;


