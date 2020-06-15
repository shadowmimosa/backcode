﻿import { runtimeMode } from '../env'
const getSysClass = id => {
    let sysClass = runtimeMode === 'design' ? 'fmcontrol ' + id : id;
    return sysClass
}
const getjQuery = () => {
    const { jQuery } = window

    if (jQuery) {
        return jQuery
    }

    return null
}
function cloneObj(item) {
    if (!item) {
        return item;
    } // null, undefined values check

    var types = [Number, String, Boolean],
        result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function (type) {
        if (item instanceof type) {
            result = type(item);
        }
    });

    if (typeof (result) === "undefined") {
        if (Object.prototype.toString.call(item) === "[object Array]") {
            result = [];
            item.forEach(function (child, index) {
                result[index] = cloneObj(child);
            });
        } else if (typeof item === "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode === "function") {
                result = item.cloneNode(true);
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (var i in item) {
                        result[i] = cloneObj(item[i]);
                    }
                }
            } else {

                result = item;

            }
        } else {
            result = item;
        }
    }
    return result;
}
const makeArray = nodeList => {
    if (!nodeList) {
        return []
    }

    return [].slice.call(nodeList)
}
export {
    getSysClass,
    getjQuery,
    cloneObj,
    makeArray
}