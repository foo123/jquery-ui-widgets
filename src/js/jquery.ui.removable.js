!function($, $UI, undef) {

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

}(jQuery, jQueryUIExtra);