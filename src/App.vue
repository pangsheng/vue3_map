<script setup lang="ts">
import { RouterLink, RouterView, matchedRouteKey } from "vue-router";
import mapType from'./views/mapType.vue'
import { reactive, onMounted, ref } from "vue";

// 地图相关变量
var map: any;
var T = window.T;
let scaleShow = reactive({ value0: false, value1: false });
let Longitude: any = "116.40769"; //经-默认
let latitude: any = "39.89945"; //纬=默认
let LngLat = new T.LngLat(112, 36);
let scale = new T.Control.Scale();


onMounted(() => {
    mapInit();
})
/**
 * 初始化地图
 */
const mapInit = () => {
    map = new T.Map("mapDiv");
    map.centerAndZoom(LngLat, 7);//创建地图
    getPosition().then((value: any) => {
        Longitude = String(value.longitude).match(/\d+\.\d{0,6}/)?.[0];
        latitude = String(value.latitude).match(/\d+\.\d{0,6}/)?.[0];
        LngLat = new T.LngLat(Longitude, latitude);
        map.addControl(scale);//添加比例尺控件
        map.panTo(LngLat, 12);//切换至当前定位
    });
}

/**
 * 切换放大倍数
 * @param type 放大或者缩小
 */
function changeZoom(type: number) {
    if (type) {
        map.zoomIn();
    } else {
        map.zoomOut();
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
/**
 * 切换地图类型
 * @param type 切换类型
 */
function changeMapType(type: number,mapDom:any) {
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
</script>

<template>
    <div id="funBox">
        <!-- 缩放按钮 -->
        <div id="scale-box" style="width: 30px;">
            <span class="zoom-change" @click="map.panTo(LngLat,12)">
                <svg class="icon current-icon ps-iconset-local" aria-hidden="true">
                    <use xlink:href="#icon-dingwei"></use>
                </svg>
            </span>
            <span class="zoom-change" @click="changeZoom(1)" @mouseenter="scaleShow.value0 = true"
                @mouseleave="scaleShow.value0 = false">
                <svg class="icon current-icon ps-iconset" aria-hidden="true">
                    <use v-if="!scaleShow.value0" xlink:href="#icon-jiahao"></use>
                    <use v-else xlink:href="#icon-jiahao-copy"></use>
                </svg>
            </span>
            <span class="zoom-change" @click="changeZoom(0)" @mouseenter="scaleShow.value1 = true"
                @mouseleave="scaleShow.value1 = false">
                <svg class="icon current-icon ps-iconset" aria-hidden="true">
                    <use v-if="!scaleShow.value1" xlink:href="#icon-jianhao"></use>
                    <use v-else xlink:href="#icon-jianhao-copy"></use>
                </svg>
            </span>
        </div>
        <!-- 切换地图类型 -->
        <mapType @changeMapType="changeMapType"/>
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

/* 
* 地图类型切换 end 
*/</style>
