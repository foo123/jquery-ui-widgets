
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
