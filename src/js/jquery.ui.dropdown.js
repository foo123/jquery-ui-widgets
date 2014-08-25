!function($, $UI, undef) {

    $.widget( $UI.NS("dropdown"), {
        
        options: {
            classes: {
                wrapper: "ui-dropdown ui-widget ui-state-default",
                select: "ui-dropdown-select ui-state-default",
                replaced: "ui-dropdown-select-replaced",
                replace: "ui-dropdown-select-replace",
                open: "ui-dropdown-select-open",
                closed: "ui-dropdown-select-closed"
            },
            replace: false,
            onselect: null
        },
        
        _list: null,
        
        _create: function() {
            var el = this.element, o = this.options, list;

            el.addClass(o.classes.select).wrap("<span />").parent().addClass(o.classes.wrapper);
            if ( o.replace )
            {
                this._list = list = this._replace( el );
                el.after( list );
                el.addClass( o.classes.replaced );
                this._bindHandlers();
            }
        },

        value: function(v) {
            return this.element.val(v);
        },
        
        _replace: function(el) {
            var self = this, o = self.options;
            var list = $('<ul />').addClass(o.classes.replace);
            el.find('option').each(function(){
                var opt = $(this);
                list.append($('<li />').html(opt.html()).addClass(opt.attr('class')));
            });
            return list;
        },
        
        _bindHandlers: function() {
            this._on(this.element, {
                'focus' : '_handleSelect',
                'mousedown' : '_handleSelect'
            });
            this._on(this._list.children('li'), {
                'click' : '_handleSelect2'
            });
        },
        
        _handleSelect: function(event) {
            if (event.stopPropagation)
                event.stopPropagation();            
            event.preventDefault();
            this.element[0].blur();
            window.focus();
            this._list.removeClass( this.options.classes.closed ).addClass( this.options.classes.open );
            return false;
        },
        
        _handleSelect2: function(event) {
            event.preventDefault();
            var self = this, el = self.element, list = self._list, 
                index = list.children('li').index(event.target)
            ;
            setTimeout(function(){
                el.prop('selectedIndex', index);
                list.removeClass( self.options.classes.open ).addClass( self.options.classes.closed );
                self._trigger('onselect', event, {index: index, key: el.val()});
            }, 60);
            return false;
        },
        
        _destroy: function() {
            var o = this.options;
            var wrapper = this.element.parent();
            this.element.unwrap().removeClass([o.classes.select, o.classes.replaced].join(' '));
            if ( o.replace )
            {
                this._off(this.element, 'mousedown');
                this._off(this.element, 'focus');
                this._list.remove();
            }
            wrapper.remove();
        }
    });

}(jQuery, jQueryUIExtra);