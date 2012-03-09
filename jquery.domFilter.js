// JavaScript Document

/*
	List Search plugin 
	Author: Victor Volker
	Version: 0.4
	Date: mar 09 2012
	
	searches text and filter elements, showing the results
	
*/

(function( $ ){
	
	var methods = {
		init : function( options ) {
			return this.each(function(){
				
				var $this = $(this);
				
				// set settings
				
				var settings = $.extend( {
			      'elements': 'tr',
			      'input': $('input[type=text]')[0], 
			      'searchable': '',
			      'alternataClasses': false,
			      'oddClass': 'odd',
			      'evenClass': 'even',
				  'ignoreFirstRow': true,
				  'beforeQuery': null
			    }, options);
			    
				$this.data('settings', settings);
				
				$this.domFilter('buildDataArray');
				
				// set input behaviour
				
				$this.data('previous_term', '');
				
				var term, previous_term, searchShownOnly, searchHiddenOnly, data_array, line, search_str;
				
				$(settings.input).keyup(function(){
					term = $(this).val().toLowerCase();
					previous_term = $this.data('previous_term');
					if (typeof(settings.beforeQuery) === 'function' && term.length === 1 && previous_term === '') {
						settings.beforeQuery();
					}
					searchShownOnly = (previous_term != '' && term.indexOf(previous_term) === 0);
					searchHiddenOnly = (previous_term != '' && previous_term.indexOf(term) === 0);
					data_array = $this.data('data_array');
					odd = true;
					for (line_id in data_array) {
						line = data_array[line_id];
						if ((searchShownOnly && line.visible) || (searchHiddenOnly && !line.visible)) {
							if (term === '' || line.text.indexOf(term) !== -1) {
								$('#' + line_id).show();
								data_array[line_id].visible = true;
							} else {
								$('#' + line_id).hide();
								data_array[line_id].visible = false;
							}
						}
						// set alternate classes
						if (settings.alternataClasses && data_array[line_id].visible) {
							if (odd) {
								$('#' + line_id).removeClass(settings.evenClass);
								$('#' + line_id).addClass(settings.oddClass);
							} else {
								$('#' + line_id).removeClass(settings.oddClass);
								$('#' + line_id).addClass(settings.evenClass);
							}
							odd = !odd;
						}
					}
					$this.data('previous_term', term);
					$this.data('data_array', data_array);
				});
				
			});
		},
		
		buildDataArray : function() {
			return this.each(function(){
				// build data array
				
				var $this = $(this);
				
				var settings = $this.data('settings');
				
				var data_array = [];
				var $_this, text, id;
				var i = 0;
				var pre_id = 'sl' + (Math.round(1000 * Math.random()));
				var $searchon;
				var is_first = true;
				
				$($this.find(settings.elements)).each(function(){
					if (!is_first || !settings.ignoreFirstRow) {
						$_this = $(this);
						id = $_this.attr('id');
						if (id == null) {
							id = pre_id + '_' + i;
							$_this.attr('id', id);
							i++;
						} 
						text = '';
						$searchon = settings.searchable ? $_this.find(settings.searchable) : $_this;
						$searchon.each(function(){
							text = text + ' ' + $(this).text().toLowerCase();
						});
						data_array[id] = { text: text, visible: $_this.is(':visible') };
					}
					is_first = false;
				});
				$this.data('data_array', data_array);
				
			});
			
		}, 	
		
		setAllVisible : function() {
			return this.each(function(){
				
				var $this = $(this);
				var data_array = $this.data('data_array');
				for (line_id in data_array) {
					$('#' + line_id).show();
					data_array[line_id].visible = true;
				}
				$this.data('data_array', data_array);
				
			});
		}
	};
	
	
	$.fn.domFilter = function( method ) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.domFilter' );
		}
	};
	
})( jQuery );
