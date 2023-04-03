import { takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes as applicationActions } from '../reducers/asyncServerResponseReducer';
import { actionTypes as basegameActions } from '../reducers/baseGameReducer';
import { actionTypes as freegameActions } from '../reducers/freeGameReducer';
import { actionTypes as winPresentationActions } from '../reducers/winPresentationReducer';
import { actionTypes as reelsActions } from '../reducers/reelsStateReducer';
import { actionTypes as gridsActions } from '../reducers/gridStateReducer';
import { spinResponseService } from './../service/spinResponseService'
import { freespinResponseService } from './../service/freespinResponseService'

export function* spinSaga(): Generator<any, any, any> {
    yield takeLatest(applicationActions.GET_APPLICATION_SPIN_RESPONSE, fireSpinResponse);
}

function* fireSpinResponse(): Generator<any, any, any> {
    try {
        const result_spin = yield call(spinResponseService.sendSpinResponse);
        yield put({
            type: applicationActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
        yield put({
            type: freegameActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
        yield put({
            type: basegameActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
        yield put({
            type: winPresentationActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
        yield put({
            type: reelsActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
        yield put({
            type: gridsActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });


    } catch (error) {
        console.log("Error",error);
        yield put({
            type: applicationActions.GET_APPLICATION_SPIN_FAILURE,
            error
        });
    }
}

export function* freespinSaga(): Generator<any, any, any> {
    yield takeLatest(applicationActions.GET_APPLICATION_FREE_SPIN_RESPONSE, fireFreeSpinResponse);
}

function* fireFreeSpinResponse(): Generator<any, any, any> {
    try {
        const result_spin = yield call(freespinResponseService.sendFreeSpinResponse);
        yield put({
            type: applicationActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
        yield put({
            type: reelsActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });

        yield put({
            type: freegameActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
        yield put({
            type: winPresentationActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
    } catch (error) {
        console.log("Error",error);
        yield put({
            type: applicationActions.GET_APPLICATION_SPIN_FAILURE,
            error
        });
    }
}

