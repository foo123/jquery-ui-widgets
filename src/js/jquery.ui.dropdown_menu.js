!function($, $UI, undef) {

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

}(jQuery, jQueryUIExtra);