DOM Filter jQuery plugin
========================

a flexible and performatic DOM search plugin developed by the Lápis Raro team.

Usage
-----

### basic

on this basic usage, all the #table1 rows will be filtered based on the first text input's term

	$(document).ready(function() {
		$('#table1').domFilter();
	});


### options

* elements - selector of the row elements to be shown or hidden. Default value is 'tr'.
* input - input element to perform the search. The default value is $('input[type=text]')[0], which is the first text input on the page.
* searchable - selector that defines where the search will be performed within each row. The default value is an empty string (searches the entire row).
* alternataClasses - defines whether the plugin will apply alternate classes on the rows or not. Dafault value is false.
* oddClass - class for the odd rows, applied if alternataClasses is set to true. Defaults to 'odd'.
* evenClass - class for the even rows, applied if alternataClasses is set to true. Defaults to 'even'.
* ignoreFirstRow - whether the first row will be ignored or not (default: true)
* beforeQuery - function called just before the filter is applied on a query, when the first character is typed (default: null)
	
example on how to filter a list and set a specific input text field:

	$(document).ready(function() {
		$('ul#list1').domFilter({
			elements: 'li',
			input: $('#input_1')
		});
	});	
	
example on how to filter rows based on a specific td class

	$(document).ready(function() {
		$('table').domFilter({
			searchable: 'td.searchable'
		});
	});	
	

