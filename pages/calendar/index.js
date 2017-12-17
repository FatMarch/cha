import config from './config';
import util from '../../utils/util.js';
import _date from '../../utils/date.js';

Page({
    data: {
        date: util.formatDate(new Date()),
        title: config.title,
        curDay: util.day,
        dates: _date.init(),
        calendar: _date.calendar(),
        index: 0
    },

    onLoad: function (options) {
        
    },
    tapDay() {
        
    },

    cellTap: function(e) {
        console.log(e)
    }
});