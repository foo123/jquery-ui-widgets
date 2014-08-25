!function($, $UI, undef) {

     $.widget( $UI.NS("panel"), {
        options: {
            classes: {
                panel: "ui-panel ui-widget",
                open: "ui-panel-open",
                closed: "ui-panel-closed",
                inner: "ui-panel-inner ui-widget-content",
                overlay: "ui-panel-overlay",
                header: "ui-panel-header ui-widget-header",
                icon: null,
                animate: "ui-panel-animate",
                _headerClass: "panel-header",
                _innerClass: "panel-inner"
            },
            //fx: null,
            easingOpen: 'easeInQuint',
            easingClose: 'easeInQuint',
            durationOpen: 'fast',
            durationClose: 'fast',
            collapsible: true,
            animate: true,
            animateWithCSS: false,
            theme: null
        },

        _panelID: null,
        _toggleLink: null,
        _panelHeader: null,
        _panelInner: null,
        // state storage of open or closed
        _open: true,

        _create: function() {
            var el = this.element, o = this.options;

            var state = (el.data('uistate') || 'open').toLowerCase();
            
            // expose some private props to other methods
            $.extend( this, {
                _panelID: el.attr( "id" ),
                _panelHeader: el.children('.'+o.classes._headerClass+':eq(0)').addClass(o.classes.header),
                _panelInner: this._getPanelInner()
            });
            this._toggleLink = $('<a href="#"></a>')
                               .css({
                                    'z-index': 100,
                                    'display': 'block',
                                    'position': 'absolute',
                                    'padding': '0px',
                                    'margin': '0px',
                                    'top': '0px',
                                    'left': '0px',
                                    'width': '100%',
                                    'height': '100%'
                               });
            
            if ( o.classes.icon || el.data('icon') )
                this._panelHeader.prepend( $('<span />').addClass( ['ui-icon', o.classes.icon || el.data('icon')].join(' ') ).css({display: 'inline-block'}) );
                
            this._panelHeader.append( this._toggleLink );
            
            el.addClass( this._getPanelClasses() );

            // if animating, add the class to do so
            if ( !!o.animate && !!o.animateWithCSS /*&& $.support.cssTransform3d*/ )
            {
                this._panelInner.addClass( o.classes.animate );
            }

            if ( !!o.collapsible )
            {
                this._bindToggleEvents();
            }
            
            if ( 'closed' == state ) this.close();
        },

        _getPanelInner: function() {
            var o = this.options, el = this.element;
            var panelInner = this.element.children( "." + o.classes._innerClass );

            if ( 0 === panelInner.length ) 
            {
                panelInner = el.children().not("." + o.classes.headerClass+":eq(0)").wrapAll( "<div />" ).parent();
            }
            panelInner.addClass(o.classes.inner);
            
            if ( o.classes.overlay )
                panelInner.children().wrapAll( "<div class='" + o.classes.overlay + "' />" );
            
            return panelInner;
        },

        _getPanelClasses: function() {
            var o = this.options;
            return [
                o.classes.panel,
                this._open ? o.classes.open : o.classes.closed,
                "ui-body-" + ( o.theme ? o.theme : "inherit" )
            ].join(" ");
        },

        _handleCloseClickAndEatEvent: function( event ) {
            if ( !event.isDefaultPrevented() ) 
            {
                event.preventDefault();
                this.close();
                return false;
            }
        },

        _handleCloseClick: function( event ) {
            if ( !event.isDefaultPrevented() ) 
            {
                this.close();
            }
        },

        _handleToggleClick: function( event ) {
            if ( !event.isDefaultPrevented() ) 
            {
                event.preventDefault( );
                this[ this._open ? "close" : "open" ]();
            }
        },

        _bindToggleEvents: function() {
            this._on( this._toggleLink, {
                "click": "_handleToggleClick"
            });
        },
        /*
        _bindSwipeEvents: function() {
            var self = this,
                area = self._modal ? self.element.add( self._modal ) : self.element;

            // on swipe, close the panel
            if ( !!self.options.swipeClose ) {
                if ( self.options.position === "left" ) {
                    area.on( "swipeleft.panel", function(/* e * /) {
                        self.close();
                    });
                } else {
                    area.on( "swiperight.panel", function(/* e * /) {
                        self.close();
                    });
                }
            }
        },
        */

        open: function( immediate ) {
            if ( !this._open ) 
            {
                var self = this,
                    o = self.options,

                    _openPanel = function() {

                        if ( !immediate && !!o.animate ) 
                        {
                            if ( !!o.animateWithCSS /*&& $.support.cssTransform3d*/ )
                                self._panelInner.one($UI.transitionEvent, complete );
                            else
                                self._panelInner.slideFadeDown( o.durationOpen, o.easingOpen, complete );
                        } 
                        else 
                        {
                            setTimeout( complete, 0 );
                        }
                        
                        self.element
                            .removeClass( o.classes.closed )
                            .addClass( o.classes.open );

                    },
                    complete = function() {

                        self._trigger( "open" );
                    };

                _openPanel();
                
                self._open = true;
            }
        },

        close: function( immediate ) {
            if ( this._open ) 
            {
                var self = this,
                    o = this.options,

                    _closePanel = function() {

                        if ( !immediate && !!o.animate ) 
                        {
                            if ( !!o.animateWithCSS /*&& $.support.cssTransform3d*/ )
                                self._panelInner.one($UI.transitionEvent, complete );
                            else
                                self._panelInner.slideFadeUp( o.durationClose, o.easingClose, complete );
                        } 
                        else 
                        {
                            setTimeout( complete, 0 );
                        }
                        
                        self.element
                            .removeClass( o.classes.open )
                            .addClass( o.classes.closed );
                    },
                    complete = function() {

                        self._trigger( "close" );
                    };

                _closePanel();

                self._open = false;
            }
        },

        toggle: function() {
            this[ this._open ? "close" : "open" ]();
        },

        _destroy: function() {
            var o = this.options;

            this._off( this._toggleLink, "click" );
            this._toggleLink.remove();
            
            this._panelInner.children().unwrap();

            this.element
                .removeClass( [ this._getPanelClasses(), o.classes.animate ].join( " " ) )
                /*.off( "swipeleft.panel swiperight.panel" )
                .off( "panelbeforeopen" )
                .off( "panelhide" )
                .off( "keyup.panel" )*/
            ;
        }
    });

}(jQuery, jQueryUIExtra);