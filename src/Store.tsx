import { configureStore } from "@reduxjs/toolkit";
import { reduxSliceReducer } from './ReduxSlice';

export const store = configureStore({
    reducer:{redux:reduxSliceReducer}
});

export type RootStoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;