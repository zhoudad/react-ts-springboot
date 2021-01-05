import { createStore, applyMiddleware, compose } from 'redux';
import { allReducer } from './index';
import thunk from 'redux-thunk'; // 异步action
import { createLogger } from 'redux-logger';
const logger = createLogger();
//生成store对象
const store = compose(applyMiddleware(thunk, logger))(createStore)(allReducer);
export default store;
