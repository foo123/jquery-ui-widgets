/**
*
*   jQueryUI Extra Widgets
*   https://github.com/foo123/jquery-ui-widgets
*
**/
!function( jQuery ) {

"use strict";

var jQueryUIExtra = function() {
    var NAMESPACE = "uiExtra", 
        
        NS = function(s) { return NAMESPACE + "." + s; },
        
        _UUID = 0,
        
        UUID = function( NS ) {
            return [NS||'UI', ++_UUID, new Date().getTime()].join('_');
        },
        
        whichTransitionEvent = function() {
            var t, te = null,
                el = document.createElement('div'),
                transitions = {
                    'transition'        :'transitionend',
                    'msTransition'      :'MSTransitionEnd',
                    'OTransition'       :'oTransitionEnd',
                    'MozTransition'     :'transitionend',
                    'WebkitTransition'  :'webkitTransitionEnd'
                }
            ;

            for (t in transitions)
            {
                if ( 'undefined' != typeof(el.style[t]) )
                {
                    te = transitions[t];
                    break;
                }
            }
            return te;
        }
    ;
    
    return {
        NS: NS,
        UUID: UUID,
        transitionEvent: whichTransitionEvent()
    };
}();

