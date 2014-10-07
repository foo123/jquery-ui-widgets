!function($, $UI, undef) {

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

}(jQuery, jQueryUIExtra);