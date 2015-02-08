
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
