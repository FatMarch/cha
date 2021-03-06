import config from './config';
import date_obj from '../../utils/date.js';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: config,
        currentCity: '北京市',
        date: date_obj.init(),
        time: date_obj.time(),
    },
    onLoad: function (options) {
        //this.getLocation();
    },
    onReady: function (options) {
        this.interval = setInterval(this.showTime, 1000);
    },
    showTime: function() {
        //循环执行代码
        let cur_time = date_obj.time();
        this.setData({
            time: cur_time,
        })
    },

    //页面卸载，清除 
    onUnload: function () {
        clearInterval(this.interval)
    },

    getLocation: function () {
        var page = this
        wx.getLocation({
            //type: 'wgs84',
            success: function (res) {
                // success    
                var longitude = res.longitude
                var latitude = res.latitude
                page.loadCity(longitude, latitude)
            }
        })
    },
    loadCity: function (longitude, latitude) {
        var page = this
        wx.request({
            url: 'https://api.map.baidu.com/geocoder/v2/?ak=355f36efee0cc910f46f649b387e2338&location=' + latitude + ',' + longitude + '&output=json',
            data: {},
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                // success    
                console.log(res);
                var city = res.data.result.addressComponent.city;
                page.setData({ currentCity: city });
            },
            fail: function () {
                page.setData({ currentCity: "获取定位失败" });
            },

        })
    }  
})