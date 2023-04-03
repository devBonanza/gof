import {Store} from 'redux';
import {configureStore} from './store';
import {IStore} from './IStore';

const store: Store<Partial<IStore>> = configureStore();

export {store};
