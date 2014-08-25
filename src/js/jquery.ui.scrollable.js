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

}(jQuery, jQueryUIExtra);