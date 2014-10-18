/**
*
*   jQueryUI Extra Widgets
*   https://github.com/foo123/jquery-ui-widgets
*
**/
!function( $ ) {

"use strict";

function esc_re( s ) { return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); }

$.fn.transferClasses = function( prefix, el ) {
    if ( 2 <= arguments.length )
    {
        
        var $el = $(el), classes1 = $el[0].className.split(/\s+/g), 
            classes2, re_prefix, i;
            
        if ( classes1.length )
        {
            re_prefix = new RegExp('^' + esc_re( prefix ), '');
            classes2 = [];
            for (i=classes1.length-1; i>=0; i--)
            {
                if ( classes1[i].match( re_prefix ) )
                {
                    classes2.push( classes1[i] );
                    classes1.splice( i, 1 );
                }
            }
            if ( classes2.length )
            {
                $el.attr( 'class', classes1.join(' ') );
                classes2 = classes2.join(' ');
                this.addClass( classes2 );
            }
        }
    }
    return this;
};

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

