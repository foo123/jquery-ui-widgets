!function($, $UI, undef) {

    $.widget( $UI.NS("switcher"), {
        
        options: {
            labels: {
                ON: "ON",
                OFF: "OFF"
            },
            classes: {
                wrapper: "ui-switch",
                state: "ui-switch-state",
                ON: "ui-switch-on",
                OFF: "ui-switch-off",
                handle: "ui-switch-handle ui-state-default"
            }
            //,onchange: null
        },
        
        _state: null,
        _isON: false,
        
        _create: function() {
            var wrapper, state, labels, name, o = this.options;
            
            state = this._state = this.element;
            state.addClass(o.classes.state).attr('value', '1');
            name = this._wID = state.attr( "id" );
            this._isON = state.is(':checked');
            
            wrapper = this.element = this.element.wrap('<span />').parent().addClass(o.classes.wrapper);
            
            labels = $('<label for="'+name+'" class="'+o.classes.OFF+'">'+o.labels.OFF+'</label><label for="'+name+'" class="'+o.classes.ON+'">'+o.labels.ON+'</label><span class="'+o.classes.handle+'"></span>');
            wrapper.append(labels);
            
            this._bindHandlers();
        },
        
        _handleChange: function(event) {
            if ( !event.isDefaultPrevented() ) 
            {
                var state = this._isON = !!this._state.is(':checked');
                //this._trigger('onchange', event, { state: state});
            }
        },
        
        _bindHandlers: function() {
            this._on( this._state, {
                "change": "_handleChange"
            });
        },
        
        val: function(v) {
            if ( 'undefined' == typeof(v) )
            {
                return this._isON;
            }
            else
            {
                if (v) 
                {
                    this._state.attr('checked', true);
                    this._isON = true;
                }
                else  
                {
                    this._state.removeAttr('checked');
                    this._isON = false;
                }
            }
        },
        
        toggle: function() {
            this._state.trigger('click');
        },

        _destroy: function() {
            this._off( this._state, "change");
            this._state.unwrap();
            this.element.remove();
        }
    });

}(jQuery, jQueryUIExtra);