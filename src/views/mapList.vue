<script setup lang='ts'>
import { onMounted, ref } from 'vue';
let listHover = ref();
let listBox = ref();

onMounted(() => {
  listHover.value.onmouseover = (e: any) => {
    listBox.value.style.height = 'auto';
    listBox.value.style.border = '1px solid skyblue';
  }
  listBox.value.onmouseover = (e: any) => {
    listBox.value.style.height = 'auto';
    listBox.value.style.border = '1px solid skyblue';
  }
  listBox.value.onmouseout = (e: any) => {
    listBox.value.style.height = '0px';
    listBox.value.style.border = '';
  }
})

</script>

<template>
  <div id='mapList'>
    <div class="title">
      <div style="width: 75px;">
        <div class="iconBox">
          <svg class="icon current-icon custom-style" aria-hidden="true">
            <use xlink:href="#icon-earth-full"></use>
          </svg>
          <span>底图</span>
        </div>
      </div>
      <div style="width: 75px;">
        <div class="iconBox">
          <svg class="icon current-icon custom-style" aria-hidden="true">
            <use xlink:href="#icon-layer"></use>
          </svg>
          <span>图层</span>
        </div>
      </div>
      <div id="listHover" ref="listHover" style="width: 98px;">
        <div class="iconBox">
          <svg class="icon current-icon custom-style" aria-hidden="true">
            <use xlink:href="#icon-bg-tool"></use>
          </svg>
          <span>工具</span>
          <svg style="width: 20px;height: 20px;margin-top: 4px;" class="icon current-icon custom-style"
            aria-hidden="true">
            <use xlink:href="#icon-xiala"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div id="listBox" ref="listBox">
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-chizi"></use>
        </svg>
      </div>
      <div>
        <span>图上量算</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-dingwei2"></use>
        </svg>
      </div>
      <div>
        <span>坐标定位</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-daohang"></use>
        </svg>
      </div>
      <div>
        <span>地区导航</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-biaoji"></use>
        </svg>
      </div>
      <div>
        <span>我的标记</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-book"></use>
        </svg>
      </div>
      <div>
        <span>视角书签</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-dayinji_o"></use>
        </svg>
      </div>
      <div>
        <span>地图打印</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-daochutupian"></use>
        </svg>
      </div>
      <div>
        <span>地图出图</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-dituhuizhi"></use>
        </svg>
      </div>
      <div>
        <span>图上标绘</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-route1"></use>
        </svg>
      </div>
      <div>
        <span>路线导航</span>
      </div>
    </div>
    <div>
      <div>
        <svg class="icon current-icon" aria-hidden="true">
          <use xlink:href="#icon-dapingzhanshi"></use>
        </svg>
      </div>
      <div>
        <span>分屏对比</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#mapList {
  position: fixed;
  right: 10px;
  top: 12px;
  width: 260px;
  height: 40px;
  background-color: white;
  border: 1px solid skyblue;
}

#mapList .title {
  height: 30px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 4px;
  text-align: center;
  font-size: 14px;
}

#mapList .title .iconBox {
  display: flex;
  height: 30px;
  justify-content: center;
}

.iconBox span {
  margin-top: 2px;
}

#mapList .title>div {
  display: inline-block;
}

#mapList .title>div:hover {
  background-color: rgba(0, 138, 255, .2);
  cursor: pointer;
}

#mapList .title .custom-style {
  width: 18px;
  height: 18px;
  margin-top: 4px;
  margin-right: 4px;
}

/* 下拉框 */

#listBox {
  width: 97px;
  height: 0px;
  position: fixed;
  right: 16px;
  top: 50px;
  background-color: white;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  overflow: hidden;
}

#listBox>div {
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
}

#listBox>div:hover {
  background-color: rgba(0, 138, 255, .2);
}

#listBox svg {
  width: 18px;
  height: 18px;
  margin-right: 4px;
  margin-top: 10px;
}
</style>