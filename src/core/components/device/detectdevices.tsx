import React from "react";

interface IProps {
    [x: string]: any;
}


interface IState {
    [x: string]: any;

}

export default class Detectdevices {
    constructor() {
        // super(props);
    }

    /**
     *
     * @returns {String | null}
     */
    getHiddenProp() {
        let prefixes = ['webkit', 'moz', 'ms', 'o'];

        // if 'hidden' is natively supported just return it
        if ('hidden' in document) return 'hidden';

        // otherwise loop over all the known prefixes until we find one
        for (let i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document)
                return prefixes[i] + 'Hidden';
        }

        // otherwise it's not supported
        return null;
    };

    /**
     *
     * @returns {RegExp}
     */
    isSafariBrowser() {
        let isSafari = (this.isFirefoxBrowser() === false) && (this.isChromeBrowser() === false) && (/Safari/i.test(navigator.userAgent) === true);
        return isSafari;
    };

    /**
     *
     * @returns {RegExp}
     */
    isChromeBrowser() {
        if (this.isIOSMobile() === false && this.isIPad() === false) {
            return (/Chrome/i.test(navigator.userAgent));
        } else {
            return (/CriOS/i.test(navigator.userAgent));
        }
    };

    /**
     *
     * @returns {RegExp}
     */
    isIEBrowser() {
        return (/MSIE/i.test(navigator.userAgent));
    };

    /**
     *
     * @returns {RegExp}
     */
    isIE11Browser() {
        return (/Trident/i.test(navigator.userAgent));
    };

    /**
     *
     * @returns {RegExp}
     */
    isFirefoxBrowser() {
        if (this.isIOSMobile() === false && this.isIPad() === false) {
            return (/Firefox/i.test(navigator.userAgent));
        } else {
            return (/FxiOS/i.test(navigator.userAgent));
        }
    };

    /**
     *
     * @returns {RegExp}
     */
    isOperaBrowser() {
        return (/OPR/i.test(navigator.userAgent));
    };

    /**
     *
     * @returns {Boolean}
     */

    /* MOBILE DEVICES */
    isAndroidMobile() {
        return ((/Android/i.test(navigator.userAgent) === true) && (/Mobile/i.test(navigator.userAgent) === true));
    };

    /**
     *
     * @returns {RegExp}
     */
    isIOSMobile() {
        return /iPhone|iPod/i.test(navigator.userAgent);
    };

    /**
     *
     * @returns {RegExp}
     */
    isIOS7Mobile() {
        return /(?:OS\s*[7]+_\d+(?:_\d+)?\s*)/i.test(navigator.userAgent);
    };

    /**
     *
     * @returns {RegExp}
     */
    isIOS8Mobile() {
        return /(?:OS\s*[8]+_\d+(?:_\d+)?\s*)/i.test(navigator.userAgent);
    };

    /**
     *
     * @returns {RegExp}
     */
    isIOS9Mobile() {
        return /(?:OS\s*[9]+_\d+(?:_\d+)?\s*)/i.test(navigator.userAgent);
    };

    /**
     *
     * @returns {RegExp}
     */
    isBlackBerry() {
        return /BlackBerry/i.test(navigator.userAgent);
    };

    /**
     *
     * @returns {RegExp}
     */
    isOperaMobile() {
        return /Opera Mini/i.test(navigator.userAgent);
    };

    /**
     *
     * @returns {RegExp}
     */
    isWindowsMobile() {
        return /IEMobile/i.test(navigator.userAgent);
    };

    /**
     *
     * @returns {Boolean}
     */
    isMobile() {
        return (this.isAndroidMobile() === true || this.isIOSMobile() === true || this.isBlackBerry() === true || this.isOperaMobile() === true || this.isWindowsMobile() === true);
    };

    /**
     *
     * @returns {RegExp}
     */

    /* Tablet DEVICES */
    isIPad() {
        return /iPad/i.test(navigator.userAgent);
    };

    /**
     *
     * @returns {Boolean}
     */
    isAndroidTablet() {
        return ((/Android/i.test(navigator.userAgent) === true) && (/Mobile/i.test(navigator.userAgent) === false));
    };

    /**
     *
     * @returns {Boolean}
     */
    isWindowsTablet() {
        return ((/Windows/i.test(navigator.userAgent) === true) && (/Touch|Tablet/i.test(navigator.userAgent) === true));
    };

    /**
     *
     * @returns {Boolean}
     */
    isTablet() {
        return (this.isIPad() === true || this.isAndroidTablet() === true || this.isWindowsTablet() === true);
    };

    /**
     *
     * @returns {Boolean}
     */
    isHandheld() {
        return (this.isTablet() || this.isMobile());
    };

    /**
     *
     * @returns {Boolean}
     */
    isWebAudioAPISupported() {
        // return (window.webkitAudioContext && window.webkitAudioContext !== undefined || window.AudioContext !== undefined);
    };

    /**
     *
     * @returns {Boolean}
     */
    isHTML5AudioSupported() {
        return (window.Audio !== undefined);
    };

    /**
     *
     * @returns {Boolean}
     */
    isMP3Supported() {

        let a = new Audio();
        return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));

    };

    /**
     *
     * @returns {Boolean}
     */
    isOggVorbisSupported() {
        let a = new Audio();
        return !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
    };

    /**
     *
     */
    initialize() {
        if (this.isMobile() === true) {
            if (this.isIOSMobile() === true) {
                this.initializeIOSMobile();
            }
        } else {
            if (this.isIPad() === true) {
                this.initializeIPad();
            }
        }
    };

    /**
     *
     */
    initializeIOSMobile() {
        let meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        //meta.setAttribute("content", "width=480, initial-scale=0.5, maximum-scale=0.5, user-scalable=no");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui");
        document.head.appendChild(meta);

        meta = document.createElement("meta");
        meta.setAttribute("name", "apple-mobile-web-app-capable");
        meta.setAttribute("content", "no");
        document.head.appendChild(meta);
    };

    /**
     *
     */
    initializeIPad() {
        let meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        //meta.setAttribute("content", "width=480, initial-scale=0.5, maximum-scale=0.5, user-scalable=no");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui");
        document.head.appendChild(meta);

        meta = document.createElement("meta");
        meta.setAttribute("name", "apple-mobile-web-app-capable");
        meta.setAttribute("content", "no");
        document.head.appendChild(meta);
    };

    /**
     *
     */
    // get allowAudio () {
    //     return !isMobile();
    // }
    render() {
        return (<></>)
    }
}