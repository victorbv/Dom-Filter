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
	
