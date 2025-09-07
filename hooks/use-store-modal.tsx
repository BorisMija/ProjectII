"use client";

import * as React from "react";

type StoreState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

let state: StoreState = {
  isOpen: false,
  onOpen: () => setState({ isOpen: true }),
  onClose: () => setState({ isOpen: false }),
};

const listeners = new Set<() => void>();

function setState(partial: Partial<StoreState>) {
  state = { ...state, ...partial };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getState() {
  return state;
}

export function useStoreModal<T>(selector: (s: StoreState) => T): T {
  const snapshot = React.useSyncExternalStore(subscribe, getState, getState);
  return selector(snapshot);
}


