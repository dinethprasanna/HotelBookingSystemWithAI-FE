import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import userReducer from "./features/userSlice";

import { api } from "./api";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
    reducer: {
        //user: userReducer,
        [api.reducerPath]: api.reducer,
        search: searchReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware),
});



setupListeners(store.dispatch);