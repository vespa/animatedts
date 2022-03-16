import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);
