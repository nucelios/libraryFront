
import { mainReducer } from "@/features/mainSlice/mainSlice";
import userSlice from "@/features/userSlice/userSlice";
import { combineReducers } from "@reduxjs/toolkit";



export const rootReducer = combineReducers({
    library: mainReducer, [userSlice.name]: userSlice.reducer
});