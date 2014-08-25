!function($, $UI, undef) {

    $.widget( $UI.NS("radio"), {
        
        options: {
            classes: {
                radio: "ui-radio",
                label: "ui-radio"
            }
        },
        
        _create: function() {
            var el = this.element, o = this.options;

            el.addClass(o.classes.radio).after('<label for="'+el.attr('id')+'" class="'+o.classes.label+'">&nbsp;</label>');
        },

        _destroy: function() {
            var o = this.options;

            this.element.removeClass(o.classes.radio).next().remove();
        }
    });
    
    $.widget( $UI.NS("checkbox"), {
        
        options: {
            classes: {
                checkbox: "ui-checkbox",
                label: "ui-checkbox"
            }
        },
        
        _create: function() {
            var el = this.element, o = this.options;

            el.addClass(o.classes.checkbox).after('<label for="'+el.attr('id')+'" class="'+o.classes.label+'">&nbsp;</label>');
        },

        _destroy: function() {
            var o = this.options;

            this.element.removeClass(o.classes.checkbox).next().remove();
        }
    });

}(jQuery, jQueryUIExtra);