import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        currentUser: null,
        userToken: null,
        error: null,
    },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            state.userToken = action.payload.access_token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.userToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default userSlice.reducer;