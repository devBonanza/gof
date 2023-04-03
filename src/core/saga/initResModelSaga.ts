import {takeLatest, put, call} from 'redux-saga/effects';
import {actionTypes as applicationActions} from '../reducers/asyncInitAction';
import {actionTypes as reelsActions} from '../reducers/reelsStateReducer';
import {actionTypes as gridsActions} from '../reducers/gridStateReducer';
import {actionTypes as basegameActions} from '../reducers/baseGameReducer';
import {actionTypes as freegameActions} from '../reducers/freeGameReducer';
import {initResponseService} from './../service/initResponseService'


export function* initSaga(): Generator<any, any, any> {
    yield takeLatest(applicationActions.GET_APPLICATION_INIT_RESPONSE, fireInitResponse);
}

function* fireInitResponse(): Generator<any, any, any> {
    try {
        const result = yield call(initResponseService.sendInitResponse);
        yield put({
            type: applicationActions.GET_APPLICATION_INIT_SUCCESS,
            result
        });
        const result_reel = {
            "reelStrip": result.reelStrip,
            "stopReels": result.stopReels,
            "feature": result.feature
        }
        yield put({
            type: reelsActions.GET_REELS_INIT_SUCCESS,
            result_reel
        });
        yield put({
            type: gridsActions.GET_REELS_INIT_SUCCESS,
            result_reel
        });
        const result_basegame = {
            "betList": result.betValues,
            "currentBetIndex": result.currentBetIndex
        }
        yield put({
            type: basegameActions.GET_APPLICATION_INIT_SUCCESS,
            result_basegame
        });
        yield put({
            type: freegameActions.GET_APPLICATION_INIT_SUCCESS,
            result_basegame
        });
    } catch (error) {
        console.log("Error",error);
        yield put({
            type: applicationActions.GET_APPLICATION_INIT_FAILURE,
            error
        });
    }
}

