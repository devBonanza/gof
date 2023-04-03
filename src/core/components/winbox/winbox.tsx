import React, { Component } from "react";
import { Container, Graphics, withPixiApp } from "@inlet/react-pixi";
import withWinboxConfiguration from "./configuration/withWinboxConfiguration";
import { actions as winpresentationAction } from "../../../core/reducers/winPresentationReducer";
import * as PIXI from "pixi.js";
import UIManager from "./../ui/UiBuilder";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import { Dispatch } from "redux";
import { isMobile } from "react-device-detect";

interface IProps {
    [x: string]: any;
}

interface IState {

}

interface IDispatchToProps {
}

interface IStateToProps {

}

class Winbox extends Component<IProps, IState> {
    protected app: PIXI.Application;
    protected LINE_COORDINATES_LIST: any;
    protected winboxContainer: any;
    protected createdNoWinshape: any;
    protected highlightedWinbox: any;
    protected WINBOX_DRAW_COORDINATES_LIST: any;
    protected ui_mode: string;
    protected displayUI: any;


    constructor(props: IProps) {
        super(props);
        this.app = props.app;

        // this.winboxContainer = React.createRef();
        this.winboxContainer = {};
        this.createdNoWinshape = [];
        this.highlightedWinbox = [];
        if (isMobile) {
            this.ui_mode = "mobile"
        } else {
            this.ui_mode = "desktop"
        }
        this.init()
        this.displayUI = this.props.data.WINBOX_ANIMATION.filter(this.checkUiMode.bind(this));
    }
    checkUiMode(uimodeobj: any) {

        if (uimodeobj.uimode === undefined) {
            uimodeobj.uimode = "both"
        }
        if (uimodeobj.uimode === "both" || uimodeobj.uimode === this.ui_mode) {
            return uimodeobj;
        }
    }
    init() {
        if (this.props.data.WINBOX_TYPE === "CUSTOM") {
            this.WINBOX_DRAW_COORDINATES_LIST = [
                [
                    { x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 0, y: this.props.SYMBOL_SIZE / 2 },
                    { x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 1, y: this.props.SYMBOL_SIZE / 2 },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 2 + this.props.REEL_WIDTH / 2,
                        y: this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 3 + this.props.REEL_WIDTH / 2,
                        y: this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 4 + this.props.REEL_WIDTH / 2,
                        y: this.props.SYMBOL_SIZE / 2
                    },
                    { x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 5, y: this.props.SYMBOL_SIZE / 2 }
                ],
                [
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 0,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 1 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 1,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 1 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 2 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 1 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 3 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 1 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 4 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 1 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 5,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 1 + this.props.SYMBOL_SIZE / 2
                    }
                ],
                [
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 0,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 2 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 1,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 2 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 2 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 2 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 3 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 2 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 4 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 2 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 5,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 2 + this.props.SYMBOL_SIZE / 2
                    }
                ],
                [
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 0,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 1,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 2 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 3 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 4 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 5,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    }
                ],
                [
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 0,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 4 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 1,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 4 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 2 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 4 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 3 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 4 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 4 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 4 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 5,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 4 + this.props.SYMBOL_SIZE / 2
                    }
                ],

                [
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 0,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 1 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 1 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 1 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 2 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 2 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 3 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 4 + this.props.REEL_WIDTH / 2,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    },
                    {
                        x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * 5,
                        y: (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * 3 + this.props.SYMBOL_SIZE / 2
                    }]
            ]
            // let rowCoordinateList=[]
            // for(let i=0;i<this.REEL_COLUMN;++i){
            //     rowCoordinateList.push({x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * i, y: this.props.SYMBOL_SIZE / 2})
            // }

        }
        if (this.props.data.WINBOX_TYPE === "ANIMATION") {
            this.WINBOX_DRAW_COORDINATES_LIST = [
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: this.props.data.SYMBOL_WIDTH / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 1 + this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 2 + this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 3 + this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],
                [
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 0,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 1,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 2 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 3 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 4 + this.props.data.REEL_WIDTH / 2,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    },
                    {
                        x: (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * 5,
                        y: (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * 4 + this.props.data.SYMBOL_HEIGHT / 2
                    }
                ],


            ]
            // let rowCoordinateList=[]
            // for(let i=0;i<this.REEL_COLUMN;++i){
            //     rowCoordinateList.push({x: (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP) * i, y: this.props.SYMBOL_SIZE / 2})
            // }

        }

    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

        if (nextProps.winSymbolCoOrdinate !== this.props.winSymbolCoOrdinate) {
            this.createdNoWinshape = [];
            this.highlightedWinbox = [];
            //return false;
        }
        if (nextProps.staticwinSymbolCoOrdinate !== this.props.staticwinSymbolCoOrdinate) {
            this.createdNoWinshape = [];
            this.highlightedWinbox = [];
            this.props.setWinSymbolCoOrdinate([]);
            //return false;
        }
        if (nextProps.layoutMode !== this.props.layoutMode) {
            this.layoutChange(nextProps.layoutMode)
        }
        return true
    }

    onShowWinline(id: number) {
        this.winboxContainer.children[id].visible = true;
    }

    onCompleteCallBack(e: any, scope: any) {
    }

    onDrawWinbox() {
        let winbox: any = [];

        if (this.props.data.WINBOX_TYPE === "ANIMATION" && this.props.displayWinBox) {

            this.props.data.WINBOX_ANIMATION.map((data: any, m: number) => {
                for (let k = 0; k < this.props.winSymbolCoOrdinate.length; k++) {
                    this.highlightedWinbox.push("winboxContainer" + this.props.winSymbolCoOrdinate[k].rowId + "_" + this.props.winSymbolCoOrdinate[k].reelId);

                }
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 5; j++) {

                        // this.createdNoWinshape.push("winboxContainer" + i+"_"+j);
                        if (this.highlightedWinbox.indexOf("winboxContainer" + i + "_" + j) == -1) {
                            winbox.push(<Container key={`winboxContainer-${Math.random()}`} name={"winboxContainer" + i}
                                visible={true}

                                filters={[new PIXI.filters.AlphaFilter()]}

                                x={(this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * j}
                                y={(this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * i}

                            >

                                <Graphics key={`symbolgrey-${Math.random()}`} visible={true} draw={
                                    gr => {

                                        gr.beginFill(0x000000, this.props.data.ALPHA_OF_NON_HIGHLIGHTED_SYMBOL)
                                            .drawRect(-6, 0, this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP, this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP)

                                    }
                                }></Graphics>
                                {/*{(*/}
                                {/*    this.props.data.onWinMask.map((da: any, n: number) => da === true &&*/}
                                {/*        <Graphics key={`mask-${Math.random()}`} blendMode={PIXI.BLEND_MODES.ERASE} draw={*/}
                                {/*            gr => {*/}

                                {/*                gr.beginFill(0xDE3249)*/}
                                {/*                    .drawRect(n * (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP), (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * this.props.data.LINE_COORDINATES_LIST[m][n], this.props.data.REEL_WIDTH, this.props.data.SYMBOL_HEIGHT)*/}

                                {/*            }*/}
                                {/*        }></Graphics>)*/}
                                {/*)}*/}
                            </Container>)
                        } else {
                            winbox.push(<Container key={`winboxContainer-${Math.random()}`} name={"winboxContainer" + i}
                                visible={true}

                                x={(this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * j}
                                y={(this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * i}
                                filters={[new PIXI.filters.AlphaFilter()]}
                            >


                                <UIManager name={"winbox" + i} key={`UIManager-${Math.random()}`} type={data.type}
                                    playanimname={""}

                                    id={data.id} {...data} onComplete={this.onCompleteCallBack} scope={this}
                                    app={this.app}>
                                </UIManager>
                                {/*{(*/}
                                {/*    this.props.data.onWinMask.map((da: any, n: number) => da === true &&*/}
                                {/*        <Graphics key={`mask-${Math.random()}`} blendMode={PIXI.BLEND_MODES.ERASE}  draw={*/}
                                {/*            gr => {*/}

                                {/*                gr.beginFill(0xDE3249)*/}
                                {/*                    //.drawRect(n * (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP), (this.props.data.SYMBOL_SIZE + this.props.data.REEL_HEIGHT_GAP) * this.props.data.LINE_COORDINATES_LIST[i][n], this.props.data.REEL_WIDTH, this.props.data.SYMBOL_SIZE)*/}
                                {/*                    .drawRect(n * (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) , (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * this.props.data.LINE_COORDINATES_LIST[17][n] + this.props.data.SYMBOL_HEIGHT/2, this.props.data.SYMBOL_WIDTH-100, this.props.data.SYMBOL_HEIGHT-100)*/}

                                {/*            }*/}
                                {/*        }></Graphics>)*/}
                                {/*)}*/}
                            </Container>)
                        }


                    }
                }

            })
        }
        if (this.props.data.WINBOX_TYPE === "ANIMATION" && this.props.displayWinBox) {

            this.props.data.WINBOX_ANIMATION.map((data: any, m: number) => {
                for (let k = 0; k < this.props.staticwinSymbolCoOrdinate.length; k++) {
                    this.highlightedWinbox.push("winboxContainer" + this.props.staticwinSymbolCoOrdinate[k].rowId + "_" + this.props.staticwinSymbolCoOrdinate[k].reelId);

                }
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 5; j++) {

                        // this.createdNoWinshape.push("winboxContainer" + i+"_"+j);
                        if (this.highlightedWinbox.indexOf("winboxContainer" + i + "_" + j) == -1) {
                            winbox.push(<Container key={`winboxContainer-${Math.random()}`} name={"winboxContainer" + i}
                                visible={true}

                                filters={[new PIXI.filters.AlphaFilter()]}

                                x={(this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * j}
                                y={(this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * i}

                            >

                                <Graphics key={`symbolgrey-${Math.random()}`} visible={true} draw={
                                    gr => {

                                        gr.beginFill(0x000000, this.props.data.ALPHA_OF_NON_HIGHLIGHTED_SYMBOL)
                                            .drawRect(-6, 0, this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP, this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP)

                                    }
                                }></Graphics>
                                {/*{(*/}
                                {/*    this.props.data.onWinMask.map((da: any, n: number) => da === true &&*/}
                                {/*        <Graphics key={`mask-${Math.random()}`} blendMode={PIXI.BLEND_MODES.ERASE} draw={*/}
                                {/*            gr => {*/}

                                {/*                gr.beginFill(0xDE3249)*/}
                                {/*                    .drawRect(n * (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP), (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * this.props.data.LINE_COORDINATES_LIST[m][n], this.props.data.REEL_WIDTH, this.props.data.SYMBOL_HEIGHT)*/}

                                {/*            }*/}
                                {/*        }></Graphics>)*/}
                                {/*)}*/}
                            </Container>)
                        } else {
                            winbox.push(<Container key={`winboxContainer-${Math.random()}`} name={"winboxContainer" + i}
                                visible={true}

                                x={(this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) * j}
                                y={(this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * i}
                                filters={[new PIXI.filters.AlphaFilter()]}
                            >


                                <UIManager name={"winbox" + i} key={`UIManager-${Math.random()}`} type={data.type}
                                    playanimname={""}

                                    id={data.id} {...data} onComplete={this.onCompleteCallBack} scope={this}
                                    app={this.app}>
                                </UIManager>
                                {/*{(*/}
                                {/*    this.props.data.onWinMask.map((da: any, n: number) => da === true &&*/}
                                {/*        <Graphics key={`mask-${Math.random()}`} blendMode={PIXI.BLEND_MODES.ERASE}  draw={*/}
                                {/*            gr => {*/}

                                {/*                gr.beginFill(0xDE3249)*/}
                                {/*                    //.drawRect(n * (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP), (this.props.data.SYMBOL_SIZE + this.props.data.REEL_HEIGHT_GAP) * this.props.data.LINE_COORDINATES_LIST[i][n], this.props.data.REEL_WIDTH, this.props.data.SYMBOL_SIZE)*/}
                                {/*                    .drawRect(n * (this.props.data.REEL_WIDTH + this.props.data.REEL_WIDTH_GAP) , (this.props.data.SYMBOL_HEIGHT + this.props.data.REEL_HEIGHT_GAP) * this.props.data.LINE_COORDINATES_LIST[17][n] + this.props.data.SYMBOL_HEIGHT/2, this.props.data.SYMBOL_WIDTH-100, this.props.data.SYMBOL_HEIGHT-100)*/}

                                {/*            }*/}
                                {/*        }></Graphics>)*/}
                                {/*)}*/}
                            </Container>)
                        }


                    }
                }

            })
        }

        let reelContainerX = this.props.data.REEL_CONTAINER_X, reelContainerY = this.props.data.REEL_CONTAINER_Y,
            scalingOfReelContainer = this.props.data.REEL_CONTAINER_SCALE

        if (isMobile) {
            if (window.innerHeight > window.innerWidth) {
                reelContainerX = this.props.data.REEL_CONTAINER_X_IN_PORTRAIT
                reelContainerY = this.props.data.REEL_CONTAINER_Y_IN_PORTRAIT
                scalingOfReelContainer = this.props.data.REEL_CONTAINER_SCALE_IN_PORTRAIT
            }
        }
        return (<Container ref={i => this.winboxContainer = i} x={reelContainerX} y={reelContainerY}  name ={'Container'}
            scale={scalingOfReelContainer}>
            {winbox}

        </Container>)
    }


    gradient(from: any, to: any): any | null {
        const c = document.createElement("canvas") as HTMLCanvasElement;
        const ctx = c.getContext("2d");
        if (ctx) {
            const grd = ctx.createLinearGradient(0, 0, 500, 50);
            grd.addColorStop(0, from);
            grd.addColorStop(1, to);
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, 1000, 1000);
            return PIXI.Texture.from(c);
        }
        return null
    }

    onCreateCustomLine() {
        return (<></>)
    }

    onWinningSymbolPaylineMaskON() {
        return (<></>)
    }

    componentDidMount() {
        this.layoutChange(this.props.layoutMode);
    }

    layoutChange(currentLayout: string) {
        this.displayUI.map((data: any, j: number) => {
            if (data.layout === true) {
                this.props.setApplicationLayoutObject(data.name)
            }
        }
        )
    }
    onCreatePaylineMask(lineContainer: any, lineIndex: number) {
        if (this.props.lineMaskType === "symbolBox") {

            for (let i = 0; i < lineContainer.onWinMask.length; i++) {
                if (lineContainer.onWinMask[i] === true) {
                    const thing = new PIXI.Graphics();
                    thing.beginFill(0xDE3249);
                    thing.drawRect(i * (this.props.REEL_WIDTH + this.props.REEL_WIDTH_GAP), (this.props.SYMBOL_SIZE + this.props.REEL_HEIGHT_GAP) * this.props.LINE_COORDINATES_LIST[lineIndex][i], this.props.REEL_WIDTH, this.props.SYMBOL_SIZE);
                    //thing.drawRect(0, 0, this.props.REEL_WIDTH, this.props.SYMBOL_SIZE);
                    thing.endFill();
                    let blurFilter1 = new PIXI.filters.AlphaFilter();
                    lineContainer.filters = [blurFilter1];
                    thing.blendMode = 20;

                    lineContainer.addChild(thing);
                }
            }
        }
        if (this.props.lineMaskType === "symbol") {



        }
    }


    render() {

        return (<>{this.onDrawWinbox.call(this)}</>)

    }
}

// export default withPixiApp(withWinboxConfiguration(Winbox));
export default withPixiApp(connect(
    (state: Pick<IStore, 'winpresentationState' | 'reelsState' | 'basegameState' | 'reelgridState' | 'gridsState' | 'applicationState'>, ownProps?: any): IStateToProps =>
    ({
        allSpinComplete: ownProps && ownProps.configGame["SPIN_TYPE"] === 0 && state.reelsState.allSpinComplete || ownProps && ownProps.configGame["SPIN_TYPE"] === 2 && state.reelgridState.allSpinComplete || ownProps && ownProps.configGame["SPIN_TYPE"] === 1 && state.gridsState.allSpinComplete,


        winSymbolCoOrdinate: state.winpresentationState.winSymbolCoOrdinate,
        staticwinSymbolCoOrdinate: state.winpresentationState.staticwinSymbolCoOrdinate,

        displayWinBox: state.winpresentationState.displayWinBox,
        featureType: state.basegameState.featureType,
        featureJustTriggered: state.basegameState.featureJustTriggered,
        layoutMode: state.applicationState.layoutMode,

    }),
    (dispatch: Dispatch, ownProps): IDispatchToProps => ({
        setWinSymbolCoOrdinate: (winSymbolCoOrdinate: any): any => dispatch(winpresentationAction.setWinSymbolCoOrdinate(winSymbolCoOrdinate)),
    }))(withWinboxConfiguration(Winbox)));