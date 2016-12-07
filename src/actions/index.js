import { createAction } from "redux-actions";

export const addFragment = createAction("ADD_FRAGMENT");
export const updateFragment = createAction("UPDATE_FRAGMENT");

export const updateRoute = createAction("UPDATE_ROUTE");
export const remoteState = createAction("REMOTE_STATE");

export const setGlobalStyle = createAction("SET_GLOBAL_STYLE");
