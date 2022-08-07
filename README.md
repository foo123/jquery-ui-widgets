jQueryUI Extra Widgets
======================

A collection of simple, custom, useful widgets (in jQueryUI format) not included in jQueryUI package.


Most widgets are generic and themable by default (by including the relevant jquery-ui theme)
others might need a little tweeking in the respective css.

This is **work in progress**, although most widgets are already used in projects,
still some additional options or edits / styles are possible.



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
        // methods
        $('#screen').morphable('morph', new_mode);
        
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

**see also:**

* [ModelView](https://github.com/foo123/modelview.js) a simple, fast, powerful and flexible MVVM framework for JavaScript
* [Contemplate](https://github.com/foo123/Contemplate) a fast and versatile isomorphic template engine for PHP, JavaScript, Python
* [HtmlWidget](https://github.com/foo123/HtmlWidget) html widgets, made as simple as possible, both client and server, both desktop and mobile, can be used as (template) plugins and/or standalone for PHP, JavaScript, Python (can be used as [plugins for Contemplate](https://github.com/foo123/Contemplate/blob/master/src/js/plugins/plugins.txt))
* [Paginator](https://github.com/foo123/Paginator)  simple and flexible pagination controls generator for PHP, JavaScript, Python
* [ColorPicker](https://github.com/foo123/ColorPicker) a fully-featured and versatile color picker widget
* [Pikadaytime](https://github.com/foo123/Pikadaytime) a refreshing JavaScript Datetimepicker that is ightweight, with no dependencies
* [Timer](https://github.com/foo123/Timer) count down/count up JavaScript widget
* [InfoPopup](https://github.com/foo123/InfoPopup) a simple JavaScript class to show info popups easily for various items and events (Desktop and Mobile)
* [Popr2](https://github.com/foo123/Popr2) a small and simple popup menu library
* [area-select.js](https://github.com/foo123/area-select.js) a simple JavaScript class to select rectangular regions in DOM elements (image, canvas, video, etc..)
* [area-sortable.js](https://github.com/foo123/area-sortable.js) simple and light-weight JavaScript class for handling smooth drag-and-drop sortable items of an area (Desktop and Mobile)
* [css-color](https://github.com/foo123/css-color) simple class for manipulating color values and color formats for css, svg, canvas/image
* [jquery-plugins](https://github.com/foo123/jquery-plugins) a collection of custom jQuery plugins
* [jquery-ui-widgets](https://github.com/foo123/jquery-ui-widgets) a collection of custom, simple, useful jQueryUI Widgets
* [touchTouch](https://github.com/foo123/touchTouch) a variation of touchTouch jQuery Optimized Mobile Gallery in pure vanilla JavaScript
* [Imagik](https://github.com/foo123/Imagik) fully-featured, fully-customisable and extendable Responsive CSS3 Slideshow
* [Carousel3](https://github.com/foo123/Carousel3) HTML5 Photo Carousel using Three.js
* [Rubik3](https://github.com/foo123/Rubik3) intuitive 3D Rubik Cube with Three.js
* [MOD3](https://github.com/foo123/MOD3) JavaScript port of AS3DMod ActionScript 3D Modifier Library
* [RT](https://github.com/foo123/RT) unified client-side real-time communication for JavaScript using XHR polling / BOSH / WebSockets / WebRTC
* [AjaxListener.js](https://github.com/foo123/AjaxListener.js): Listen to any AJAX event on page with JavaScript, even by other scripts
* [asynchronous.js](https://github.com/foo123/asynchronous.js) simple manager for asynchronous, linear, parallel, sequential and interleaved tasks for JavaScript
* [classy.js](https://github.com/foo123/classy.js) Object-Oriented mini-framework for JavaScript

