!function($, $UI, undef) {

   $.widget( $UI.NS("uploadable"), {
        
        options: {
            classes: {
                button: "ui-button-xlarge",
                icon: "ui-icon-folder-open",
            },
            text: "Load File",
            fileType: "image",
            onload: null
        },
        
        _button: null,
        
        _create: function() {
            var self = this, el = self.element, o = self.options;

            el.css({position: "absolute", display: "none"});
            
            var button = self._button = $('<button></button>')
                                            .addClass( o.classes.button )
                                            .button({
                                                icons: {
                                                    primary: o.classes.icon
                                                },
                                                label: el.attr('title') || el.data('title') || el.data('value') || o.text,
                                                text: !!(el.attr('title') || el.data('title') || el.data('value') || o.text)
                                            })
                                        ;
            self._on( el, {
            "change": function( event ) {
                //event.preventDefault();
                self._handleUpload(event);
            }});            
            self._on( button, {
            "click": function( event ) {
                event.preventDefault();
                el.trigger('click');
            }});            
            
            el.after(button);
        },

        _handleUpload: function(event) {
            var self = this, o = self.options;
            var file = event.target.files[0] || null; //FileList object
            
            if ( !file || !file.type.match(o.fileType) )   return false;
            
            var fileReader = new FileReader();
            
            fileReader.addEventListener("load", function(event){
                self._trigger('onload', event, { data: event.target.result });
            });
            
             //Read the file
            fileReader.readAsDataURL( file );
        },
        
        _destroy: function() {
            var self = this;
            self._off( self._button, "click");            
            self._button.remove().destroy();
            self._off( self.element.css({position: 'relative', display: 'inline'}), "change");            
        }
    });

}(jQuery, jQueryUIExtra);