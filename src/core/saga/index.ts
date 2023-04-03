import {all, AllEffect, fork} from 'redux-saga/effects';
import {initSaga} from "./initResModelSaga"
import {actionSaga} from "./../../gamesaga/gameResModelSaga"
import {spinSaga, freespinSaga} from "./spinResModelSaga"


export default function* rootSaga(): IterableIterator<AllEffect<any>> {
    yield all([
        fork(initSaga),
        fork(spinSaga),
        fork(freespinSaga),
        fork(actionSaga)
    ]);
}
