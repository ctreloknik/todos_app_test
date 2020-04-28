import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import todoAppReducer from "./sm";

const configureStore = () => {
    const store = createStore(todoAppReducer, applyMiddleware(thunk));
    return { store };
};

export default configureStore;
