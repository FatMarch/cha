import cndate from './getCnDate.js';

/**
 * 获取年月日等信息
 */
function init_date() {
    var date = new Date();
    
    var dates = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        week: date.getDay(),
        is_run: is_run()
    };
    dates.cnday = cndate.GetLunarDay(dates.year, dates.month, dates.day);
    dates.enday = en_time();

    return dates;
}

function en_time() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
}

/**
 * 获取给定日期的'日'字段
 */
function get_day(date) {
    date = new Date(date);
    return date.getDate();
}

/**
 * 获取每个月多少天
 */
function get_month_days(month) {
    var days = 0;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            days = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            days = 30;
            break;
        case 2:
            days = 28;
            if (is_run()) {
                days = 29;
            }
            break;
        default:
            break;
    }

    return days;
}

/**
 * 获取是不是闰年
 */
function is_run(year) {
    if (year % 400 === 0) {
        return true;
    }

    if (year % 4 === 0 && year % 100 !== 0) {
        return true;
    }

    return false;
}

/**
 * 获取当前月日历
 */
function calendar() {
    var dates = init_date();

    //判断当前月1号和最后一天是星期几
    var cur = dates.year + '/' + dates.month + '/' + '01';
    var week = new Date(cur).getDay();
    var cur_month_days = get_month_days(dates.month);
    var last = dates.year + '/' + dates.month + '/' + cur_month_days;
    var last_week = new Date(last).getDay();
    var last_null = 6 - last_week;

    var pre_month = dates.month === 1 ? 12 : dates.month - 1;
    var pre_year = dates.month === 1 ? dates.year - 1 : dates.year;
    var pre_month_days = get_month_days(pre_month);
    
    var nxt_month = dates.month === 12 ? 1 : dates.month + 1;
    var nxt_year = dates.month === 12 ? dates.year + 1: dates.year;
    
    //补全前几天
    var day_set = [];
    var cur_index = 0;
        day_set[cur_index] = [];
    for (var i = week - 1; i >= 0; i--) {
        
        var cnda = cndate.GetLunarDay(pre_year, pre_month, pre_month_days - i);
        var cnday = cnda.substring(cnda.indexOf('月') + 1);
        var info = {
            month: 'pre',
            day: pre_month_days - i,
            cnda: cnda,
            cnday: cnday
        };
        day_set[cur_index].push(info);
    }

    for (var i = 1; i <= cur_month_days; i++) {
        if (day_set[cur_index].length === 7) {
            cur_index++;
            day_set[cur_index] = [];
        }
        
        var cnda = cndate.GetLunarDay(dates.year, dates.month, i);
        var cnday = cnda.substring(cnda.indexOf('月') + 1);
        var info = {
            month: 'cur',
            day: i,
            cnda: cnda,
            cnday: cnday
        };

        if (i === dates.day) {
            info.now = 1;
        }
        day_set[cur_index].push(info);
    }

    //补全后几天
    for (var i = 1; i <= last_null; i++) {
        var cnda = cndate.GetLunarDay(nxt_year, nxt_month, i);
        var cnday = cnda.substring(cnda.indexOf('月')+1);
        var info = {
            month: 'nxt',
            day  : i,
            cnda: cnda,
            cnday: cnday
        };
        day_set[cur_index].push(info);
    }

    //填充位置
    return day_set;
}

module.exports = {
    init : init_date,
    gday : get_day,
    calendar: calendar
}