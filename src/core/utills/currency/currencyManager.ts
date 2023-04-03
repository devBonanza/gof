let currencyFormatter = require('currency-formatter');
class CurrencyManager {
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
    constructor() {
        this.currencyCode = "GBP";
        this.majorSymbol = "£";
        this.minorSymbol = "p";
        this.thouSeperator = ",";
        this.thouPlaces = 3;
        this.dpSeperator = ".";
        this.decimalPlaces = 2;
        this.currencyScale = 1;
        this.prefixMajor = true;
        this.baseValue = 0;
    }
    setCurrency(event: any) {
        this.currencyCode = event.currency.code.toUpperCase();
        this.majorSymbol = decodeURIComponent(event.currency.maj);
        this.minorSymbol = event.currency.min;
        this.thouSeperator = event.currency.gs;
        this.dpSeperator = event.currency.ds;
        this.currencyScale = event.currency.scale;
        if (event.currency.gp !== undefined) {
            this.thouPlaces = event.currency.gp;
        }
        if (event.currency.dp !== undefined) {
            this.decimalPlaces = event.currency.dp;
        }
        this.prefixMajor = event.currency.msp;
    }
    replace(string: any, expression: any, replace: any) {
        if (expression && expression !== "") {
            return string.replace(expression, replace);
        }
        return string;
    }

    isFloat(val: any) {
        let n =Number(val);
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
        if(!this.currencyCode){
            precision=0;
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
            decimalRoof=2;
        }
       
        const valueNum = Number(value);
        if (!isFinite(valueNum) && typeof value === "string") {
            value = currencyFormatter.unformat(value, { code: this.currencyCode });
        }
        value = isFinite(valueNum) ? valueNum : value;
        const precision = this.calculateDisplayedPrecision(value, decimalRoof);
        value = value * this.currencyScale;
        return currencyFormatter.format(value, {
            code: this.currencyCode,
            symbol: currencyFormatter.currencies.filter((data: any) => {
                if (data.code == this.currencyCode) {
                    return data.symbol;
                }
            })[0] && currencyFormatter.currencies.filter((data: any) => {
                if (data.code == this.currencyCode) {
                    return data.symbol;
                }
            })[0].symbol || this.currencyCode,
            
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
        return currencyFormatter.unformat(value, { code: this.currencyCode });
    }
}
export default CurrencyManager;