/**
*
*   jQueryUI Extra Widgets
*   https://github.com/foo123/jquery-ui-widgets
*
**//**
*
*   jQueryUI Extra Widgets
*   https://github.com/foo123/jquery-ui-widgets
*
**/
!function( jQuery, undef ) {
"use strict";

var $ = jQuery, jQueryUIExtra, $UI, HAS = 'hasOwnProperty';
jQueryUIExtra = (function(){
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
                if ( transitions[HAS](t) )
                {
                    if ( 'undefined' != typeof(el.style[t]) )
                    {
                        te = transitions[t];
                        break;
                    }
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
})();
$UI = jQueryUIExtra;

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


/** jquery.ui.checkbox **/
var CHECKBOX = 1, RADIO = 2, SWITCH = 4, PUSH = 8;

$.widget( $UI.NS("checkbox"), {
    
    _cbtype: null,
    _classes: null,
    _wrapper: null,
    
    _create: function( ) {
        var self=  this, el = self.element, name, type;
        
        type = 'radio' === el.attr('type') ? RADIO : CHECKBOX;
        if ( el.hasClass('ui-switch-button') ) type |= SWITCH;
        if ( el.hasClass('ui-push-button') ) type |= PUSH;
        self._cbtype = type;
        
        if ( !el.attr("id") ) el.attr( "id", $UI.UUID() );
        name = self._wID = el.attr( "id" );
            
        if ( SWITCH & type )
        {
            self._wrapper = el
                .wrap('<span />').parent( )
                .addClass("ui-switch")
                .append($('<label for="'+name+'" class="'+"ui-switch-off"+'">'+"OFF"+'</label><label for="'+name+'" class="'+"ui-switch-on"+'">'+"ON"+'</label><span class="'+"ui-switch-handle ui-state-default"+'"></span>'))
            ;
        }
        else
        {
            if ( RADIO & type ) self._classes = 'ui-radio';
            else self._classes = 'ui-checkbox';
            el.addClass( self._classes ).after($('<label for="'+name+'">&nbsp;</label>'));
        }
    },

    _destroy: function( ) {
        var self = this;
        if ( SWITCH & self._cbtype )
        {
            self.element.unwrap( );
            self._wrapper.remove( );
        }
        else
        {
            self.element.removeClass( self._classes ).next( ).remove( );
        }
        self._classes = null;
        self._wrapper = null;
    }
});

/** jquery.ui.disabable **/
$.widget( $UI.NS("disabable"), {
    
    options: { },
    
    _overlay: null,
    _isDisabled: false,
    
    _create: function() {
        var self = this;
        self.element.addClass('ui-disabable').append(self._overlay = $('<div />').addClass('ui-disabable-overlay'));
    },

    enableIt: function() {
        var self = this;
        if ( self._isDisabled )
        {
            self.element.removeClass('ui-disabled').addClass('ui-enabled');
            self._isDisabled = false;
            /*self._overlay.animate(self._getEnabledStyles(), o.duration, o.easing, function(e){
                self._overlay.css({display: 'none'});
                self._trigger('oncomplete', e, { state: self._isDisabled=false});
            });*/
        }
    },
    
    disableIt: function( ) {
        var self = this;
        if ( !self._isDisabled )
        {
            self.element.removeClass('ui-enabled').addClass('ui-disabled');
            self._isDisabled = true;
            /*self._overlay.animate(self._getDisabledStyles(), o.duration, o.easing, function(e){
                self._trigger('oncomplete', e, { state: self._isDisabled=true});
            });*/
        }
    },
    
    toggle: function( ) {
        var self = this;
        if ( self._isDisabled ) self.enableIt( );
        else self.disableIt( );
    },
    
    _destroy: function() {
        var self = this;
        self._overlay.remove( );
        self._overlay = null;
        self.element.removeClass('ui-disabable');
    }
});

/** jquery.ui.delayable **/
$.widget( $UI.NS("delayable"), {
    
    options: {},
    
    _overlay: null,
    _isVisible: false,
    
    _create: function() {
        var self = this, el = self.element;
        el.addClass('ui-delayable').append( 
            self._overlay=$('<div />').addClass("ui-delayable-overlay")
            .append(
                $('<div />').addClass("ui-spinner").transferClasses( 'ui-spinner-', el)
            ) 
        );
    },

    enableIt: function() {
        var self = this;
        if ( !self._isVisible )
        {
            self.element.removeClass('ui-undelayed').addClass('ui-delayed');
            self._overlay.children('.ui-spinner').addClass('active');
            self._isVisible = true;
        }
    },
    
    disableIt: function() {
        var self = this;
        if ( self._isVisible )
        {
            self.element.removeClass('ui-delayed').addClass('ui-undelayed');
            self._overlay.children('.ui-spinner').removeClass('active');
            self._isVisible = false;
        }
    },
    
    toggle: function( ) {
        var self = this;
        if ( self._isVisible ) self.disableIt( );
        else self.enableIt( );
    },
    
    _destroy: function() {
        var self = this;
        self._overlay.remove( );
        self._overlay = null;
        self.element.removeClass('ui-delayable');
    }
});

/** jquery.ui.morphable **/
var
    // http://davidwalsh.name/add-rules-stylesheets
    addCSSRule = function( style, selector, rules, index ) {
        if ( "insertRule" in style.sheet ) 
        {
            style.sheet.insertRule( selector + "{" + rules + "}", index );
            return style.sheet.cssRules[ index ];
        }
        else if ( "addRule" in style.sheet ) 
        {
            style.sheet.addRule( selector, rules, index );
            return style.sheet.rules[ index ];
        }
    },
    
    addCSS = function( style, css ) {
        if ( "object" === typeof css )
        {
            var n, declaration, i = 0;
            for (n in css)
            {
                if ( css[HAS](n) )
                {
                    declaration = css[ n ];
                    declaration.css = addCSSRule( style, declaration.selector, [].concat(declaration.rules).join('; '), i++ );
                }
            }
        }
        return css;
    },
    
    /*getCSS = function( style ) {
        var css = [], sheet = style.sheet, i,
            rules = sheet.cssRules ? sheet.cssRules : sheet.rules;
        for (i=0; i<rules.length; i++) css.push(rules[i].cssText ? rules[i].cssText : rules.style.cssText);
        return css.join("\n");
    },*/
    
    createStyleSheet = function( media, css ) {
        // Create the <style> tag
        var style = document.createElement("style");
        // Add a media (and/or media query) here if you'd like!
        style.setAttribute("media", media || "all");
        style.setAttribute("type", "text/css");
        // WebKit hack :(
        style.appendChild( document.createTextNode("") );
        // Add the <style> element to the page
        document.head.appendChild( style );
        if ( css ) addCSS( style, css );
        return style;
    },
    
    disposeStyleSheet = function( style ) {
        if ( style ) document.head.removeChild( style );
    }
;
    
$.widget( $UI.NS("morphable"), {
    
    options: {
        useStyleSheet: true
        //,selector: false
        ,modes: []
        ,modeClass: 'mode-${MODE}'
        ,showClass: 'show-if-${MODE}'
        ,hideClass: 'hide-if-${MODE}'
    },
    
    _styleSheet: null,
    _cssStyles: null,
    
    _create: function() {
        var self = this, o = self.options, el = self.element, i, j,
            cssStyles = {}, hideSelector, showSelector, mainSelector,
            has_show_class = o[HAS]('showClass') && o.showClass, has_hide_class = o[HAS]('hideClass') && o.hideClass,
            modes = [].concat(o.modes || []);
        
        if ( !el.attr("id") ) el.attr( "id", $UI.UUID() );
        if ( !el.hasClass('ui-morphable') ) el.addClass('ui-morphable');
        mainSelector = '#' + el.attr( "id" ) + '.ui-morphable';
        hideSelector = []; showSelector = [];
        for(i=0; i<modes.length; i++)
        {
            if ( has_hide_class )
            {
                hideSelector.push(
                    mainSelector + '.' + o.modeClass.split('${MODE}').join(modes[i]) + ' .' + o.hideClass.split('${MODE}').join(modes[i])
                );
            }
            if ( has_show_class )
            {
                showSelector.push(
                    mainSelector + '.' + o.modeClass.split('${MODE}').join(modes[i]) + ' .' + o.showClass.split('${MODE}').join(modes[i])
                );
            }
            if ( has_show_class || has_hide_class )
            {
                for (j=0; j<modes.length; j++)
                {
                    if ( j === i ) continue;
                    if ( has_show_class )
                    {
                        hideSelector.push(
                            mainSelector + '.' + o.modeClass.split('${MODE}').join(modes[i]) + ' .' + o.showClass.split('${MODE}').join(modes[j]) + ':not(.' + o.showClass.split('${MODE}').join(modes[i]) + ')'
                        );
                    }
                    if ( has_hide_class )
                    {
                        showSelector.push(
                            mainSelector + '.' + o.modeClass.split('${MODE}').join(modes[i]) + ' .' + o.hideClass.split('${MODE}').join(modes[j]) + ':not(.' + o.hideClass.split('${MODE}').join(modes[i]) + ')'
                        );
                    }
                }
            }
        }
        if ( hideSelector.length )
        {
            cssStyles.hide_mode = {
                selector: hideSelector.join(','),
                rules: [
                    'display: none !important'
                ]
            }
        }
        if ( showSelector.length )
        {
            cssStyles.show_mode = {
                selector: showSelector.join(','),
                rules: [
                    'display: block'
                ]
            }
        }
        self._styleSheet = createStyleSheet( 'all', self._cssStyles = cssStyles );
    },

    _destroy: function() {
        var self = this;
        self.element.removeClass('ui-morphable');
        self._cssStyles = null;
        disposeStyleSheet( self._styleSheet );
        self._styleSheet = null;
    }
});

/** jquery.ui.removable **/
$.widget( $UI.NS("removable"), {
    
    options: {
        classes: {
            wrapper: "ui-removable-wrapper",
            handle: "ui-removable-remove"
        },
        icon: null,
        effect: "fadeOut",
        duration: 400,
        easing: 'linear',
        wrap: false,
        autoremove: true,
        onremove: null
    },
    
    _wrapper: null,
    _handle: null,
    
    _create: function() {
        var self = this, o = self.options;
        
        self.element.addClass('ui-removable');
        if ( o.wrap )
            self._wrapper = self.element.wrap('<div />').parent().addClass( o.classes.wrapper );
        else
            self._wrapper = self.element.addClass( o.classes.wrapper );
        
        self._handle = $('<button />').addClass( o.classes.handle );
        
        if ( o.icon )
            self._handle.addClass(['ui-icon', o.icon].join(' '));
        
        self._wrapper.append( self._handle );
        
        self._on(self._handle, {
            'click' : '_removeItHandler'
        });
    },

    _removeItHandler: function(event) {
        event.preventDefault();
        this._removeIt( event );
    },
    
    _removeIt: function( event ) {
        var self = this, o = self.options;
        self._wrapper.fadeOut(o.duration, o.easing, function(){
            if ( o.autoremove )
                self._wrapper.remove();
            self._trigger('onremove', event||null, { target: self.element } );
        });
    },
    
    remove: function() {
        this._removeIt();
    },
    
    _destroy: function() {
        var self = this;
        self._off(self._handle, 'click');
        self._handle.remove();
        if ( self.options.wrap )
        {
            self.element.unwrap();
            self._wrapper.remove();
        }
        self.element.removeClass('ui-removable');
    }
});

/** jquery.ui.dropdown **/
$.widget( $UI.NS("dropdown"), {
    
    options: {
        classes: {
            wrapper: "ui-dropdown ui-widget ui-state-default",
            select: "ui-dropdown-select ui-state-default",
            replaced: "ui-dropdown-select-replaced",
            replace: "ui-dropdown-select-replace",
            open: "ui-dropdown-select-open",
            closed: "ui-dropdown-select-closed"
        },
        replace: false,
        onselect: null
    },
    
    _list: null,
    
    _create: function() {
        var self = this, el = self.element, o = self.options, list;

        el.addClass(o.classes.select).wrap("<span />").parent().addClass(o.classes.wrapper);
        if ( o.replace )
        {
            self._list = list = self._replace( el );
            el.after( list );
            el.addClass( o.classes.replaced );
            self._bindHandlers();
        }
    },

    value: function(v) {
        return this.element.val(v);
    },
    
    _replace: function(el) {
        var self = this, o = self.options;
        var list = $('<ul />').addClass(o.classes.replace);
        el.find('option').each(function(){
            var opt = $(this);
            list.append($('<li />').html(opt.html()).addClass(opt.attr('class')));
        });
        return list;
    },
    
    _bindHandlers: function() {
        this._on(this.element, {
            'focus' : '_handleSelect',
            'mousedown' : '_handleSelect'
        });
        this._on(this._list.children('li'), {
            'click' : '_handleSelect2'
        });
    },
    
    _handleSelect: function(event) {
        if (event.stopPropagation)
            event.stopPropagation();            
        event.preventDefault();
        this.element[0].blur();
        window.focus();
        this._list.removeClass( this.options.classes.closed ).addClass( this.options.classes.open );
        return false;
    },
    
    _handleSelect2: function(event) {
        event.preventDefault();
        var self = this, el = self.element, list = self._list, 
            index = list.children('li').index(event.target)
        ;
        setTimeout(function(){
            el.prop('selectedIndex', index);
            list.removeClass( self.options.classes.open ).addClass( self.options.classes.closed );
            self._trigger('onselect', event, {index: index, key: el.val()});
        }, 60);
        return false;
    },
    
    _destroy: function() {
        var self = this, el = self.element, o = self.options;
        var wrapper = el.parent();
        el.unwrap().removeClass([o.classes.select, o.classes.replaced].join(' '));
        if ( o.replace )
        {
            self._off(el, 'mousedown');
            self._off(el, 'focus');
            self._list.remove();
            self._list = null;
        }
        wrapper.remove();
    }
});

/** jquery.ui.dropdown_menu **/
$.widget( $UI.NS("dropdown_menu"), {
    
    options: {
        wrap: false
    },
    
    _create: function() {
        var self = this, el = self.element, o = self.options, list;

        if ( o.wrap )
            el.wrap("<div />").parent( ).addClass("ui-dropdown-menu");
        else
            el.addClass("ui-dropdown-menu");
        
        el.find('li li').each(function(){
            var $li = $(this);
            if ( $li.children('ul').length )
                $li.addClass('ui-dropdown-submenu');
        });
    },

    _destroy: function() {
        var self = this, el = self.element;
        if ( self.options.wrap )
        {
            var wrapper = el.parent( );
            el.unwrap( );
            wrapper.remove( );
        }
        else
        {
            el.removeClass("ui-dropdown-menu");
        }
    }
});

/** jquery.ui.tooltip2 **/
function tooltipContent( ) 
{
    var el = $( this );
    if ( el.is( "[data-reftooltip]" ) ) 
    {
        return $( el.data( "reftooltip" ) ).html();
    }
    else if ( el.is( "[data-tooltip]" ) ) 
    {
        return el.data( "tooltip" );
    }
    else //if ( el.is( "[title]" ) ) 
    {
        return el.attr( "title" );
    }
}

function tooltipPosition( type ) 
{
    switch(type)
    {
        case 'top': 
            return {
                my: "center bottom-15",
                at: "center top",
                using: function( position, feedback ) {
                    $( this ).css( position ).css({'z-index': 2000});
                    $( "<div>" )
                    .addClass( "tip-arrow tip-arrow-bottom" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            };
        case 'bottom':
            return {
                my: "center top+15",
                at: "center bottom",
                using: function( position, feedback ) {
                    $( this ).css( position ).css({'z-index': 2000});
                    $( "<div>" )
                    .addClass( "tip-arrow tip-arrow-top" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            };
        case 'left':
            return {
                my: "right-15 center",
                at: "left center",
                using: function( position, feedback ) {
                    $( this ).css( position ).css({'z-index': 2000});
                    $( "<div>" )
                    .addClass( "tip-arrow tip-arrow-right" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            };
        case 'right':
        default:
            return {
                my: "left+15 left",
                at: "right center",
                using: function( position, feedback ) {
                    $( this ).css( position ).css({'z-index': 2000});
                    $( "<div>" )
                    .addClass( "tip-arrow tip-arrow-left" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            };
    }
}

$.widget( $UI.NS("tooltip2"), $.ui.tooltip, {
    
    _create: function( ) {
        var self = this, el = self.element, o = self.options, selectors = "[data-tooltip],[data-reftooltip],[title]";

        o.items = selectors;
        o.content = tooltipContent;
        if ( el.hasClass('has-tooltip-top') )
            o.position = tooltipPosition('top');
        else if ( el.hasClass('has-tooltip-bottom') )
            o.position = tooltipPosition('bottom');
        else if ( el.hasClass('has-tooltip-left') )
            o.position = tooltipPosition('left');
        else /*if ( el.hasClass('has-tooltip-right') )*/
            o.position = tooltipPosition('right');
        self._super( );
    }
});

/** jquery.ui.uploadable **/
$.widget( $UI.NS("uploadable"), {
    
    options: {
        classes: {
            button: "ui-button-xlarge",
            icon: "ui-icon-folder-open",
        },
        text: "Load File",
        fileType: "image",
        onload: null
    },
    
    _button: null,
    
    _create: function() {
        var self = this, el = self.element, o = self.options;

        el.addClass('ui-uploadable').css({position: "absolute", display: "none"});
        
        var button = self._button = $('<button></button>')
                                        .addClass( o.classes.button )
                                        .button({
                                            icons: {
                                                primary: o.classes.icon
                                            },
                                            label: el.attr('title') || el.data('title') || el.data('value') || o.text,
                                            text: !!(el.attr('title') || el.data('title') || el.data('value') || o.text)
                                        })
                                    ;
        self._on( el, {
        "change": function( event ) {
            //event.preventDefault();
            self._handleUpload(event);
        }});            
        self._on( button, {
        "click": function( event ) {
            event.preventDefault();
            el.trigger('click');
        }});            
        
        el.after(button);
    },

    _handleUpload: function(event) {
        var self = this, o = self.options;
        var file = event.target.files[0] || null; //FileList object
        
        if ( !file || !file.type.match(o.fileType) )   return false;
        
        var fileReader = new FileReader();
        
        fileReader.addEventListener("load", function(event){
            self._trigger('onload', event, { data: event.target.result });
        });
        
         //Read the file
        fileReader.readAsDataURL( file );
    },
    
    _destroy: function() {
        var self = this;
        self._off( self._button, "click");            
        self._button.remove().destroy();
        self._off( self.element.removeClass('ui-uploadable').css({position: 'relative', display: 'inline'}), "change");            
    }
});

/** jquery.ui.scrollable **/
var DIRECTION = { 
    "left": 1,
    "right": -1,
    "up": 2,
    "down": -2
}, Max = Math.max;

$.widget( $UI.NS("scrollable"), {
    
    options: {
        classes: {
            wrapper: "ui-scrollable",
            scroll: "ui-scrollable-pane",
            item: "ui-scrollable-item"
        },
        //autoscroll: 0,
        onscrollend: null,
        direction: "left",
        easing: "linear",
        duration: 400,
        scrollby: 2,
        controls: {
            next: null,
            prev: null
        }
    },
    
    _current: null,
    _onEdge: false,
    _wrapper: null,
    _items: null,
    _nItems: 0,
    _dir: 1,
    _width: 0,
    _height: 0,
    
    _create: function() {
        var self = this, el, items, wrapper, o = self.options;
        
        el = self.element.addClass( o.classes.wrapper );
        if ( !el.children().length )
        {
            self._wrapper = $('<div />')
                            .addClass( o.classes.scroll )
                            .addClass( o.classes.scroll+"-"+o.direction )
                            .appendTo( el )
                        ;
        }
        else
        {
            items = el.children()
                    .each(function(){
                        $(this).wrap('<div />')
                                .parent()
                                .addClass( o.classes.item );
                    });
            self._wrapper = items.wrapAll('<div />')
                            .parent()
                            .addClass( o.classes.scroll )
                            .addClass( o.classes.scroll+"-"+o.direction )
                        ;
        }
        self._current = 0;
        self.update();
        
        /*    
        var doNext = function() {
            if ( self._onEdge )
                self._dir = - self._dir;
            self.next();
            setTimeout(doNext, 1000);
        };
        setTimeout(doNext, 1000);
        */
        
        if ( o.controls )
        {
            if ( o.controls.next )
                self._on(o.controls.next, {
                    "click" : "next"
                });
            if ( o.controls.prev )
                self._on(o.controls.prev, {
                    "click" : "prev"
                });
        }
    },
    
    addItem: function(item) {
        var self = this, el = item.wrap( '<div />' ).parent( ).addClass( self.options.classes.item );
        self._wrapper.append( el );
        self.update( );
        return el;
    },
    
    removeItem: function(item) {
        var self = this;
        if ( undef !== item )
        {
            if ( item.jquery )
                self._wrapper.find( item.parent() ).remove( );
            else
                self._wrapper.children( ).eq( item ).remove( );
            self.update( );
        }
    },
    
    update: function() {
        var self = this, o = self.options, d, n;
        d = self._dir = DIRECTION[o.direction] || 1;
        self._items = self._wrapper.children();
        n = self._nItems = self._items.length;
        
        if ( 2 == d || -2 == d )
        {
            self._height = n*100;
            self._wrapper.css({height: self._height+'%'});
        }
        else
        {
            self._width = n*100;
            self._wrapper.css({width: self._width+'%'});
        }
        
        if (self._current > n)
        {
            self._current = Max(0, n -1 - o.scrollby);
            self.scrollTo( self._current );
        }
    },
    
    next: function() {
        var self = this;
        if ( self._dir > 0 && self._current < self._nItems )
        {
            self._current += self.options.scrollby;
            self.scrollTo( self._current );
        }
        else if ( self._dir < 0 && self._current > 0 )
        {
            self._current -= self.options.scrollby;
            self.scrollTo( self._current );
        }
    },
    
    prev: function() {
        var self = this;
        if ( self._dir > 0 && self._current > 0 )
        {
            self._current -= self.options.scrollby;
            self.scrollTo( self._current );
        }
        else if ( self._dir < 0 && self._current < self._nItems )
        {
            self._current += self.options.scrollby;
            self.scrollTo( self._current );
        }
    },
    
    scrollTo: function(item) {
        var self = this, d = self._dir, n = self._nItems, index = item, p, o = self.options;
        
        // adapted from jquerytools scrollable, jquery slideshowlite
        
        self._onEdge = false;
        if (index.jquery)
            index = self._items.index( item );   
            
        else
            item = self._items.eq( index );
        
        if ( !item.length || index >= n )
        {
            self._onEdge = true;
            return;
        }
        
        if ( 1 == d || -1 == d )
        {
            p = { left: -d*item.position().left };  
            self._wrapper.animate(p, o.duration, o.easing, function(e) { 
                self._trigger("onscrollend", e);        
            });  
        }
        else if ( 2 == d || -2 == d )
        {
            p = { top: (d<0 ? 1: -1)*item.position().top };  
            self._wrapper.animate(p, o.duration, o.easing, function(e) { 
                self._trigger("onscrollend", e);        
            });  
        }
    },
    
    _destroy: function() {
        var self = this, o = self.options;
        
        if ( o.controls )
        {
            if ( o.controls.next )
                self._off(o.controls.next, "click");
            if ( o.controls.prev )
                self._off(o.controls.prev, "click");
        }
        self.element.removeClass( o.classes.wrapper );
        self._wrapper.children('.'+o.classes.item).unwrap();
        self._wrapper.remove();
    }
});

}(jQuery);


