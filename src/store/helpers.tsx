import { Action as ReduxAction } from "redux";

export interface Action<T extends string, P> extends ReduxAction<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): Action<T, void>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): Action<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return typeof payload === "undefined" ? { type } : { type, payload };
}
