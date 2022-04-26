import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { user } from "./reducers/user";
import { design } from "./reducers/design";
import { product } from "./reducers/product";
import { catandsubcat } from "./reducers/catandsubcat";
const reducer = combineReducers({
  user,
  design,
  product,
  catandsubcat,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
