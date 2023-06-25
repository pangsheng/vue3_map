<script setup lang='ts'>
import { reactive, onMounted, ref } from "vue";
let scaleShow = reactive({ value0: false, value1: false });
let emits=defineEmits(['changeZoom','getPosMessage']);
let LngLatValue:any=reactive({localMessage:null});
emits('getPosMessage',{callback:(result:any)=>{
  LngLatValue.localMessage=result;
}});
</script>

<template>
  <!-- 缩放按钮 -->
  <div id="scale-box" style="width: 30px;">
    <span class="zoom-change" @click="emits('changeZoom',12,LngLatValue.localMessage)">
      <svg class="icon current-icon ps-iconset-local" aria-hidden="true">
        <use xlink:href="#icon-dingwei"></use>
      </svg>
    </span>
    <span class="zoom-change" @click="emits('changeZoom',0)" @mouseenter="scaleShow.value0 = true"
      @mouseleave="scaleShow.value0 = false">
      <svg class="icon current-icon ps-iconset" aria-hidden="true">
        <use v-if="!scaleShow.value0" xlink:href="#icon-jiahao"></use>
        <use v-else xlink:href="#icon-jiahao-copy"></use>
      </svg>
    </span>
    <span class="zoom-change" @click="emits('changeZoom',1)" @mouseenter="scaleShow.value1 = true"
      @mouseleave="scaleShow.value1 = false">
      <svg class="icon current-icon ps-iconset" aria-hidden="true">
        <use v-if="!scaleShow.value1" xlink:href="#icon-jianhao"></use>
        <use v-else xlink:href="#icon-jianhao-copy"></use>
      </svg>
    </span>
  </div>
</template>

<style scoped>
/* 缩放按钮 */
#scale-box {
    position: fixed;
    bottom: 104px;
    right: 20px;
}

.zoom-change {
    display: inline-block;
    width: 26px;
    height: 26px;
    background-color: white;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 26px;
    margin-top: 4px;
    cursor: pointer;
}

.ps-iconset {
    width: 18px;
    height: 18px;
    margin-top: 4px;
    color: rgba(0, 0, 0, 0.1);
}

.ps-iconset-local {
    width: 22px;
    height: 22px;
    margin-top: 2px;
}


/* 动画效果 */
#mapTypeBox:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.8);
    width: 490px;
    transition: all .5s;
    -webkit-transition: all .5s;
    transition-timing-function: linear;
    -webkit-transition-timing-function: linear;
}

#mapTypeBox .flodDiv:nth-of-type(1) {
    position: absolute;
    right: 16px;
    z-index: 1;
}

#mapTypeBox .flodDiv:nth-of-type(2) {
    position: absolute;
    right: 12px;
    z-index: 1;
}

#mapTypeBox .flodDiv:nth-of-type(3) {
    position: absolute;
    right: 8px;
    z-index: 1;
    opacity: .5;
}

#mapTypeBox .flodDiv:nth-of-type(4) {
    position: absolute;
    right: 4px;
    z-index: 1;
    opacity: .5;
}

#mapTypeBox .flodDiv:nth-of-type(5) {
    position: absolute;
    right: 0px;
    z-index: 5;
    opacity: 1;
}

#mapTypeBox:hover .flodDiv {
    opacity: 1;
    z-index: 4;
}

#mapTypeBox:hover .flodDiv:nth-of-type(1) {
    right: 384px;
}

#mapTypeBox:hover .flodDiv:nth-of-type(2) {
    right: 288px;
}

#mapTypeBox:hover .flodDiv:nth-of-type(3) {
    right: 192px;
}

#mapTypeBox:hover .flodDiv:nth-of-type(4) {
    right: 96px;
}
</style>