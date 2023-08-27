import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import mainReducer from "./main/store";

const makeStore = () =>
  configureStore({
    reducer: {
      main: mainReducer,
    },
  });

export type RootState = {
  main: ReturnType<typeof mainReducer>;
};
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
