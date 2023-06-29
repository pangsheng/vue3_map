<script setup lang="ts">
import { RouterLink, RouterView, matchedRouteKey } from "vue-router";
import { onMounted, reactive, ref, nextTick } from "vue";
import localImage from './static/images/localImage.png'
import { axios } from './server/axios.ts'
import mapType from './views/mapType.vue'
import scaleButton from "./views/scaleButton.vue";
import mapColor from './views/mapColor.vue';

// 地图相关变量
var map: any;
var T = window.T;
let LngLat = reactive({ 'LngLat': new T.LngLat(36, 112) });
let scale = new T.Control.Scale();
let provinceCoordinate: any
let defalutScale = 12;
let mapDivDom = ref();

onMounted(() => {
    mapInit();
})
/**
 * 初始化地图
 */
const mapInit = async () => {
    map = new T.Map("mapDiv");
    LngLat.LngLat = await getPosMessage(null, null);
    map.centerAndZoom(LngLat.LngLat, defalutScale);//创建地图
    map.addEventListener('zoomend', function () {
        defalutScale = map.getZoom();
    });
    map.addControl(scale);//添加比例尺控件

    showMarker(map, LngLat.LngLat);//创建定位标记
    incloseProvince();
}

/**
 * 添加省级覆盖物
 */
async function incloseProvince() {
    var points: any[] = [];
    await axios.get('../public/local.json').then((value: any) => {
        provinceCoordinate = value.features;
    })
    provinceCoordinate.forEach((element: any) => {
        let temp: any;
        var polygon;
        if (element.properties.name === '内蒙古自治区') {
            temp = element.geometry.coordinates[0];
        } else {
            temp = element.geometry.coordinates[0][0];
        }
        temp.forEach((item: any) => {
            points.push(new T.LngLat(item[0], item[1]));
            //创建面对象
            polygon = new T.Polygon(points, {
                color: "blue", weight: 3, opacity: 0, fillOpacity: 0
            });
            displayPolygon(polygon);
        });
        map.addOverLay(polygon);
        points = [];
    });
}

/**
 * 添加覆盖物事件
 * @param polygon 覆盖物对象
 */
function displayPolygon(polygon: any) {
    polygon.addEventListener("mouseover", () => {
        if (defalutScale < 8) { polygon.setOpacity(.6) }
    });
    polygon.addEventListener("mouseout", () => {
        if (defalutScale < 8) { polygon.setOpacity(0) }
    });
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

async function getPosMessage(e: any, defLngLat: any) {
    if (defLngLat !== null) {
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
function showMarker(map: any, coordinate: any = null) {
    let point = new T.Point(16, 32)
    let markImg = new T.Icon({
        iconUrl: localImage,
        iconAnchor: point,
    })
    //创建标注对象
    var marker = new T.Marker(coordinate, { draggable: true, icon: markImg });
    marker.addEventListener("mouseup", (e: any) => {
        let target = e;
        LngLat.LngLat = target.lnglat
    });
    //向地图上添加标注
    map.addOverLay(marker);
}
</script>

<template>
    <div id="funBox">
        <!-- 按钮 -->
        <scaleButton @changeZoom="changeZoom" :LngLat="LngLat.LngLat" />
        <!-- 切换地图类型 -->
        <mapType @changeMapType="changeMapType" />
        <mapColor :mapDivDom="mapDivDom"/>
    </div>
    <div id="mapDiv" ref="mapDivDom">
    </div>
</template>

<style>
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
