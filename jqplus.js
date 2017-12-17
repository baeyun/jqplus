/*
 * jQPlus
 *
 * jQPlus is a pack of useful jQuery extensions.
 *
 * @bukharim96
 * opensource.org/licenses/mit-license.
 *
 * @param obj attrsObj
 * @return obj jQuery
 */
(function($) {
	/*
	 * Constants
	 */
	var jQPlus = {constants : {}},
		jQPlus.constants.styleResets = '{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:repeat;border-color:black;border-color:currentColor;border-radius:0;border-style:none;border-width:medium;bottom:auto;clear:none;clip:auto;color:inherit;counter-increment:none;counter-reset:none;cursor:auto;direction:inherit;display:block;float:none;font-family:inherit;font-size:inherit;font-style:inherit;font-variant:normal;font-weight:inherit;height:auto;left:auto;letter-spacing:normal;line-height:inherit;list-style-type:inherit;list-style-position:outside;list-style-image:none;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;opacity:1;outline:invert none medium;overflow:visible;padding:0;position:static;quotes:"" "";right:auto;table-layout:auto;text-align:inherit;text-decoration:inherit;text-indent:0;text-transform:none;top:auto;unicode-bidi:normal;vertical-align:baseline;visibility:inherit;white-space:normal;width:auto;word-spacing:normal;z-index:auto;-webkit-background-origin:padding-box;background-origin:padding-box;-webkit-background-clip:border-box;background-clip:border-box;-webkit-background-size:auto;-moz-background-size:auto;background-size:auto;-webkit-border-image:none;-moz-border-image:none;-o-border-image:none;border-image:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-column-count:auto;-moz-column-count:auto;column-count:auto;-webkit-column-gap:normal;-moz-column-gap:normal;column-gap:normal;-webkit-column-rule:medium none black;-moz-column-rule:medium none black;column-rule:medium none black;-webkit-column-span:1;-moz-column-span:1;column-span:1;-webkit-column-width:auto;-moz-column-width:auto;column-width:auto;font-feature-settings:normal;overflow-x:visible;overflow-y:visible;-webkit-hyphens:manual;-moz-hyphens:manual;hyphens:manual;-webkit-perspective:none;-moz-perspective:none;-ms-perspective:none;-o-perspective:none;perspective:none;-webkit-perspective-origin:50%50%;-moz-perspective-origin:50%50%;-ms-perspective-origin:50%50%;-o-perspective-origin:50%50%;perspective-origin:50%50%;-webkit-backface-visibility:visible;-moz-backface-visibility:visible;-ms-backface-visibility:visible;-o-backface-visibility:visible;backface-visibility:visible;text-shadow:none;-webkit-transition:all 0s ease 0s;transition:all 0s ease 0s;-webkit-transform:none;-moz-transform:none;-ms-transform:none;-o-transform:none;transform:none;-webkit-transform-origin:50%50%;-moz-transform-origin:50%50%;-ms-transform-origin:50%50%;-o-transform-origin:50%50%;transform-origin:50%50%;-webkit-transform-style:flat;-moz-transform-style:flat;-ms-transform-style:flat;-o-transform-style:flat;transform-style:flat;word-break:normal;}';
	
	$.fn.extend({
		/*
		 * jQuery.resetStyle
		 *
		 * Usage:
		 *		* To remove all styles maintained by element
		 *		  including inline/internal/external styles
		 *			jQuery('#foo.bar').resetStyle()
		 *		* To apply custom styles, enter styles as args
		 *			jQuery('#foo.bar').resetStyle({'background-color':'red'})
		 *
		 * @todo - import the getSelector jQuery Plugin
		 *
		 * @param object new CSS override styles
		 * @return object jQuery object
		 */
		resetStyle: function(newCSS) {
			window['resetSelectors'] = (window['resetSelectors']) ? window['resetSelectors'] : [];
			
			this.each(function() {
				if (this.attributes['style'])
					this.attributes['style'].value = '';

				window['resetSelectors'].push($(this).getSelector());
			});

			var style = $('#resetStyle'),
				selectors = window['resetSelectors'].join(', '),
				styleTxt = (selectors) ? selectors + ' ' + jQPlus.constants.styleResets : '';

			if (style.length == 0) {
				$('head').append(
					$('<style>', {id: 'resetStyle', type: 'text/css', text: styleTxt})
				);
			} else {
				style.text(styleTxt);
			}

			if (newCSS)
				$(this).css(newCSS);

			return this;
		},
		/*
		 * jQuery.getSelector
		 *
		 * @return string unique css selector
		 */
		getSelector: function() {
			var path = [],
				currentElement = this[0];

			while (currentElement.nodeName.toLowerCase() != 'html') {
				var selector = currentElement.nodeName.toLowerCase();

				if (currentElement.id)
					selector += '#' + currentElement.id;

				if (!currentElement.id && currentElement.className)
					selector += '.' + currentElement.className;

				path.push(selector);

				currentElement = currentElement.parentNode;
			}

			return path.reverse().join(' > ');
		},
		/*
		 * jQuery.attrs
		 *
		 * Adds multiple attributes (in object form) on an element
		 */
		attrs: function(attrsObj) {
			if (!attrsObj)
				return this;

			return this.each(function() {
				for ( k in attrsObj) {
					$(this).attr(k, attrsObj[k])
				};
			});
		},
		/*
		 * jQuery.removeAttrs
		 *
		 * Removes multiple attributes on an element
		 */
		removeAttrs: function(attrsObj) {
			if (!attrsObj)
				return this;

			return this.each(function() {
				for ( k in attrsObj) {
					$(this).removeAttr(k, attrsObj[k])
				};
			});
		}
	});
})(jQuery);
