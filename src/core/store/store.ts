import {applyMiddleware, createStore, Store} from 'redux';
import {sagaMiddleware} from './middleware';
import {IStore} from './IStore';
import rootReducer from '../reducers';
import rootSaga from '../saga';

export const configureStore = (initialState?: IStore): Store<Partial<IStore>> => {
    const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};

