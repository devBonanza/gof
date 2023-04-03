import React from "react";
import UIText from "./text";
import UINumberText from "./numbertext";
import UIContainer from "./container";
import UISprite from "./sprite";
import UISpriteSheet from "./spritesheet";
import { DC } from "./../../../dynamiccomponent"
import UIBitmapText from "./bitmaptext";
import UINumberBitMapText from "./numberbitmaptext";
import UISpine from "./spine";
import UIGraphic from "./graphic";
import { configGame } from "../../data/config";

interface IProps {
    type: string;
    id: string;
    [x: string]: any;
}

class UIManager extends React.Component<IProps> {
    static ref: any = {};
    COMPONENT: any = {};
    static getRef = (name: string) => {
        return UIManager.ref[name]
    }
    addRef = (name: string, ref: any) => {
        if (ref) {
            UIManager.ref[name] = ref;
        }
    }
    static setText = (name: string, value: any) => {
        let measuredWidth = 0;
        let propsData = UIManager.ref[name].propsdata
        UIManager.ref[name] && (UIManager.ref[name].text = value);
        if (propsData.scaleToFit === true && propsData.width > 0) {
            measuredWidth = UIManager.ref[name].getLocalBounds().width;
            if (measuredWidth > propsData.width) {
                while (measuredWidth > propsData.width) {
                    let newStyle = UIManager.ref[name].style;
                    newStyle.fontSize -= 1;
                    UIManager.ref[name].textStyle = newStyle;
                    UIManager.ref[name].fontSize = newStyle.fontSize;
                    measuredWidth = UIManager.ref[name].getLocalBounds().width;
                    if (newStyle.fontSize === UIManager.ref[name].minFontSize) {
                        break;
                    }
                }
            } else {
                UIManager.ref[name].width = measuredWidth;
            }
        }
    }
    static alignChildren = (name: string, value: any, gap: any = 10) => {
        if (UIManager.ref[name].children.length > 0) {
            if (value == "left") {
                let preContainerX = 0;
                let currentContainerWidth = 0;
                let Childrens = UIManager.ref[name].children;
                let lenChildren = Childrens.length;
                for (let i = lenChildren - 1; i >= 0; i--) {
                   currentContainerWidth = Childrens[i].getLocalBounds().width;
                    Childrens[i].x = preContainerX;
                    preContainerX = gap + preContainerX + currentContainerWidth;
                }
            }

            if (value == "right") {
                let preContainerX = 0;
                let currentContainerWidth = 0;
                let Childrens = UIManager.ref[name].children;
                let lenChildren = Childrens.length;
                for (let i = lenChildren - 1; i >= 0; i--) {
                    currentContainerWidth = Childrens[i].getLocalBounds().width;
                    Childrens[i].x = - preContainerX;
                    preContainerX = gap + preContainerX + currentContainerWidth;
                }
            }
        }
    }

    componentDidMount() {
        this.COMPONENT = UIManager.ref[this.props.id]
    }

    render() {
        const { type, id, ...rest } = this.props
        let Component;
        if (type === "Text") {
            Component = (<UIText addRef={this.addRef} key={id}
                {...rest} app={this.props.app}  configGame={this.props.configGame === undefined ?configGame :this.props.configGame } />);
        } else if (type === "Tag") {
            Component = React.createElement(DC[rest.name as string], { ...rest });
        } else if (type === "NumberText") {
            Component = (<UINumberText addRef={this.addRef} key={id}
                {...rest} app={this.props.app}  configGame={this.props.configGame === undefined ?configGame :this.props.configGame } />);
        } else if (type === "NumberBitMapText") {
            Component = (<UINumberBitMapText addRef={this.addRef} key={id}
                {...rest} app={this.props.app}  configGame={this.props.configGame === undefined ?configGame :this.props.configGame } />);
        } else if (type === "BitMapText") {
            Component = (<UIBitmapText addRef={this.addRef} key={id}
                {...rest} app={this.props.app}  configGame={this.props.configGame === undefined ?configGame :this.props.configGame } />);
        } else if (type === "Container") {
            Component = (<UIContainer addRef={this.addRef} key={id} app={this.props.app}  name={this.props.name === undefined ?'UIContainer' :this.props.name }
                configGame={this.props.configGame === undefined ?configGame :this.props.configGame }
                {...rest} />);
        } else if (type === "Sprite" || type === "Image") {
            Component = (<UISprite addRef={this.addRef} key={id} app={this.props.app} name={this.props.name === undefined ?'Sprite' :this.props.name }
            configGame={this.props.configGame === undefined ?configGame :this.props.configGame }
                {...rest} />);
        } else if (type === "SpriteSheet" || type === "Animation") {
            Component = (<UISpriteSheet addRef={this.addRef} key={id} app={this.props.app} name={this.props.name === undefined ?'Sprite' :this.props.name }
            configGame={this.props.configGame === undefined ?configGame :this.props.configGame }
                {...rest} />);
        } else if (type === "Spine") {
            Component = (<UISpine addRef={this.addRef} key={id} configGame={this.props.configGame === undefined ?configGame :this.props.configGame }
                {...rest} />);
        } else if (type === "Graphic") {
            Component = (<UIGraphic addRef={this.addRef} key={id} configGame={this.props.configGame === undefined ?configGame :this.props.configGame }
                {...rest} />);
        }
        return <>{Component}</>
    }
}

export default UIManager;