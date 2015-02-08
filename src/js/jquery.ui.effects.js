
/** effects **/
$.fn.slideFadeDown = function(speed, easing, callback) {
    var complete = function() {
            if ($.isFunction(callback)) { callback.call(this); }
        };
        
    return this.each(function(){$(this).stop(true).animate({opacity: 'show', height: 'show'}, speed, easing || 'linear', complete );
    });
};

$.fn.slideFadeUp = function(speed, easing, callback) {
    var complete = function() {
            if ($.isFunction(callback)) { callback.call(this); }
        };
        
    return this.each(function(){
        if ($(this).is(':hidden'))
            $(this).hide(); // makes element not lose height if already hidden (eg by parent element)
        else
        {
            $(this).stop(true).animate({opacity: 'hide', height: 'hide'}, speed, easing || 'linear', complete);
        }
    });
};
