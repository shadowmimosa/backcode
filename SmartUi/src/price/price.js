﻿/**
 * ----------------------------------------
 * SmartUi(v0.1):price.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass } from '../util'
const DATA_KEY = 'st.price'
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="{{_Name}}" class="c-price {{_SysClass}}" data-ride="price"><span name="currencyType">{{@CurrencyType}}</span><span name="price">{{@Price}}</span></div>`;
class Price {
    constructor(id, style) {
        this._id = id
        this._type = 'price'
        this._style = style;
    }
    //public methods
    renderControl(data) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        const cacheKey = DATA_KEY + '_' + this._style;
        return template(cacheKey, templates[this._style], data);
    }
}
export default Price