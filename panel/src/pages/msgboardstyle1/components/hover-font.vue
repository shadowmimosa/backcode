<template>
  <div class="flex-between-center--area">
    <ul class="font-style">
      <li>
        <font-weight
          :prefix="prefix"
          :model="model"
          @onCssChange="onCssChange"
        ></font-weight>
      </li>
      <li>
        <font-italic :prefix="prefix" :model="model"></font-italic>
      </li>
      <li>
        <font-underline :prefix="prefix" :model="model"></font-underline>
      </li>
    </ul>
    <font-color :model="model" :prefix="prefix"></font-color>
  </div>
</template>
<script>
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'

export default {
  name: 'Font',
  components: {
    FontColor,
    FontWeight,
    FontItalic,
    FontUnderline
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    fontRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: '1'
    }
  },
  mounted() {},
  methods: {
    _handleAddButtonIcon() {},
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.font-style {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #c9d9dc;
  border-radius: 4px;
  background: #fff;
  li {
    box-sizing: content-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    &::after {
      display: block;
      position: absolute;
      right: 0;
      top: 12px;
      content: '';
      width: 1px;
      height: 16px;
      background: #eee;
    }
  }
}
.el-input__inner {
  min-width: 40px;
}
</style>
<style scoped>
.stpanel-parcel /deep/ .el-collapse-item .font-color .el-color-picker--small {
  width: 50px;
}
</style>
