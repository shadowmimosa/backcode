<template>
  <wrapper>
    <template slot="tab">
      <tab
        :control-name="controlName"
        :tab-list="tabList"
        :cur-index="curIndex"
        @changeTab="changeTab"
      ></tab>
    </template>
    <ul>
      <li v-show="curIndex == 0">
        <data-pannel :model="model.data" />
      </li>
      <li v-show="curIndex == 1">
        <ul v-if="curIndex == 1" class="content-tab">
          <li
            v-for="(it, index) in styleTabList"
            :key="index"
            class="tab-item"
            :class="{ active: curStyleIndex == index }"
            @click="_handleChangeStyleTab(index)"
          >
            {{ it }}
          </li>
        </ul>
        <style-panel
          v-show="curStyleIndex == 0"
          :model="model.data"
          :prefix="prefix"
          :font-range="fontRange"
        />
        <hover-style-panel
          v-show="curStyleIndex == 1"
          :model="model.data"
          :prefix="prefix"
          :font-range="fontRange"
        />
      </li>
      <li v-show="curIndex == 2">
        <animate-area :model="model.data.animate"></animate-area>
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import StylePanel from './components/style-panel'
import HoverStylePanel from './components/hover-style-panel'
import DataPannel from './components/data-panel'
import AnimateArea from '@comp/animate'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'

export default {
  name: 'Button',
  components: {
    Wrapper,
    Tab,
    StylePanel,
    DataPannel,
    AnimateArea,
    HoverStylePanel
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      controlName: '图集四',
      curIndex: 0,
      tabList: [tabConfig[0], tabConfig[1], tabConfig[3]],
      curStyleIndex: 0,
      styleTabList: ['默认', '悬停'],
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.atlas
    }
  },
  methods: {
    changeTab(i) {
      this.curIndex = i
    },
    _handleChangeStyleTab(i) {
      this.curStyleIndex = i
    }
  }
}
</script>
<style lang="scss" scoped>
.pannel-content {
  position: relative;
}
</style>
