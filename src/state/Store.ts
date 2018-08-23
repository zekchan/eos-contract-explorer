import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers'

const anyWindow = window as any
const composeEnhancers =
    typeof window === 'object' &&
        anyWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        anyWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware),
);

const store = createStore(reducers, enhancer)
export default store
