import config from './config';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: config,
        currentCity: ''
    },
    onLoad: function (options) {
        this.getLocation();
    },
    getLocation: function () {
        var page = this
        wx.getLocation({
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