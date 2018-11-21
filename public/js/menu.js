$(function() {
    $('.arrow').click(function(e) {
        e.preventDefault();
    });
    function handle1(ele) {
        const sub = $(ele).find('.mdl-subnavigation');
        $(ele).find('.arrow').text('arrow_drop_down').css({'top': '12%'});
        sub.show(1000);
    }
    function handle2(ele) {
        const sub = $(ele).find('.mdl-subnavigation');
        $(ele).find('.arrow').text('arrow_right').removeAttr('style');
        sub.hide(1000);
    }
    const func = [handle1, handle2];
    $('span.item-container').click(function(e) {
        e.preventDefault();
        func.reverse()[1](this);
    });
});
