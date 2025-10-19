import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSetupSlice.ts";
import gamesReducer from "./slices/gamesSlice.ts";
import coversReducer from "./slices/coversSlice.ts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "games", "covers"]
};

const rootReducer = combineReducers({
  user: userReducer,
  games: gamesReducer,
  covers: coversReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

