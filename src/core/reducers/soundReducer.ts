export interface IApplicationState {

    sound: any;
    isMute: boolean;
    allSoundSFXStop: boolean;
    allSoundBGMStop: boolean;
    currentbgm: string;
    currentvol: number;
    playsoundobjList: Array<string>;
    stopsoundobjList: Array<string>;
    fadesoundobjList: Array<string>;
    changeVolumesoundobjList: Array<string>;
    watchsfx: string;
    soundcount: number;
    soundIsPlaying: boolean;
    soundLoadStart: boolean;
}

const initialState: IApplicationState = {
    sound: {},
    isMute: false,
    allSoundSFXStop: false,
    allSoundBGMStop: false,
    currentbgm: "",
    currentvol: 1,
    watchsfx: "",
    changeVolumesoundobjList: [],
    playsoundobjList: [],
    stopsoundobjList: [],
    fadesoundobjList: [],
    soundcount: 0,
    soundIsPlaying: false,
    soundLoadStart: false
};

export enum actionTypes {
    GET_PLAYING_SOUND = '@@SoundController/GET_PLAYING_SOUND',
    SET_MUTE_SOUND = '@@SoundController/SET_MUTE_SOUND',
    SOUND_ADD = '@@SoundController/SOUND_ADD',
    PLAY_SOUND = '@@SoundController/PLAY_SOUND',
    PLAY_BGM = '@@SoundController/PLAY_BGM',
    STOP = '@@SoundController/STOP',
    FADE_OUT = '@@SoundController/FADE_OUT',
    CHANGE_VOLUME_SOUNDLIST = '@@SoundController/CHANGE_VOLUME_SOUNDLIST',
    STOP_ALL_SFX = '@@SoundController/STOP_ALL_SFX',
    STOP_ALL_BGM = '@@SoundController/STOP_ALL_BGM',
    EVENT_SOUND_END = '@@SoundController/EVENT_SOUND_END',
    RESUME_CONTEXT = '@@SoundController/RESUME_CONTEXT',
    SET_VOLUME = '@@SoundController/SET_VOLUME',
    SOUND_IS_PLAYING = '@@SoundController/SOUND_IS_PLAYING',
    SOUND_START_LOADING = '@@SoundController/SOUND_START_LOADING',
}

export function reducer(
    state: IApplicationState = initialState,
    action: any,
): IApplicationState {

    const { soundComponent,  volume, soundObject, isMute, stopBgSound, stopSfxSound, soundIsPlaying ,soundLoadStart} = action;
    switch (action.type) {
        case actionTypes.SOUND_ADD:
            return { ...state, sound: soundComponent };
        case actionTypes.PLAY_SOUND:
            return { ...state, playsoundobjList: soundObject };
        case actionTypes.PLAY_BGM:
            return {
                ...state,
            };
        case actionTypes.STOP:
            return {
                ...state, stopsoundobjList: soundObject
            };
        case actionTypes.SOUND_START_LOADING:
            return {
                ...state, soundLoadStart: soundLoadStart
            };
        case actionTypes.SOUND_IS_PLAYING:
            return {
                ...state, soundIsPlaying: soundIsPlaying
            };
        case actionTypes.CHANGE_VOLUME_SOUNDLIST:
            return {
                ...state, changeVolumesoundobjList: soundObject
            };
        case actionTypes.FADE_OUT:
            return {
                ...state, fadesoundobjList: soundObject
            };
        case actionTypes.STOP_ALL_SFX:
            return {
                ...state, allSoundSFXStop: stopSfxSound,
            };
        case actionTypes.STOP_ALL_BGM:
            return {
                ...state, allSoundBGMStop: stopBgSound,
            };
        case actionTypes.EVENT_SOUND_END:
            return {
                ...state
            };
        case actionTypes.SET_VOLUME:
            return {
                ...state, currentvol: volume
            };
        case actionTypes.SET_MUTE_SOUND:
            let vol: number = 0;
            if (isMute) {
                vol = 0;
            } else {
                vol = 1;
            }
            return {
                ...state, isMute: isMute, currentvol: vol
            };

        default:
            return state;
    }
}

export const actions = {
    addSound: (soundComponent: any): any => ({ type: actionTypes.SOUND_ADD, soundComponent }),
    playSound: (soundObject: Array<string>): any => ({ type: actionTypes.PLAY_SOUND, soundObject }),
    stopSound: (soundObject: Array<string>): any => ({ type: actionTypes.STOP, soundObject }),
    fadeOutSound: (soundObject: Array<string>): any => ({ type: actionTypes.FADE_OUT, soundObject }),
    changeVolume: (soundObject: Array<string>): any => ({ type: actionTypes.CHANGE_VOLUME_SOUNDLIST, soundObject }),
    setVolume: (volume: number): any => ({ type: actionTypes.SET_VOLUME, volume }),
    setMute: (isMute: boolean): any => ({ type: actionTypes.SET_MUTE_SOUND, isMute }),
    stopAllBGMSound: (stopBgSound: boolean): any => ({ type: actionTypes.STOP_ALL_BGM, stopBgSound }),
    stopAllSFXSound: (stopSfxSound: boolean): any => ({ type: actionTypes.STOP_ALL_SFX, stopSfxSound }),
    endSound: (): any => ({ type: actionTypes.EVENT_SOUND_END }),
    setVolumeSound: (volume: number): any => ({ type: actionTypes.SET_VOLUME, volume }),
    playingSound: (soundIsPlaying: boolean): any => ({ type: actionTypes.SOUND_IS_PLAYING, soundIsPlaying }),
    soundLoadStartFunction: (soundLoadStart: boolean): any => ({ type: actionTypes.SOUND_START_LOADING, soundLoadStart }),
};
