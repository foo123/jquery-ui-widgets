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
            var self = this, o = self.options;
            
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
            var self = this.
            self._off(self._handle, 'click');
            self._handle.remove();
            if ( self.options.wrap )
            {
                self.element.unwrap();
                self._wrapper.remove();
            }
        }
    });

}(jQuery, jQueryUIExtra);