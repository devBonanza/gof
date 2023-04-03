import {Component} from "react";
import {connect} from "react-redux";
import {IStore} from "../../store/IStore";
import {Dispatch} from "redux";

let currencyFormatter = require('currency-formatter');

interface IProps {
    [x: string]: any;
}

interface IState {

}

interface IStateToProps {
}

interface IDispatchToProps {
}

class CurrencyManager extends Component<IProps, IState> {

    protected currencyCode: string;
    protected majorSymbol: string;
    protected minorSymbol: string;
    protected thouSeperator: string;
    protected thouPlaces: number;
    protected dpSeperator: string;
    protected decimalPlaces: number;
    protected currencyScale: number;
    protected prefixMajor: boolean;
    protected baseValue: number;

    constructor(props: IProps) {
        super(props);
        this.currencyCode = this.props.currencyCode;
        this.majorSymbol = this.props.majorSymbol;
        this.minorSymbol = this.props.minorSymbol;
        this.thouSeperator = this.props.thouSeperator;
        this.thouPlaces = this.props.thouPlaces;
        this.dpSeperator = this.props.dpSeperator;
        this.decimalPlaces = this.props.decimalPlaces;
        this.currencyScale = this.props.currencyScale;
        this.prefixMajor = this.props.prefixMajor;
        this.baseValue = this.props.baseValue;
    }

    replace(string: any, expression: any, replace: any) {
        if (expression && expression !== "") {
            return string.replace(expression, replace);
        }
        return string;
    }

    isFloat(n: any) {
        return Number(n) === n && n % 1 !== 0;
    }

    getPrecision(n: any) {
        const split = n.toString().split(".");
        return split[1] ? split[1].length : 0;
    }

    calculateDisplayedPrecision(value: any, decimalRoof: any) {
        let precision = this.getPrecision(value.toPrecision());

        if (precision < this.decimalPlaces) {
            precision = this.decimalPlaces;
        }

        if (precision > decimalRoof) {
            precision = decimalRoof;
        }
        return precision;
    }

    /**
     *
     * @param {Number} value
     * @param {Boolean} showMajor
     * @param {Boolean} showThousands
     * @param {Boolean} showDecimal
     * @param {Boolean} showMinor
     * @returns {String}
     */
    formatCurrencyString(value: any, showMajor: any, showThousands: any, showDecimal: any, showMinor: any, decimalRoof: any = this.decimalPlaces) {
        let majorSymbol = showMajor === true ? this.majorSymbol : "",
            thouSeperator = showThousands === true ? this.thouSeperator : "",
            decimalPlaces = showDecimal ? decimalRoof || this.decimalPlaces : 0,
            thouPlaces = this.thouPlaces,
            tempString = "";

        if (showDecimal && this.isFloat(value) && decimalPlaces === 0) {
            decimalPlaces = 2;
        }
        const valueNum = Number(value);
        if (!isFinite(valueNum) && typeof value === "string") {
            value = currencyFormatter.unformat(value, {code: this.currencyCode});
        }

        value = isFinite(valueNum) ? valueNum : value;
        const precision = this.calculateDisplayedPrecision(value, decimalRoof);
        value = value * this.currencyScale;

        return currencyFormatter.format(value, {
            symbol: majorSymbol,
            decimal: this.dpSeperator,
            thousand: thouSeperator,
            precision: showDecimal ? precision : 0,
            format: this.prefixMajor ? "%s%v" : "%v%s"
        });
    }

    /**
     * Turns a formatted string back into a float
     * @param {String} value
     * @returns {Number}
     */
    removeStringFormatting(value: any) {
        return currencyFormatter.unformat(value, {code: this.currencyCode});
    }
}

// export default CurrencyManager;
export default connect(
    (state: Pick<IStore, 'currencyManagerState'>): any =>
        ({
            currencyCode: state.currencyManagerState.currencyCode,
            majorSymbol: state.currencyManagerState.majorSymbol,
            minorSymbol: state.currencyManagerState.minorSymbol,
            thouSeperator: state.currencyManagerState.thouSeperator,
            thouPlaces: state.currencyManagerState.thouPlaces,
            dpSeperator: state.currencyManagerState.dpSeperator,
            decimalPlaces: state.currencyManagerState.decimalPlaces,
            currencyScale: state.currencyManagerState.currencyScale,
            prefixMajor: state.currencyManagerState.prefixMajor,
            baseValue: state.currencyManagerState.baseValue,
        }),
    (dispatch: Dispatch): any => ({
    }))(CurrencyManager)