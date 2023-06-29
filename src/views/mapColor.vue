<script setup lang='ts'>
import { reactive, onMounted, ref, watch, watchEffect } from 'vue';
const props = defineProps({
  mapDivDom: HTMLDivElement
});
let colorType = ref(false);
let mapTypeSvg=ref(0)

watch(colorType, (newValue, oldValue) => {
  let classList:any=props.mapDivDom?.classList.value.indexOf('selectMap');
  if(classList<0){
    props.mapDivDom?.classList.add("selectMap")
  }
  mapTypeSvg.value=Number(newValue);
})
</script>

<template>
  <div id='selectBox'>
    <select name="mapColor" id="mapColor" v-model="colorType">
      <option value="false" selected>选择地图类型</option>
      <option value="0">天地图</option>
      <option value="1">蓝色地图</option>
      <option value="2">345</option>
    </select>
    <svg v-if="mapTypeSvg===1" height="0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ps-map-type" x="-10%" y="-10%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values=".33 .33 .33 0 0
            .33 .33 .33 0 0
            .33 .33 .33 0 0
            0 0 0 1 0" in="SourceGraphic" result="colormatrix" />
          <feComponentTransfer in="colormatrix" result="componentTransfer">
            <feFuncR type="table" tableValues="0.93 0.93 0.93 0 0" />
            <feFuncG type="table" tableValues="0.91 0.91 0.91 0.2 0.1" />
            <feFuncB type="table" tableValues="0.77 0.77 0.77 0.32 0.16" />
            <feFuncA type="table" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
    <svg v-if="mapTypeSvg===2" height="0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ps-map-type" x="-10%" y="-10%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values=".33 .33 .33 0 0
            .33 .33 .33 0 0
            .33 .33 .33 0 0
            0 0 0 1 0" in="SourceGraphic" result="colormatrix" />
          <feComponentTransfer in="colormatrix" result="componentTransfer">
            <feFuncR type="table" tableValues="0 1" />
            <feFuncG type="table" tableValues="0 1" />
            <feFuncB type="table" tableValues="0 1" />
            <feFuncA type="table" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style>
#selectBox {
  position: absolute;
  top: 10px;
  left: 14px;
}

.selectMap img {
  filter: url(#ps-map-type);
}
</style>