import { useSyncExternalStore } from "react";

type DisposeFn = () => void;
type CallbackFn<T> = (val: T) => void;
type SubscribeFn<T> = (val: CallbackFn<T>) => DisposeFn;
type GetFn<T> = () => T;
type SetFn<T> = (newVal: T | ((prev: T) => T)) => void;
type CreateFn<T> = (set: SetFn<T>, get: GetFn<T>) => T;
type SelectorFn<T, R> = (store: T) => R;

export default function createStore<T extends object>(props: T | CreateFn<T>) {
  const listeners = new Set<CallbackFn<T>>();
  let initial = typeof props !== "function" ? props : props(set, get);

  const subscribe: SubscribeFn<T> = (cb) => {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  };
  function get(): T {
    return initial;
  }

  function set(newVal: T | ((prev: T) => T)) {
    initial =
      typeof newVal === "function"
        ? newVal(initial)
        : Object.assign(initial, newVal);
    listeners.forEach((cb) => cb(initial));
  }

  function useStoreHook(): T;
  function useStoreHook<Data>(selector?: SelectorFn<T, Data>): Data;
  function useStoreHook<Data>(selector?: SelectorFn<T, Data>) {
    return useSyncExternalStore(subscribe, () =>
      selector ? selector(get()) : get()
    );
  }

  useStoreHook.setState = set;
  useStoreHook.getState = get;
  useStoreHook.subscribe = subscribe;
  return useStoreHook;
}
