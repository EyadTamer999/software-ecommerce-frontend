"use client";

import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    name: "John Doe",
    age: 25,
    email: "",
};

const profileSlice = createSlice({
    name: "profile",
    initialState: intialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload;
        },
        setAge(state, action) {
            state.age = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
    },
});

export const { setName, setAge, setEmail } = profileSlice.actions;