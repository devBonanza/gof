import {basegameAssetConfig} from "../../data/basegame/index"
import {buttonpanelAssetConfig} from "../../data/buttonpanel/index"
import {symbolAssetConfig} from "../../data/symbol"
import {paylineAssetConfig} from "../../data/payline"
import {introAssetConfig} from "../../data/intro"
import {soundAssetConfig} from "../../data/sounds"
import {loadingGameConfig} from "../../../data/loader"
import {autoplayAssetConfig} from "../../data/autoplay/index"


export enum loadingAssetConfig {
    loaderLandscapeBG = "assets/loader/landscapeloading_bg.jpg",
    loaderPortraitBg = "assets/loader/portraitloading_bg.jpg",
    loaderloadingBar = "assets/loader/bar.png",
    loaderloadingBarBG = "assets/loader/loading_base.png",

}


export enum loadsetforset1 {

}

export let AllAssetLoader = {
    loadsetforset1,
    basegameAssetConfig,
    symbolAssetConfig,
    autoplayAssetConfig,
    buttonpanelAssetConfig,
    paylineAssetConfig,
    introAssetConfig,
    soundAssetConfig,
    loadingGameConfig
}
