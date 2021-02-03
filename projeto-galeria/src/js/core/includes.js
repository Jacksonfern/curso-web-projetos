import $ from 'jquery';

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSuccessCallbacks.includes(callback))
        loadHtmlSuccessCallbacks.push(callback);
}

function loadComponents(parent = 'body'){
    $(parent).find('[wm-include]').each((i, e) => {
        const url = $(e).attr('wm-include');
        $.ajax(url, {
            success(html){
                $(e).html(html);
                $(e).removeAttr('wm-include');

                loadHtmlSuccessCallbacks.forEach(callback => callback(html));
                loadComponents(e);
            },
            error(code, text){
                console.log(text);
            }
        });
    });
}

loadComponents();