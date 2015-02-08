jQueryUI Extra Widgets
======================

A collection of simple, custom, useful widgets (in jQueryUI format) not included in jQueryUI package.

**see also** 
* [ModelView UI Widgets](https://github.com/foo123/modelview-widgets)


Most widgets are generic and themable by default (by including the relevant jquery-ui theme)
others might need a little tweeking in the respective css.

This is **work in progress**, although most widgets are already used in projects,
still some additional options or edits / styles are possible.


Some widgets are *jQueryUI adapted* versions of components 
included in [components.css](https://github.com/foo123/components.css)


**Included Widgets :**

* custom css animations, custom css spinners
* radio, checkbox, switch-button checkbox, push-button checkbox  (custom-styled radio,checkbox with minimal hassle and maximum compatibility)
* disabable/delayable  ("disables" an area by overlaying a customizable screen/"delays" an area by overlaying a customizable spinner)
* morphable  (element which can change forms, i.e show/hide parts of its content depending on a *mode* defined in its css class)
* removable  (element which can be "removed easily with a style")
* dropdown  (custom-styled dropdown with minimal hassle and maximum compatibility)
* dropdown_menu  (custom-styled dropdown_menu with minimal hassle and maximum compatibility)
* tooltip2  (ui.tooltip with alternative stying and options)
* uploadable  (style and handle upload of local/client-side files using File API)
* panel    (custom collapsible panel)
* scrollable  (area which can animate/scroll its content by a fixed amount in various directions)


**Widgets API :**

```javascript

        // additional styles customization
        // via associated CSS files
        
        // panel(s)
        $('.panel').panel({
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
            collapsible: true,
            animate: true,
            animateWithCSS: false
        });
        
        // dropdown(s)
        $('.dropdown').dropdown({
            classes: {
                wrapper: "ui-dropdown ui-widget ui-state-default",
                select: "ui-dropdown-select ui-state-default",
                replaced: "ui-dropdown-select-replaced",
                replace: "ui-dropdown-select-replace",
                open: "ui-dropdown-select-open",
                closed: "ui-dropdown-select-closed"
            },
            replace: false,
            onselect:  function() { /* .. */ }
        });
        
        // disabable(s)
        $('.disabable').disabable();
        // methods
        $('.disabable').disabable('enableIt');
        $('.disabable').disabable('disableIt');
        
        // delayable(s)
        $('.delayable').delayable();
        // methods
        $('.delayable').delayable('enableIt');
        $('.delayable').delayable('disableIt');
        
        // morphable
        $('#screen').morphable({
             modes: ['about', 'help']
            ,modeClass: 'mode-${MODE}'
            ,showClass: 'show-if-${MODE}'
            ,hideClass: 'hide-if-${MODE}'
        });
        
        // scrollable(s)
        $('#scrollable-images').scrollable({
            classes: {
                wrapper: "ui-scrollable",
                scroll: "ui-scrollable-pane",
                item: "ui-scrollable-item"
            },
            onscrollend: function() { /* .. */ },
            direction: "left",
            easing: "linear",
            duration: 400,
            scrollby: 2,
            controls: {
                next: $('#scrollnext'),
                prev: $('#scrollprev')
            }
        });
        // methods
        $('#scrollable-images').scrollable('addItem', item);
        $('#scrollable-images').scrollable('removeItem', itemOrIndex);
        
        // uploadable
        $('.uploadable').uploadable({
            classes: {
                button: "ui-button-xlarge",
                icon: "ui-icon-folder-open",
            },
            text: "Load File",
            fileType: "image",
            onload: function( event, data ) { /* .. */ }
        });
        
        // removable
        $('.removable').removable({
            classes: {
                wrapper: "ui-removable",
                handle: "ui-removable-remove"
            },
            icon: 'ui-icon-circle-close',
            effect: "fadeOut",
            duration: 400,
            easing: 'linear',
            wrap: false,
            autoremove: true,
            onremove: function() { /* .. */ }
        });

```