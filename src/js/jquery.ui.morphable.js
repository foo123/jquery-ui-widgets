
/** jquery.ui.morphable **/
var
    // http://davidwalsh.name/add-rules-stylesheets
    addCSSRule = function( style, selector, rules, index ) {
        if ( "insertRule" in style.sheet ) 
        {
            style.sheet.insertRule( selector + "{" + rules + "}", index );
            return style.sheet.cssRules[ index ];
        }
        else if ( "addRule" in style.sheet ) 
        {
            style.sheet.addRule( selector, rules, index );
            return style.sheet.rules[ index ];
        }
    },
    
    addCSS = function( style, css ) {
        if ( "object" === typeof css )
        {
            var n, declaration, i = 0;
            for (n in css)
            {
                if ( css[HAS](n) )
                {
                    declaration = css[ n ];
                    declaration.css = addCSSRule( style, declaration.selector, [].concat(declaration.rules).join('; '), i++ );
                }
            }
        }
        return css;
    },
    
    /*getCSS = function( style ) {
        var css = [], sheet = style.sheet, i,
            rules = sheet.cssRules ? sheet.cssRules : sheet.rules;
        for (i=0; i<rules.length; i++) css.push(rules[i].cssText ? rules[i].cssText : rules.style.cssText);
        return css.join("\n");
    },*/
    
    createStyleSheet = function( media, css ) {
        // Create the <style> tag
        var style = document.createElement("style");
        // Add a media (and/or media query) here if you'd like!
        style.setAttribute("media", media || "all");
        style.setAttribute("type", "text/css");
        // WebKit hack :(
        style.appendChild( document.createTextNode("") );
        // Add the <style> element to the page
        document.head.appendChild( style );
        if ( css ) addCSS( style, css );
        return style;
    },
    
    disposeStyleSheet = function( style ) {
        if ( style ) document.head.removeChild( style );
    }
;
    
$.widget( $UI.NS("morphable"), {
    
    options: {
        useStyleSheet: true
        //,selector: false
        ,modes: []
        ,modeClass: 'mode-${MODE}'
        ,showClass: 'show-if-${MODE}'
        ,hideClass: 'hide-if-${MODE}'
    },
    
    _styleSheet: null,
    _cssStyles: null,
    _curMode: null,
    
    _create: function() {
        var self = this, o = self.options, el = self.element, i, j,
            cssStyles = {}, hideSelector, showSelector, mainSelector,
            has_show_class = o[HAS]('showClass') && o.showClass, has_hide_class = o[HAS]('hideClass') && o.hideClass,
            modes = [].concat(o.modes || []);
        
        if ( !el.attr("id") ) el.attr( "id", $UI.UUID() );
        if ( !el.hasClass('ui-morphable') ) el.addClass('ui-morphable');
        mainSelector = '#' + el.attr( "id" ) + '.ui-morphable';
        hideSelector = []; showSelector = [];
        for(i=0; i<modes.length; i++)
        {
            if ( has_hide_class )
            {
                hideSelector.push(
                    mainSelector + '.' + o.modeClass.split('${MODE}').join(modes[i]) + ' .' + o.hideClass.split('${MODE}').join(modes[i])
                );
            }
            if ( has_show_class )
            {
                showSelector.push(
                    mainSelector + '.' + o.modeClass.split('${MODE}').join(modes[i]) + ' .' + o.showClass.split('${MODE}').join(modes[i])
                );
            }
            if ( has_show_class || has_hide_class )
            {
                for (j=0; j<modes.length; j++)
                {
                    if ( j === i ) continue;
                    if ( has_show_class )
                    {
                        hideSelector.push(
                            mainSelector + '.' + o.modeClass.split('${MODE}').join(modes[i]) + ' .' + o.showClass.split('${MODE}').join(modes[j]) + ':not(.' + o.showClass.split('${MODE}').join(modes[i]) + ')'
                        );
                    }
                    if ( has_hide_class )
                    {
                        showSelector.push(
                            mainSelector + '.' + o.modeClass.split('${MODE}').join(modes[i]) + ' .' + o.hideClass.split('${MODE}').join(modes[j]) + ':not(.' + o.hideClass.split('${MODE}').join(modes[i]) + ')'
                        );
                    }
                }
            }
        }
        if ( hideSelector.length )
        {
            cssStyles.hide_mode = {
                selector: hideSelector.join(','),
                rules: [
                    'display: none !important'
                ]
            }
        }
        if ( showSelector.length )
        {
            cssStyles.show_mode = {
                selector: showSelector.join(','),
                rules: [
                    'display: block'
                ]
            }
        }
        self._styleSheet = createStyleSheet( 'all', self._cssStyles = cssStyles );
    },

    morph: function( new_mode ) {
        var self = this, el = self.element, modeClass = self.options.modeClass,
            prev_mode = self._curMode, has_changed = prev_mode !== new_mode;
        if ( has_changed ) 
        {
            if (prev_mode) el.removeClass(modeClass.split('${MODE}').join(prev_mode));
            self._curMode = new_mode;
            if (new_mode) el.addClass(modeClass.split('${MODE}').join(new_mode));
        }
        return self;
    },
    
    _destroy: function() {
        var self = this;
        self.element.removeClass('ui-morphable' + (self._curMode
            ? (' '+self.options.modeClass.split('${MODE}').join(self._curMode))
            : ''
        ));
        self._curMode = null;
        self._cssStyles = null;
        disposeStyleSheet( self._styleSheet );
        self._styleSheet = null;
    }
});
