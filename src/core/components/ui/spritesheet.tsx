import { Text, AnimatedSprite } from '@inlet/react-pixi'
import React from "react";
import { Rectangle, Texture, Circle } from "pixi.js";
import { isArray } from "util";

interface IProps {
    [x: string]: any;
}

interface IState {
    currentState: string;
}

class UISpriteSheet extends React.Component<IProps, IState> {
    protected spriteSheetObj: any;
    constructor(props: IProps) {
        super(props);
        this.spriteSheetObj = {};
        this.state = { currentState: this.props.currentFrames };
    }


    componentDidMount() {
        this.createtext();
        this.addText();
        if (this.spriteSheetObj) {
            this.spriteSheetObj.effectType = this.props.effectType;
            this.spriteSheetObj.maskHeight = this.props.maskHeight;
            this.spriteSheetObj.onComplete = (e: any, obj: any) => {
                // finished!
                this.props.onComplete && this.props.onComplete(this.spriteSheetObj, this.props.scope || this);
            };
            this.spriteSheetObj.onFrameChange = (e: any, obj: any) => {
                // updated!
                //obj.remove()
                this.props.onFrameChange && this.props.onFrameChange(this.spriteSheetObj, this.props.scope || this);
            };
            this.spriteSheetObj.onLoop = (e: any, obj: any) => {
                // looped!
                //obj.remove()
                this.props.onLoop && this.props.onLoop(this.spriteSheetObj, this.props.scope || this);
            };
            this.spriteSheetObj.addListener('mouseup', (evt: MouseEvent): void => {
                this.spriteSheetObj.texture = Texture.from(this.props.buttonState['up'])
            })
            this.spriteSheetObj.addListener('mouseout', (evt: MouseEvent): void => {
                this.spriteSheetObj.texture = Texture.from(this.props.buttonState['out'])
            })
            this.spriteSheetObj.addListener('mouseover', (evt: MouseEvent): void => {
                this.spriteSheetObj.texture = Texture.from(this.props.buttonState['hover'])
            })
            this.spriteSheetObj.addListener('mousedown', (evt: MouseEvent): void => {
                this.spriteSheetObj.texture = Texture.from(this.props.buttonState['down'])
            })
            this.spriteSheetObj.addListener('click', (evt: MouseEvent): void => {
                this.props.ClickHandler(evt);
            })
            this.spriteSheetObj.addListener('touchend', (evt: MouseEvent): void => {
                this.props.ClickHandler(evt);
            })
        }
    }


    addText() {

    }

    createtext() {

    }

    componentWillUnmount() {

    }

    renderTexture = () => {
        let TextureList: any = [];
        if (this.props.app && this.props.animations) {
            let animname = "anim"
            if (this.props.playanimname != "" && this.props.playanimname != undefined) {
                animname = this.props.playanimname;
            }
            let playanimaname = this.props.animations[animname];
            if (isArray(playanimaname) && playanimaname.length > 0) {
                playanimaname.map((i: any) => {
                    if (this.props.app.loader.resources[i] && this.props.app.loader.resources[i].data) {
                        Object.keys(this.props.app.loader.resources[i].data.frames).map((frame) => {
                            TextureList.push(Texture.from(frame))
                        })
                    }
                })
            } else {
                if (playanimaname != "") {
                    Object.keys(this.props.app.loader.resources[playanimaname].data.frames).map(frame =>                // PIXI.Texture.from(frame)
                        TextureList.push(Texture.from(frame))
                    )
                }
            }
        }

        if (this.props.animationData && this.props.currentFrames && this.props.currentFrames.length === 0) {
            for (let i = 0; i < this.props.animationData["frame-count"]; i++) {
                let val = i < 10 ? `0${i}` : i;
                this.props.currentFrames.push(this.props.animationData["frame-pre-name"] + `${val}` + this.props.animationData["frame-post-name"])
            }
        }

        if (this.props.currentFrames) {
            for (let i = 0; i < this.props.currentFrames.length; i++) {
                TextureList.push(Texture.from(this.props.currentFrames[i]))
            }
        }
        return TextureList;
    }

    hitArea() {
        if (this.props.shape === undefined || Object.keys(this.props.shape).length === 0) {
            return {};
        }
        let shape: any = {}
        switch (this.props.shape.type) {
            case "rectangle":
                shape = new Rectangle(this.props.shape.x - this.props.shape.w / 2, this.props.shape.y - this.props.shape.h / 2, this.props.shape.w, this.props.shape.h);
                break;
            case "circle":
                shape = new Circle(this.props.shape.x, this.props.shape.y, this.props.shape.r);
                break
            default:
        }
        return shape;
    }

    render() {
        const hitArea = this.hitArea();
        const hitAreaExist = !(Object.keys(hitArea).length === 0);
        const textureObj = this.renderTexture();
        if (textureObj.length == 0) {
            this.spriteSheetObj = null;
            return (<></>)
        }
        //this.props.app.loader.resources[this.props.image].url;//
        let linkImage = this.props.image;
        let re: any = "";
        let replaceToBe = "";

        if (linkImage) {
            if (linkImage.indexOf("@mobile") > -1) {
                re = /\@mobile/gi;
                replaceToBe = "mobile";
            }
            if (linkImage.indexOf("@desktop") > -1) {
                re = /\@desktop/gi;
                replaceToBe = "desktop";
            }
            if (replaceToBe) {
                //this.app.loader.add(subkey, linkImage.replace(re, replaceToBe))
                linkImage = linkImage.replace(re, replaceToBe)
            }
        }
        return (<AnimatedSprite
            ref={i => {
                this.props.addRef(this.props.name, i);
                this.spriteSheetObj = i;
                return i;
            }}
            anchor={this.props.anchor || [0, 0]} x={this.props.x || 0} y={this.props.y || 0}
            width={this.props.width} height={this.props.height}
            image={linkImage} name={this.props.name}
            visible={this.props.visible || false} isPlaying={this.props.playing}
            loop={this.props.loop} scale={this.props.scale || 1}
            animationSpeed={this.props.animationSpeed} buttonMode={this.props.buttonMode || false}
            textures={textureObj} interactive={this.props.interactive || false}
            hitArea={hitAreaExist && hitArea}

        >

            {this.props.text != "" && this.props.text != undefined &&
                <Text text={this.props.langObj[this.props.text] || this.props.text} style={this.props.textStyle}
                    anchor={this.props.anchor} visible={this.props.visible || false}
                ></Text>}
        </AnimatedSprite>)
    }
}
export default UISpriteSheet;