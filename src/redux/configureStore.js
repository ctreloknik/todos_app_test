import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import calculatorReducer from "./sm";

const configureStore = () => {
    const store = createStore(calculatorReducer, applyMiddleware(thunk));
    return { store };
};

export default configureStore;
