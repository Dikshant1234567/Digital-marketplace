"use client";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store/store";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={makeStore()}>{children}</Provider>;
}

export default ReduxProvider;