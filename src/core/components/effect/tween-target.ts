"use strict";

/**
 * @classdesc Tween Target
 * @author Graeme matthews <graeme.matthews@gamesinc.co.uk>
 * @constructs TweenTarget
 * @memberOf module:Prime
 */
export class TweenTarget {
    public object: any
    public properties: any
    public data: any

    constructor() {
        this.object = null;
        this.properties = null;
    }

    /**
     *
     * @param {Object} target The target to perform the tween on
     * @param {Object} properties Contains each property to be changed along with their start and end values (If start value is set to null the tween with using the current value as the start point)
     * Example: {"x" : {start : 15, end : 100), "y" : {start : null, end : 100)...}
     */
    setProperties(target: any, properties: any) {
        let current = null;
        this.object = target;
        if (properties !== undefined) {
            this.properties = JSON.parse(JSON.stringify(properties)); //deep copy

            for (let prop in this.properties) {
                current = this.properties[prop];
                if (current.start === null) {
                    current.start = this.object[prop];
                }
                if (current.additive) {
                    current.end = current.end + this.object[prop];
                }
                current.change = current.end - current.start;
            }
        }
        //this.properties= properties;
    }

    /**
     *
     * @param {Object} target The target to perform the tween on
     * @param {Object} properties Contains each property to be changed along with their start and end values (If start value is set to null the tween with using the current value as the start point)
     * Example: {"x" : {start : 15, end : 100), "y" : {start : null, end : 100)...}
     */
    swapProperties() {
        let tempStart = null,
            current = null;
        for (let prop in this.properties) {
            current = this.properties[prop];
            tempStart = current.start;
            current.start = current.end;
            current.end = tempStart;
            current.change = current.end - current.start;
        }
    }

    /**
     *
     */
    dispose() {
        this.object = null;
        for (let prop in this.properties) {
            this.properties[prop] = null;
        }
        this.properties = null;
        this.data = null;
    }
}
