<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(['changeMapType']);
let mapDom: any = ref<null | HTMLElement>(null);
let mapTypeSelect = [
  {
    'title': '卫星混合',
    'icon': 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png',
    'layer': 'TMAP_HYBRID_MAP'
  },
  {
    'title': '卫星',
    'icon': ' http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png',
    'layer': window.TMAP_SATELLITE_MAP
  },
  {
    'title': '地形混合',
    'icon': ' http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrainpoi.png',
    'layer': window.TMAP_TERRAIN_HYBRID_MAP
  },
  {
    'title': '地形',
    'icon': ' http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrain.png',
    'layer': window.TMAP_TERRAIN_MAP
  },
  {
    'title': '地图',
    'icon': 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png',
    'layer': window.TMAP_NORMAL_MAP
  }];
</script>
<template>
  <div id="mapTypeBox">
    <div id="mapTypeBox-0">
      <div class="flodDiv" v-for="item, index in mapTypeSelect" :key="item.icon" @click="emits('changeMapType',index,mapDom)"
        ref="mapDom">
        <img :alt="item.title" :src="item.icon">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>

#mapTypeBox {
  position: fixed;
  bottom: 20px;
  right: 10px;
  height: 80px;
  width: 94px;
  background-color: rgba(0, 0, 0, 0);
  transition: all .5s;
  -webkit-transition: all .5s;
  transition-timing-function: linear;
  -webkit-transition-timing-function: linear;
}

#mapTypeBox-0 {
  position: absolute;
  right: 10px;
  top: 0px;
  line-height: 76px;
}

#mapTypeBox .flodDiv {
  display: inline-block;
  transition: all .5s;
  position: relative;
}

#mapTypeBox .flodDiv img {
  border: 1px solid rgba(255, 255, 255, 0);
}

#mapTypeBox .flodDiv:hover img {
  border-color: #3385FF;
}

#mapTypeBox:hover .flodDivBlue img {
  border-color: #3385FF;
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

/* 图片配置 */
#mapTypeBox div img {
  width: 86px;
  height: 60px;
  border-radius: 4px;
}

#mapTypeBox div span {
  width: auto;
  height: 20px;
  font-size: 12px;
  padding-right: 2px;
  padding-left: 2px;
  line-height: 20px;
  color: white;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  position: absolute;
  bottom: 6px;
  right: 0px;
  z-index: 4;
}

#mapTypeBox .flodDiv:hover span {
  background-color: #3385FF;
}

#mapTypeBox:hover .flodDivBlue span {
  background-color: #3385FF;
}
</style>