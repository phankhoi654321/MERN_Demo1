import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";            //thunks are a functional programming technique used to delay computation. 
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

//https://github.com/zalmoxisus/redux-devtools-extension#usage  go to 1.2 Advanced store setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  //To apply multiple store enhancers, you may use compose(). in this case we use store enhancers for dev Tools
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
