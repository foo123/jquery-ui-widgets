
/** jquery.ui.tooltip2 **/
function tooltipContent( ) 
{
    var el = $( this );
    if ( el.is( "[data-reftooltip]" ) ) 
    {
        return $( el.data( "reftooltip" ) ).html();
    }
    else if ( el.is( "[data-tooltip]" ) ) 
    {
        return el.data( "tooltip" );
    }
    else //if ( el.is( "[title]" ) ) 
    {
        return el.attr( "title" );
    }
}

function tooltipPosition( type ) 
{
    switch(type)
    {
        case 'top': 
            return {
                my: "center bottom-15",
                at: "center top",
                using: function( position, feedback ) {
                    $( this ).css( position ).css({'z-index': 2000});
                    $( "<div>" )
                    .addClass( "tip-arrow tip-arrow-bottom" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            };
        case 'bottom':
            return {
                my: "center top+15",
                at: "center bottom",
                using: function( position, feedback ) {
                    $( this ).css( position ).css({'z-index': 2000});
                    $( "<div>" )
                    .addClass( "tip-arrow tip-arrow-top" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            };
        case 'left':
            return {
                my: "right-15 center",
                at: "left center",
                using: function( position, feedback ) {
                    $( this ).css( position ).css({'z-index': 2000});
                    $( "<div>" )
                    .addClass( "tip-arrow tip-arrow-right" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            };
        case 'right':
        default:
            return {
                my: "left+15 left",
                at: "right center",
                using: function( position, feedback ) {
                    $( this ).css( position ).css({'z-index': 2000});
                    $( "<div>" )
                    .addClass( "tip-arrow tip-arrow-left" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            };
    }
}

$.widget( $UI.NS("tooltip2"), $.ui.tooltip, {
    
    _create: function( ) {
        var self = this, el = self.element, o = self.options, selectors = "[data-tooltip],[data-reftooltip],[title]";

        o.items = selectors;
        o.content = tooltipContent;
        if ( el.hasClass('has-tooltip-top') )
            o.position = tooltipPosition('top');
        else if ( el.hasClass('has-tooltip-bottom') )
            o.position = tooltipPosition('bottom');
        else if ( el.hasClass('has-tooltip-left') )
            o.position = tooltipPosition('left');
        else /*if ( el.hasClass('has-tooltip-right') )*/
            o.position = tooltipPosition('right');
        self._super( );
    }
});
