<script setup lang="ts">
import { RouterLink, RouterView, matchedRouteKey } from "vue-router";
import mapType from './views/mapType.vue'
import scaleButton from "./views/scaleButton.vue";
import {onMounted ,reactive} from "vue";
import localImage from'./static/images/localImage.png'

// 地图相关变量
var map: any;
var T = window.T;
let LngLat = reactive({'LngLat':new T.LngLat(36, 112)});
let scale = new T.Control.Scale();



onMounted(() => {
    mapInit();
})
/**
 * 初始化地图
 */
const mapInit = async () => {
    map = new T.Map("mapDiv");
    LngLat.LngLat = await getPosMessage(null,null);
    map.centerAndZoom(LngLat.LngLat,12);//创建地图
    map.addControl(scale);//添加比例尺控件
    showMarker(map, LngLat.LngLat);//创建定位标记
}

/**
 * 切换放大倍数
 * @param type 放大或者缩小
 */
function changeZoom(type: number, LngLat: any) {
    if (type < 0) { return null }
    if (type === 0) {
        map.zoomIn();
    } else if (type === 1) {
        map.zoomOut();
    } else {
        map.panTo(LngLat, type);
    }
}

/**
 * 获取当前定位
 */
function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let data = {
                    latitude: latitude,
                    longitude: longitude,
                };
                resolve(data);
            }, () => {
                reject(arguments);
            })
        } else {
            reject('浏览器不支持当前地理位置信息获取');
        }
    })
}

async function getPosMessage(e: any,defLngLat:any) {
    if(defLngLat!==null){
        e?.callback(defLngLat);
        return null
    }
    let LngLat: any
    await getPosition().then((value: any) => {
        let Longitude = String(value.longitude).match(/\d+\.\d{0,6}/)?.[0];
        let latitude = String(value.latitude).match(/\d+\.\d{0,6}/)?.[0];
        LngLat = new T.LngLat(Longitude, latitude);
    });
    e?.callback(LngLat);
    return LngLat
}

/**
 * 切换地图类型
 * @param type 切换类型
 */
function changeMapType(type: number, mapDom: any) {
    for (const key in mapDom) {
        if (Object.prototype.hasOwnProperty.call(mapDom, key)) {
            mapDom[key].className = 'flodDiv';
        }
    }
    mapDom[type].className = 'flodDiv flodDivBlue'
    switch (type) {
        case 0: map.setMapType(TMAP_HYBRID_MAP); break;
        case 1: map.setMapType(window.TMAP_SATELLITE_MAP); break;
        case 2: map.setMapType(window.TMAP_TERRAIN_HYBRID_MAP); break;
        case 3: map.setMapType(window.TMAP_TERRAIN_MAP); break;
        case 4: map.setMapType(window.TMAP_NORMAL_MAP); break;
    }

}
/**
 * 添加定位标记
 * @param map 
 * @param coordinate 
 */
function showMarker(map: any, coordinate: any=null) {
    let point=new T.Point(16,32)
    let markImg=new T.Icon({
        iconUrl:localImage,
        iconAnchor:point,
    })
    //创建标注对象
    var marker = new T.Marker(coordinate, { draggable: true ,icon:markImg});
    marker.addEventListener("mouseup", (e:any)=>{
        let target=e;
        LngLat.LngLat=target.lnglat
    });
    //向地图上添加标注
      map.addOverLay(marker);
}
</script>

<template>
    <div id="funBox">
        <!-- 按钮 -->
        <scaleButton @changeZoom="changeZoom" :LngLat="LngLat.LngLat"/>
        <!-- 切换地图类型 -->
        <mapType @changeMapType="changeMapType" />
    </div>
    <div id="mapDiv"></div>
</template>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

/* 地图容器 */
#mapDiv {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
}


/* 功能区域 */
#funBox {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}
</style>
