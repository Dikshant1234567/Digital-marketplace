"use client";
import React from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

//   return <Provider store={storeRef.current}> {children}</Provider>;
}
