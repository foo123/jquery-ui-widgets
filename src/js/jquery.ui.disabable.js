
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
