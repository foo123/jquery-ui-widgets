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
!function( jQuery ) {

"use strict";

var jQueryUIExtra = function() {
    var NAMESPACE = "uiExtra", 
        
        NS = function(s) { return NAMESPACE + "." + s; },
        
        whichTransitionEvent = function() {
            var t, te = null,
                el = document.createElement('div'),
                transitions = {
                    'transition'        :'transitionend',
                    'msTransition'      : 'MSTransitionEnd',
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
        transitionEvent: whichTransitionEvent()
    };
}();

!function($, undef) {
    
    /* effects */
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
}(jQuery);!function($, $UI, undef) {

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
            var el = this.element, o = this.options, list;

            el.addClass(o.classes.select).wrap("<span />").parent().addClass(o.classes.wrapper);
            if ( o.replace )
            {
                this._list = list = this._replace( el );
                el.after( list );
                el.addClass( o.classes.replaced );
                this._bindHandlers();
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
            var o = this.options;
            var wrapper = this.element.parent();
            this.element.unwrap().removeClass([o.classes.select, o.classes.replaced].join(' '));
            if ( o.replace )
            {
                this._off(this.element, 'mousedown');
                this._off(this.element, 'focus');
                this._list.remove();
            }
            wrapper.remove();
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

    $.widget( $UI.NS("dropdown_menu"), {
        
        options: {
            wrap: false
        },
        
        _create: function() {
            var el = this.element, o = this.options, list;

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
            if ( this.options.wrap )
            {
                var wrapper = this.element.parent( );
                this.element.unwrap( );
                wrapper.remove( );
            }
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

    $.widget( $UI.NS("radio"), {
        
        options: {
            classes: {
                radio: "ui-radio",
                label: "ui-radio"
            }
        },
        
        _create: function() {
            var el = this.element, o = this.options;

            el.addClass(o.classes.radio).after('<label for="'+el.attr('id')+'" class="'+o.classes.label+'">&nbsp;</label>');
        },

        _destroy: function() {
            var o = this.options;

            this.element.removeClass(o.classes.radio).next().remove();
        }
    });
    
    $.widget( $UI.NS("checkbox"), {
        
        options: {
            classes: {
                checkbox: "ui-checkbox",
                label: "ui-checkbox"
            }
        },
        
        _create: function() {
            var el = this.element, o = this.options;

            el.addClass(o.classes.checkbox).after('<label for="'+el.attr('id')+'" class="'+o.classes.label+'">&nbsp;</label>');
        },

        _destroy: function() {
            var o = this.options;

            this.element.removeClass(o.classes.checkbox).next().remove();
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

    $.widget( $UI.NS("switcher"), {
        
        options: {
            labels: {
                ON: "ON",
                OFF: "OFF"
            },
            classes: {
                wrapper: "ui-switch",
                state: "ui-switch-state",
                ON: "ui-switch-on",
                OFF: "ui-switch-off",
                handle: "ui-switch-handle ui-state-default"
            }
            //,onchange: null
        },
        
        _state: null,
        _isON: false,
        
        _create: function() {
            var wrapper, state, labels, name, o = this.options;
            
            state = this._state = this.element;
            state.addClass(o.classes.state).attr('value', '1');
            name = this._wID = state.attr( "id" );
            this._isON = state.is(':checked');
            
            wrapper = this.element = this.element.wrap('<span />').parent().addClass(o.classes.wrapper);
            
            labels = $('<label for="'+name+'" class="'+o.classes.OFF+'">'+o.labels.OFF+'</label><label for="'+name+'" class="'+o.classes.ON+'">'+o.labels.ON+'</label><span class="'+o.classes.handle+'"></span>');
            wrapper.append(labels);
            
            this._bindHandlers();
        },
        
        _handleChange: function(event) {
            if ( !event.isDefaultPrevented() ) 
            {
                var state = this._isON = !!this._state.is(':checked');
                //this._trigger('onchange', event, { state: state});
            }
        },
        
        _bindHandlers: function() {
            this._on( this._state, {
                "change": "_handleChange"
            });
        },
        
        val: function(v) {
            if ( 'undefined' == typeof(v) )
            {
                return this._isON;
            }
            else
            {
                if (v) 
                {
                    this._state.attr('checked', true);
                    this._isON = true;
                }
                else  
                {
                    this._state.removeAttr('checked');
                    this._isON = false;
                }
            }
        },
        
        toggle: function() {
            this._state.trigger('click');
        },

        _destroy: function() {
            this._off( this._state, "change");
            this._state.unwrap();
            this.element.remove();
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

    $.widget( $UI.NS("disabable"), {
        
        options: {
            classes: {
                overlay: "ui-disabable"
            },
            duration: 400,
            easing: 'linear',
            oncomplete: null
        },
        
        _overlay: null,
        _isDisabled: false,
        
        _create: function() {
            var o = this.options;
            this._overlay = $('<div />').addClass(o.classes.overlay).css(this._getStyles());
            this.element.append(this._overlay);
        },

        enableIt: function() {
            var self = this, o = self.options;
            if ( self._isDisabled )
            {
                self._overlay.animate(self._getEnabledStyles(), o.duration, o.easing, function(e){
                    self._overlay.css({display: 'none'});
                    self._trigger('oncomplete', e, { state: self._isDisabled=false});
                });
            }
        },
        
        disableIt: function() {
            var self = this, o = self.options;
            if ( !self._isDisabled )
            {
                self._overlay.css({display: 'block'});
                self._overlay.animate(self._getDisabledStyles(), o.duration, o.easing, function(e){
                    self._trigger('oncomplete', e, { state: self._isDisabled=true});
                });
            }
        },
        
        _getStyles: function() {
            return {
                position: 'absolute',
                padding: 0,
                margin: 0,
                top: 0,
                left: 0,
                display: 'none',
                width: '100%',
                height: '100%',
                opacity: 0
            };
        },
        
        _getEnabledStyles: function() {
            return {
                opacity: 0
            };
        },
        
        _getDisabledStyles: function() {
            return {
                opacity: 1
            };
        },
        
        _destroy: function() {
            this._overlay.remove();
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

    $.widget( $UI.NS("delayable"), {
        
        options: {
            classes: {
                overlay: "ui-delayable"
            }
        },
        
        _overlay: null,
        _isVisible: false,
        
        _create: function() {
            var o = this.options;
            this._overlay = $('<div />').addClass(o.classes.overlay).css(this._getStyles());
            this.element.append(this._overlay);
        },

        enableIt: function() {
            var self = this, o = self.options;
            if ( !self._isVisible )
            {
                self._overlay.css({display: 'block'});
                self._isVisible = true;
            }
        },
        
        disableIt: function() {
            var self = this, o = self.options;
            if ( self._isVisible )
            {
                self._overlay.css({display: 'none'});
                self._isVisible = false;
            }
        },
        
        _getStyles: function() {
            return {
                position: 'absolute',
                padding: 0,
                margin: 0,
                top: 0,
                left: 0,
                display: 'none',
                width: '100%',
                height: '100%'
            };
        },
        
        _destroy: function() {
            this._overlay.remove();
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

    $.widget( $UI.NS("removable"), {
        
        options: {
            classes: {
                wrapper: "ui-removable",
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
            var o = this.options;
            
            if ( o.wrap )
                this._wrapper = this.element.wrap('<div />').parent().addClass( o.classes.wrapper );
            else
                this._wrapper = this.element.addClass( o.classes.wrapper );
            
            this._handle = $('<button />').addClass( o.classes.handle );
            
            if ( o.icon )
                this._handle.addClass(['ui-icon', o.icon].join(' '));
            
            this._wrapper.append( this._handle );
            
            this._on(this._handle, {
                'click' : '_removeItHandler'
            });
        },

        _removeItHandler: function(event) {
            event.preventDefault();
            this._removeIt( event );
        },
        
        _removeIt: function( event ) {
            var self = this, o = self.options;
            this._wrapper.fadeOut(o.duration, o.easing, function(){
                if ( o.autoremove )
                    self._wrapper.remove();
                self._trigger('onremove', event||null, { target: self.element } );
            });
        },
        
        remove: function() {
            this._removeIt();
        },
        
        _destroy: function() {
            this._off(this._handle, 'click');
            this._handle.remove();
            if ( this.options.wrap )
            {
                this.element.unwrap();
                this._wrapper.remove();
            }
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

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
            var el = this.element, o = this.options, self = this;

            el.css({position: "absolute", display: "none"});
            
            var button = this._button = $('<button></button>')
                                            .addClass( o.classes.button )
                                            .button({
                                                icons: {
                                                    primary: o.classes.icon
                                                },
                                                label: el.attr('title') || el.data('title') || el.data('value') || o.text,
                                                text: !!(el.attr('title') || el.data('title') || el.data('value') || o.text)
                                            })
                                        ;
            this._on( el, {
            "change": function( event ) {
                //event.preventDefault();
                self._handleUpload(event);
            }});            
            this._on( button, {
            "click": function( event ) {
                event.preventDefault();
                el.trigger('click');
            }});            
            
            el.after(button);
        },

        _handleUpload: function(event) {
            var o = this.options, self = this;
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
            this._off( this._button, "click");            
            this._button.remove().destroy();
            this._off( this.element.css({position: 'relative', display: 'inline'}), "change");            
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

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
            var self = this, el, items, wrapper, o = this.options;
            
            el = this.element.addClass( o.classes.wrapper );
            if ( !el.children().length )
            {
                this._wrapper = $('<div />')
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
                this._wrapper = items.wrapAll('<div />')
                                .parent()
                                .addClass( o.classes.scroll )
                                .addClass( o.classes.scroll+"-"+o.direction )
                            ;
            }
            this._current = 0;
            this.update();
            
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
                    this._on(o.controls.next, {
                        "click" : "next"
                    });
                if ( o.controls.prev )
                    this._on(o.controls.prev, {
                        "click" : "prev"
                    });
            }
        },
        
        addItem: function(item) {
            var el = item.wrap( '<div />' ).parent( ).addClass( this.options.classes.item );
            this._wrapper.append( el );
            this.update( );
            return el;
        },
        
        removeItem: function(item) {
            if ( undef !== item )
            {
                if ( item.jquery )
                    this._wrapper.find( item.parent() ).remove( );
                else
                    this._wrapper.children( ).eq( item ).remove( );
                this.update( );
            }
        },
        
        update: function() {
            var o = this.options, d, n;
            d = this._dir = DIRECTION[o.direction] || 1;
            this._items = this._wrapper.children();
            n = this._nItems = this._items.length;
            
            if ( 2 == d || -2 == d )
            {
                this._height = n*100;
                this._wrapper.css({height: this._height+'%'});
            }
            else
            {
                this._width = n*100;
                this._wrapper.css({width: this._width+'%'});
            }
            
            if (this._current > n)
            {
                this._current = Max(0, n -1 - o.scrollby);
                this.scrollTo( this._current );
            }
        },
        
        next: function() {
            if ( this._dir > 0 && this._current < this._nItems )
            {
                this._current += this.options.scrollby;
                this.scrollTo( this._current );
            }
            else if ( this._dir < 0 && this._current > 0 )
            {
                this._current -= this.options.scrollby;
                this.scrollTo( this._current );
            }
        },
        
        prev: function() {
            if ( this._dir > 0 && this._current > 0 )
            {
                this._current -= this.options.scrollby;
                this.scrollTo( this._current );
            }
            else if ( this._dir < 0 && this._current < this._nItems )
            {
                this._current += this.options.scrollby;
                this.scrollTo( this._current );
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
            var o = this.options;
            
            if ( o.controls )
            {
                if ( o.controls.next )
                    this._off(o.controls.next, "click");
                if ( o.controls.prev )
                    this._off(o.controls.prev, "click");
            }
            this.element.removeClass( o.classes.wrapper );
            this._wrapper.children('.'+o.classes.item).unwrap();
            this._wrapper.remove();
        }
    });

}(jQuery, jQueryUIExtra);!function($, $UI, undef) {

     $.widget( $UI.NS("panel"), {
        options: {
            classes: {
                panel: "ui-panel ui-widget",
                open: "ui-panel-open",
                closed: "ui-panel-closed",
                inner: "ui-panel-inner ui-widget-content",
                overlay: "ui-panel-overlay",
                header: "ui-panel-header ui-widget-header",
                icon: null,
                animate: "ui-panel-animate",
                _headerClass: "panel-header",
                _innerClass: "panel-inner"
            },
            //fx: null,
            easingOpen: 'easeInQuint',
            easingClose: 'easeInQuint',
            durationOpen: 'fast',
            durationClose: 'fast',
            collapsible: true,
            animate: true,
            animateWithCSS: false,
            theme: null
        },

        _panelID: null,
        _toggleLink: null,
        _panelHeader: null,
        _panelInner: null,
        // state storage of open or closed
        _open: true,

        _create: function() {
            var el = this.element, o = this.options;

            var state = (el.data('uistate') || 'open').toLowerCase();
            
            // expose some private props to other methods
            $.extend( this, {
                _panelID: el.attr( "id" ),
                _panelHeader: el.children('.'+o.classes._headerClass+':eq(0)').addClass(o.classes.header),
                _panelInner: this._getPanelInner()
            });
            this._toggleLink = $('<a href="#"></a>')
                               .css({
                                    'z-index': 100,
                                    'display': 'block',
                                    'position': 'absolute',
                                    'padding': '0px',
                                    'margin': '0px',
                                    'top': '0px',
                                    'left': '0px',
                                    'width': '100%',
                                    'height': '100%'
                               });
            
            if ( o.classes.icon || el.data('icon') )
                this._panelHeader.prepend( $('<span />').addClass( ['ui-icon', o.classes.icon || el.data('icon')].join(' ') ).css({display: 'inline-block'}) );
                
            this._panelHeader.append( this._toggleLink );
            
            el.addClass( this._getPanelClasses() );

            // if animating, add the class to do so
            if ( !!o.animate && !!o.animateWithCSS /*&& $.support.cssTransform3d*/ )
            {
                this._panelInner.addClass( o.classes.animate );
            }

            if ( !!o.collapsible )
            {
                this._bindToggleEvents();
            }
            
            if ( 'closed' == state ) this.close();
        },

        _getPanelInner: function() {
            var o = this.options, el = this.element;
            var panelInner = this.element.children( "." + o.classes._innerClass );

            if ( 0 === panelInner.length ) 
            {
                panelInner = el.children().not("." + o.classes.headerClass+":eq(0)").wrapAll( "<div />" ).parent();
            }
            panelInner.addClass(o.classes.inner);
            
            if ( o.classes.overlay )
                panelInner.children().wrapAll( "<div class='" + o.classes.overlay + "' />" );
            
            return panelInner;
        },

        _getPanelClasses: function() {
            var o = this.options;
            return [
                o.classes.panel,
                this._open ? o.classes.open : o.classes.closed,
                "ui-body-" + ( o.theme ? o.theme : "inherit" )
            ].join(" ");
        },

        _handleCloseClickAndEatEvent: function( event ) {
            if ( !event.isDefaultPrevented() ) 
            {
                event.preventDefault();
                this.close();
                return false;
            }
        },

        _handleCloseClick: function( event ) {
            if ( !event.isDefaultPrevented() ) 
            {
                this.close();
            }
        },

        _handleToggleClick: function( event ) {
            if ( !event.isDefaultPrevented() ) 
            {
                event.preventDefault( );
                this[ this._open ? "close" : "open" ]();
            }
        },

        _bindToggleEvents: function() {
            this._on( this._toggleLink, {
                "click": "_handleToggleClick"
            });
        },
        /*
        _bindSwipeEvents: function() {
            var self = this,
                area = self._modal ? self.element.add( self._modal ) : self.element;

            // on swipe, close the panel
            if ( !!self.options.swipeClose ) {
                if ( self.options.position === "left" ) {
                    area.on( "swipeleft.panel", function(/* e * /) {
                        self.close();
                    });
                } else {
                    area.on( "swiperight.panel", function(/* e * /) {
                        self.close();
                    });
                }
            }
        },
        */

        open: function( immediate ) {
            if ( !this._open ) 
            {
                var self = this,
                    o = self.options,

                    _openPanel = function() {

                        if ( !immediate && !!o.animate ) 
                        {
                            if ( !!o.animateWithCSS /*&& $.support.cssTransform3d*/ )
                                self._panelInner.one($UI.transitionEvent, complete );
                            else
                                self._panelInner.slideFadeDown( o.durationOpen, o.easingOpen, complete );
                        } 
                        else 
                        {
                            setTimeout( complete, 0 );
                        }
                        
                        self.element
                            .removeClass( o.classes.closed )
                            .addClass( o.classes.open );

                    },
                    complete = function() {

                        self._trigger( "open" );
                    };

                _openPanel();
                
                self._open = true;
            }
        },

        close: function( immediate ) {
            if ( this._open ) 
            {
                var self = this,
                    o = this.options,

                    _closePanel = function() {

                        if ( !immediate && !!o.animate ) 
                        {
                            if ( !!o.animateWithCSS /*&& $.support.cssTransform3d*/ )
                                self._panelInner.one($UI.transitionEvent, complete );
                            else
                                self._panelInner.slideFadeUp( o.durationClose, o.easingClose, complete );
                        } 
                        else 
                        {
                            setTimeout( complete, 0 );
                        }
                        
                        self.element
                            .removeClass( o.classes.open )
                            .addClass( o.classes.closed );
                    },
                    complete = function() {

                        self._trigger( "close" );
                    };

                _closePanel();

                self._open = false;
            }
        },

        toggle: function() {
            this[ this._open ? "close" : "open" ]();
        },

        _destroy: function() {
            var o = this.options;

            this._off( this._toggleLink, "click" );
            this._toggleLink.remove();
            
            this._panelInner.children().unwrap();

            this.element
                .removeClass( [ this._getPanelClasses(), o.classes.animate ].join( " " ) )
                /*.off( "swipeleft.panel swiperight.panel" )
                .off( "panelbeforeopen" )
                .off( "panelhide" )
                .off( "keyup.panel" )*/
            ;
        }
    });

}(jQuery, jQueryUIExtra);
}(jQuery);


