"use client";

import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './Features/profile/profileSlice';

export const store = configureStore({
    reducer: {
        profile: profileReducer
    }
})

export default store;