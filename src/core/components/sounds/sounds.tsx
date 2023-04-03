import React, { Component } from "react";
import { withPixiApp } from "@inlet/react-pixi";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { actions as soundActions } from "../../reducers/soundReducer";
import withSoundConfiguration from "../sounds/configuration/withSoundConfiguration";
import { Howl, Howler } from "howler"
import PIXI from "pixi.js";

interface IProps {
    [x: string]: any;
}

interface IStateToProps {

}

interface IDispatchToProps {

}

interface IState {

}

class Sounds extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected _currentvol: number = 1;
    protected playingSound: any = [];
    private minFullHDWidth: number = 1024;
    private HDReadyWidth: number = 1280;
    private fullHDWidth: number = 1920;
    private minFullHDPxRatio: number = 2;
    constructor(props: IProps) {
        super(props);
        this.app = props.app;
    }


    private createNewSound(id: string, src: string, loop: boolean = false, vol: number = 1): any {
        return {
            howl: new Howl({
                src: src,
                autoplay: false,
                loop: loop,
                volume: vol * this._currentvol,
                onend: () => {

                    this.props.endSound();
                }
            }),
            debounce: {},
            vol: vol
        }
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        this.setVolume(nextProps.currentvol)
        if (nextProps.gamePause != this.props.gamePause) {
            if (!nextProps.gamePause) {
                this.setVolume(this.props.currentvol)
            } else {
                this.setVolume(0)
            }
        }
        if (nextProps.soundLoadStart && nextProps.soundLoadStart != this.props.soundLoadStart) {
            this.soundLoadStart();
        }
        if (nextProps.soundLoadStart) {
            if (nextProps.changeVolumesoundobjList != this.props.changeVolumesoundobjList) {
                this.changeVolume(nextProps.changeVolumesoundobjList)
            }
            if (nextProps.stopsoundobjList != this.props.stopsoundobjList) {
                this.stopSound(nextProps.stopsoundobjList)
            }
            if (nextProps.fadesoundobjList != this.props.fadesoundobjList) {
                this.fadeOut(nextProps.fadesoundobjList)
            }
            if (nextProps.allSoundSFXStop && nextProps.allSoundSFXStop != this.props.allSoundSFXStop) {
                this.stopAllSFXSound();
            }
            if (nextProps.allSoundBGMStop && nextProps.allSoundBGMStop != this.props.allSoundBGMStop) {
                this.stopAllBGMSound();
            }
            if (nextProps.playsoundobjList != this.props.playsoundobjList) {
                this.playSound(nextProps.playsoundobjList);
            }
        }
        return true;
    }


    playBGSound() {

    }

    playSound(nameList: any) {
        nameList.map((da: any, n: number) => {
            if (this.props.data.sfx && this.props.data.bg) {
                if (this.props.data.sfx[da.name] == undefined && this.props.data.bg[da.name] == undefined) return;
                if (da.loop === undefined) {
                    da.loop = false;
                }
                let soundInstance = this.props.sound.filter((element: any, index: any, array: any) => {
                    return (element.name == da.name)
                })[0];
                if (da.vol) {
                    soundInstance.sound.vol = da.vol;
                }

                if ((soundInstance.type == "bg") && soundInstance.sound.howl.playing()) {
                    soundInstance.sound.howl.volume(soundInstance.sound.vol);
                } else {
                    if (this.props.allSoundBGMStop && soundInstance.type == "bg") {

                    } else if (this.props.allSoundSFXStop && soundInstance.type == "sfx") {
                        soundInstance.sound.howl.volume(soundInstance.sound.vol);
                        soundInstance.sound.howl.loop(da.loop);
                        soundInstance.sound.howl.play();
                    } else {
                        soundInstance.sound.howl.volume(soundInstance.sound.vol);
                        soundInstance.sound.howl.loop(da.loop);
                        soundInstance.sound.howl.play();
                    }
                }
            }
        });
    }

    stopSound(nameList: any) {
        nameList.map((da: any, n: number) => {
            let soundInstance = this.props.sound.filter((element: any, index: any, array: any) => {
                return (element.name == da.name)
            })[0];
            soundInstance && soundInstance.sound.howl.stop();
        })
    }

    fadeOut(nameList: any): void {
        nameList.map((da: any, n: number) => {
            let soundInstance = this.props.sound.filter((element: any, index: any, array: any) => {
                return (element.name == da.name)
            })[0];
            soundInstance && soundInstance.sound.howl.once("fade", () => {
                soundInstance && soundInstance.sound.howl.stop()
            });
            soundInstance && soundInstance.sound.howl.fade((soundInstance.sound.vol * this._currentvol), 0, 500);
        });
    }

    stopAllSFXSound() {
        let soundInstance = this.props.sound.filter((element: any, index: any, array: any) => {
            if (element.type == "sfx") {
                element.sound.howl.stop();
            }
        });
    }

    stopAllBGMSound() {
        let soundInstance = this.props.sound.filter((element: any, index: any, array: any) => {
            if (element.type == "bg") {
                element.sound.howl.stop();
            }
        });

    }

    changeVolume(nameList: any): void {
        nameList.map((da: any, n: number) => {
            if (this.props.data.sfx && this.props.data.bg) {
                if (this.props.data.sfx[da.name] == undefined && this.props.data.bg[da.name] == undefined) return;
                if (da.loop === undefined) {
                    da.loop = false;
                }
                let soundInstance = this.props.sound.filter((element: any, index: any, array: any) => {
                    return (element.name == da.name)
                })[0];
                if (da.vol >= 0) {
                    soundInstance.sound.howl.volume(da.vol);
                }
            }
        })
    }
    setVolume(vol: number): void {
        this._currentvol = vol;
        Howler.volume(vol);
    }
    componentDidMount() { }

    soundLoadStart() {
        let screen = window.screen

        let isFullHD = false;
        // FullHD atlas will be loaded on devices whose base resolution is greater than 1024px width and its pixel ratio (density) is greater than 1 (https://mydevice.io/devices/)
        // In the case of computer screens which normally have a pixel ratio of 1, it will be checked if the base resolution is HDReady or FullHD to load the fullHD atlas
        if (((screen.width >= this.minFullHDWidth || screen.height >= this.minFullHDWidth) && window.devicePixelRatio >= this.minFullHDPxRatio) ||
            (screen.width >= this.HDReadyWidth || screen.height >= this.HDReadyWidth)) {
            isFullHD = true;
        }

        let path = "";
        if (isFullHD) {
            path = "HD/"
        } else {
            path = "LD/"
        }

        for (let n in this.props.data.sfx) {
            this.playingSound.push({
                name: n,
                type: "sfx",
                sound: this.createNewSound(this.props.data.sfx[n].id, path + this.props.data.sfx[n].src, this.props.data.sfx[n].loop, this.props.data.sfx[n].vol)
            });

        }
        for (let n in this.props.data.bg) {
            this.playingSound.push({
                name: n,
                type: "bg",
                sound: this.createNewSound(this.props.data.bg[n].id, path + this.props.data.bg[n].src, this.props.data.bg[n].loop, this.props.data.bg[n].vol)
            })

        }
        this.props.addSound(this.playingSound);

    }

    render() {
        return (<></>)
    }
}

export default withPixiApp(connect(
    (state: Pick<IStore, 'applicationState' | 'basegameState' | 'reelsState' | 'asyncInitAction' | 'soundState'>): IStateToProps =>
    ({
        soundLoadStart: state.soundState.soundLoadStart,
        playsoundobjList: state.soundState.playsoundobjList,
        stopsoundobjList: state.soundState.stopsoundobjList,
        fadesoundobjList: state.soundState.fadesoundobjList,
        changeVolumesoundobjList: state.soundState.changeVolumesoundobjList,
        currentvol: state.soundState.currentvol,
        allSoundSFXStop: state.soundState.allSoundSFXStop,
        allSoundBGMStop: state.soundState.allSoundBGMStop,
        sound: state.soundState.sound,
        gamePause: state.applicationState.gamePause,
    }),
    (dispatch: Dispatch): IDispatchToProps => ({
        addSound: (symbol: any): any => dispatch(soundActions.addSound(symbol)),
        endSound: (): any => dispatch(soundActions.endSound())
    }))(withSoundConfiguration(Sounds)));