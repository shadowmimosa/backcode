import Base from '../base/base.js'

import template from '../../templateengine/index'
const NAME = 'newslist_style6'
const DATA_KEY = 'st.newslist_style6'
import { getSysClass, getjQuery } from '../../util'
const $ = getjQuery()
const templates = {}
const INNER_LIST = `{{each listData item i}} 
<li class="list-item col-item{{percent}} col-md-item{{mobilePercent}}" data-percent="{{percent}}">
    <a href="/news/{{if newsDetailPageId}}{{newsDetailPageId}}{{else}}empty{{/if}}/{{item.Id}}.html" target="{{target}}">
        <div class="list-content ">
           <p class="date" data-date="{{item.PublishTime}}">{{item.PublishTime}}</p>
            <h1 class="title ellipsis_line--multi">{{item.Title}}</h1>
            <div class="desc">
                <p class="ellipsis_line--multi">{{item.Summary}}</p>
            </div>
            <div class="view-more"><span class="view-detail">{{buttonName}} ></span>
            </div>
        </div>
    </a>
</li>
{{/each}}`
const INNER_TEM = `<div class="c-newslist-wrap"><ul class="c-newslist c-newslist__inner">${INNER_LIST}</ul></div>
<div  class="pagination" data-ride="pagination" id="pgn_{{_Id}}" data-total="{{pageCount}}" data-relid="{{_Id}}" data-reltype="newslist">  
</div>`
templates[
  'style6'
] = `<div id="{{_Id}}" data-c-type="newslist" data-date-style="{{dateStyle}}" data-c-style="{{_Style}}" data-query='{{_Query}}' class="c-newslist-container {{_SysClass}}" data-pgrelid="pgn_{{_Id}}" data-ride="newslist" data-conf='{"percent":"{{percent}}","mobilePercent":"{{mobilePercent}}","buttonName":"{{buttonName}}","target":"{{target}}","newsDetailPageId":"{{newsDetailPageId}}","dateStyle":"{{dateStyle}}"}' >
    ${INNER_TEM}
</div>`

class NewsListStyle6 extends Base {
  constructor(id, style, dateStyle) {
    super()
    this._id = id
    this._control = $('#' + id)
    // 分页Id
    this._pgRelId = this._control.attr('data-pgrelId')
    this._dataConf = JSON.parse(this._control.attr('data-conf'))
    this._query = JSON.parse(this._control.attr('data-query'))
    this._dateStyle = dateStyle
  }
  _init() {
    const dateStyle = this._control.attr('data-date-style')
    this._resetPaginationTotalSizeFromList()
    this.formatDataStyle(dateStyle, '')
  }
  //public methods
  renderControl(data) {
    data._Id = this._id
    data._SysClass = getSysClass(this._id)
    data._Style = this._style
    data._Query = JSON.stringify(data.query)
    const cacheKey = DATA_KEY + '_' + this._style

    return template(cacheKey, templates[this._style], data)
  }
  refreshControl(data, callback) {
    this._dataConf.newsDetailPageId = data.dataModel.newsDetailPageId

    this._dataConf.dateStyle = data.dataModel.dateStyle
    this._dataConf.target = data.dataModel.target
    this._dataConf.percent = data.dataModel.percent
    this._query = data.query
    this._control.attr('data-query', JSON.stringify(this._query))
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
    this._control.data(DATA_KEY, this)

    this.loadData(1, callback)
  }
  _renderInnerHtml(data) {
    data._Id = this._id
    const cacheKey = DATA_KEY + '_inner' + this._style
    let html = template(cacheKey, INNER_LIST, data)
    this._control.find('.c-newslist__inner').html(html)
    this._setPageTotal(data.pageCount)
    const dateStyle = this._control.attr('data-date-style')
    this.formatDataStyle(dateStyle, data.listData)
  }
  _appendInnerHtml(data) {
    data._Id = this._id
    const cacheKey = DATA_KEY + '_inner'
    let html = template(cacheKey, INNER_LIST, data)
    $('#' + this._id)
      .find('.c-newslist__inner')
      .append(html)
    this._setPageTotal(data.pageCount)
    const dateStyle = this._control.attr('data-date-style')
    this.formatDataStyle(dateStyle, data.listData, 'mobile')
  }
  // Static

  static newslistInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      data = new NewsListStyle6(
        $this.attr('id'),
        $this.attr('data-c-style'),
        $this.attr('data-date-style')
      )
      data._init()
    }

    if (typeof options === 'string') {
      if (typeof data[options] === 'undefined') {
        throw new TypeError(`No method named "${options}"`)
      }
      data[options].apply(data, args)
    }
  }

  static jQueryInterface(config) {
    var args = Array.prototype.slice.call(arguments, 1)
    return this.each(function () {
      NewsListStyle6.newslistInterface(this, config, args)
    })
  }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = NewsListStyle6.jQueryInterface
$.fn[NAME].Constructor = NewsListStyle6
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return NewsListStyle6.jQueryInterface
}
$(window).on('load', function () {
  $(`[data-ride="${NAME}"]`)[NAME]()
})

export default NewsListStyle6
