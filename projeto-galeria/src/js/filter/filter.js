import $ from 'jquery';

import { onLoadHtmlSuccess } from '../core/includes';

function filterByCity(city){
    $('[wm-city]').each((i, e) => {
        const value = $(e).attr('wm-city');
        if(value === city || city === null){
            $(e).parent().fadeIn(1000).removeClass('d-none');
        }
        else{
            $(e).parent().fadeOut(1000).addClass('d-none');
        }
    });
}

$.fn.filterButtons = function(){
    const cities = new Set();
    $('[wm-city]').each(function(i, e) {
        cities.add($(e).attr('wm-city'));
    });

    const btns = Array.from(cities).map(item => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(item);
        btn.click(() => {
            filterByCity(item);
            $('.active').removeClass("active");
            btn.addClass("active");
        });
        btn.html(item);
        return btn;
    });
    const all = $('<button>').addClass(['btn', 'btn-info', 'active']).html('todos');
    all.click(() => {
        filterByCity(null);
        $('.active').removeClass("active");
        all.addClass("active");
    });

    const btnGroup = $('<div>').addClass('btn-group');
    btnGroup.append([...btns, all]);

    $(this).html(btnGroup);
    return this;
}

onLoadHtmlSuccess(function(){
    $('[wm-filter-buttons]').filterButtons();
})