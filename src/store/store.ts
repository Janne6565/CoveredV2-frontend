import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "localforage";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

import userReducer from "./slices/userSetupSlice.ts";
import gamesReducer from "./slices/gamesSlice.ts";
import coversReducer from "./slices/coversSlice.ts";

const userPersistConfig = {
  key: "user",
  storage,
};

const gamesPersistConfig = {
  key: "games",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  games: persistReducer(gamesPersistConfig, gamesReducer),
  covers: coversReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
