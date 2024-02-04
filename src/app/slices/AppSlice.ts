// src/app/slices/AppSlice.ts

import { createSlice } from "@reduxjs/toolkit";
// 自作の型ファイル
import { AppTypeInitialState } from "../../utils/Types";

// type が AppTypeInitialState(typeScript)
const initialState: AppTypeInitialState = {
  toasts: [],
};

// sliceを作成
export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToast: (state, action) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

// actions(reducer) を export
// Typically, if you had defined reducers, Redux Toolkit would automatically generate corresponding actions, which you could then destructure and export for use elsewhere in your application.
export const { setToast, clearToasts } = AppSlice.actions;