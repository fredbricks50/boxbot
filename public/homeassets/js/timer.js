

function countdown_date(minutes) {
    let dt = new Date();
    return dt.setMinutes(dt.getMinutes() + minutes);
}

function stop_timer() {
    window.cancelAnimationFrame(animation_id);
    animation_id = null;
    counterstatus = 0;
    startcounting();
    $("#timer_loading").toggleClass("d-none");
    $("#timer_counter").toggleClass("d-none");
    getamount_earned();
}

function start_timer() {
	let dt = new Date();
	distance=dt.setMinutes(dt.getMinutes() + distance_minutes);
    process_timer(distance);
   

}

function process_timer(distance) {
    let dt = new Date();

    time_left = distance - new Date();
    if (time_left > 0)  {
        let seconds_left = Math.floor((time_left % (1000 * 60)) / 1000),
        minutes_left = Math.floor(time_left / (1000 * 60)),
        progress_pers = 1 - time_left / (60 * 1000 * distance_minutes);

        let timer_str = timer_string(minutes_left, seconds_left);
        let cur_seconds = dt.getSeconds(),
        cur_hours = dt.getHours();
        document.documentElement.style.setProperty('--timer-minutes-seconds', "'" + timer_str + "'");

        document.documentElement.style.setProperty('--inner_percent_deg', Math.round(100 * 100 * progress_pers) / 100 + "%");
        document.documentElement.style.setProperty('--outer_percent_deg', Math.round(100 * 100 * (1 - progress_pers)) / 100 + "%");
        document.documentElement.style.setProperty('--local_percent_val', "'" + Math.round(100 * progress_pers) + "%'");
        document.documentElement.style.setProperty('--global_percent_val', "'" + Math.round(100 * (1 - progress_pers)) + "%'");

        animation_id = window.requestAnimationFrame(function () {
  process_timer(distance);
});
    } else {
        stop_timer();
    }

}

function timer_string(minutes, seconds) {
    let str_minutes,
    str_seconds;
    if (minutes < 10) {
        str_minutes = `0${minutes}`
    } else {
        str_minutes = `${minutes}`
    }
    if (seconds < 10) {
        str_seconds = `0${seconds}`
    } else {
        str_seconds = `${seconds}`
    }
    return `${str_minutes}:${str_seconds}`
}