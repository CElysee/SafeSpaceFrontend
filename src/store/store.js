import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth", // key under which data is stored
  storage,
//   whitelist: ["counter"], // list of reducers to persist
};


const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

const persistor = persistStore(store);
export { store, persistor };

// export default configureStore({
//   reducer: {
//     auth: persistedReducer,
//   },
// });
