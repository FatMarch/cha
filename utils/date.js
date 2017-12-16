function init_date() {
    var date = new Date();
    var dates = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        week: date.getDay()
    }

    return dates;
}

function get_day(date) {
    var date = new Date(date);
    var day = date.getDate();

    return day;
}

function get_month_days(month) {
    var days = 0;
    switch (month) {
        case 1, 3, 5, 7, 8, 10, 12:
            days = 31;
            break;
        case 4, 6, 9, 11:
            days = 30;
            break;
        case 2:
            days = 28;
            if (this.is_run) {
                days = 29;
            }
            break;
        default:
            break;
    }

    return days;
}

function is_run(year) {
    if (year % 400 == 0) {
        return true;
    }

    if (year % 4 == 0 && year % 100 != 0) {
        return true;
    }

    return false;
}

function calendar() {
    var dates = init_date();

    //判断当前月1号和最后一天是星期几
    var cur = dates.year + '/' + dates.month + '/' + '01';
    var week = new Date(cur).getDay();
    var cur_month_days = get_month_days(dates.month);
    var last = dates.year + '/' + dates.month + '/' + cur_month_days;
    var last_week = new Date(last).getDay();
    var last_null = 6 - last_week;

    var pre_month = dates.month - 1 ? dates.month - 1 : 12;
    var pre_month_days = get_month_days(pre_month);
    
    //补全前几天
    var day_set = [];
    var cur_index = 0;
    day_set[cur_index] = [];
    for (var i = week - 1; i >= 0; i--) {
        //day_set[cur_index].push(pre_month_days - i);
        var info = {
            month: 'pre',
            day: pre_month_days - i
        };
        day_set[cur_index].push(info);
    }

    for (var i = 1; i <= cur_month_days; i++) {
        if (day_set[cur_index].length == 7) {
            cur_index++;
            day_set[cur_index] = [];
        }
       
        var info = {
            month: 'cur',
            day: i
        };

        if (i == dates.day) {
            info.now = 1;
            console.log(info)
        }
        day_set[cur_index].push(info);
    }

    //补全后几天
    for (var i = 1; i <= last_null; i++) {
        //day_set[cur_index].push(i);
        var info = {
            month: 'nxt',
            day  : i
        };
        day_set[cur_index].push(info);
    }
    console.log(day_set)
    
    //填充位置
    return day_set;
}

module.exports = {
    init: init_date,
    gday: get_day,
    calendar: calendar
}