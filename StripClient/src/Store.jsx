import {configureStore} from "@reduxjs/toolkit";
import myans from "./CartSlice"

const store = configureStore({
    reducer:{
        mycart:myans
    }
})


export default store;