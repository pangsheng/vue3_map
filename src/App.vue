<template>
  <div id="funBox">
    <!-- 按钮 -->
    <scaleButton @changeZoom="changeZoom" :point="point" />
    <!-- 地图列表 工具 -->
    <mapList></mapList>
  </div>
  <div id='mapBox'>
  </div>
</template>
<script setup lang='ts'>
import { onMounted,ref } from 'vue';
import scaleButton from './views/nativeJs/scaleButton.vue'
import mapList from './views/mapList.vue'

/******** 初始化变量 ********/

let map: any = null;
let marker:any =null;
let point: any[] = [39.916527,116.397128];
const tileOptions = {
  minZoom: 1,
  maxZoom: 12
}
var normal: any
/******** 初始化变量 end********/

/******** 逻辑函数********/

// 初始化地图
const initMap = async () => {
  // 定义矢量地图
  var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', tileOptions)
  // 定义矢量注记
  var normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', tileOptions)
  // 组合地图和注记
  normal = L.layerGroup([normalm, normala])
  // await getPosition().then((value: any) => {
  //   point[1] = String(value.longitude).match(/\d+\.\d{0,6}/)?.[0];
  //   point[0] = String(value.latitude).match(/\d+\.\d{0,6}/)?.[0];
  // }).catch((err) => {
  //   console.log(err);
  // });
  map = L.map('mapBox', {
    center: point,
    zoom: 12,
    layers: [normal],
    zoomControl: false,
    maxZoom:18,
    minZoom:1
  })
  map.addEventListener("drag", locationCenter);
  map.addEventListener("zoomend", locationCenter);
  marker = L.marker(point).addTo(map);
}

/**
 * 设置标记到中心点
 */
function locationCenter(){
  let centerPoint=map.getCenter();
  marker.setLatLng(centerPoint)
}

/**
 * 获取当前经纬度
 */
 function getPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let data = {
            latitude: latitude,
            longitude: longitude,
          };
          resolve(data);
        },
        ()=>{
          reject(arguments);
        }
      );
    } else {
      reject("你的浏览器不支持当前地理位置信息获取");
    }
  });
}

/**
 * 切换放大倍数
 * @param type 判断放大还是缩小  0放大  1缩小 其他是跳转定位
 * @param backPoint 定位坐标
 */
function changeZoom(type: number, backPoint: any) {
  if (type > 1) {
    map.panTo(backPoint, type)
    // map.removeLayer(normal);
    // let newmap = L.tileLayer.chinaProvider('GaoDe.Normal.Map', tileOptions);
    // let sss=L.layerGroup([newmap])
    // map.addLayer(sss)
  }
  switch (type) {
    case 0: map.zoomIn(); break;
    case 1: map.zoomOut(); break;
  }
}
/******** 逻辑函数 end********/

/******** 生命周期********/
// 加载地图
onMounted(() => {
  initMap();
})
/******** 生命周期 end********/

</script>

<style scoped>
#funBox {
  position: fixed;
  z-index: 1000;
}

#mapBox {
  width: 100vw;
  height: 100vh;
}
</style>