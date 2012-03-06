// JavaScript Document

/*
	List Search plugin 
	Author: Victor Volker
	Version: 0.1
	Date: mar 06 2012
	
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
			      'searchable': ''
			    }, options);
			    
				// build data array
				
				var data_array = [];
				var $_this, text, id;
				var i = 0;
				var pre_id = 'sl' + (Math.round(1000 * Math.random()));
				var $searchon;
				
				$($this.find(settings.elements)).each(function(){
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
				});
				$this.data('data_array', data_array);
				
				
				// set input behaviour
				
				$this.data('previous_term', '');
				
				var term, previous_term, searchShownOnly, searchHiddenOnly, data_array, line, search_str;
				
				$(settings.input).keyup(function(){
					term = $(this).val().toLowerCase();
					previous_term = $this.data('previous_term');
					searchShownOnly = (term.indexOf(previous_term) === 0);
					searchHiddenOnly = (previous_term.indexOf(term) === 0);
					data_array = $this.data('data_array')
					for (line_id in data_array) {
						line = data_array[line_id];
						if ((!searchShownOnly || line.visible) || (!searchHiddenOnly && !line.visible)) {
							if (term === '' || line.text.indexOf(term) !== -1) {
								$('#' + line_id).show();
							} else {
								$('#' + line_id).hide();
							}
						}
					}
					$this.data('previous_term', term);

				});
				
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
