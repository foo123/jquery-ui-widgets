!function($, $UI, undef) {

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

}(jQuery, jQueryUIExtra);