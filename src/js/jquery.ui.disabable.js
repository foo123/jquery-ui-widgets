!function($, $UI, undef) {

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

}(jQuery, jQueryUIExtra);