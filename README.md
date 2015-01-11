# Friendly-XML
A basic xml parser/serializer inspired by PHP's SimpleXML

This is a basic sax-js based xml parser which converts an xml formatted string into a sensible json object which can be used to locate xml values, edit xml values, and serialize json objects back into an xml string. I'm more of a c#/c++ coder and am just barely dabbing into javascript and node so if you look at the code and you're like, "Dang what a newb!", don't be so hard on me cuz I coded this quick status lol. Consequently, It may not be super stable but I think I've gotten the basic idea across.

# Installation

	npm install friendly-xml

# Methods

	ParseString( xml_string, callback );

Where xml_string is an xml formatted string and callback is a function 
which takes one argument which will be the resulting json object of the parser or null if
the parser failed to read the supplied string
	
	asXML( json_object );

Returns an xml formatted string based on a json object. ( ie. json_object )

# Parsing Usage

Parsing is done in the expected way

	var FXML = require('friendly-xml');

	FXML.ParseString( xml_string, function( result )
	{
		//Result will be json object
		if( result != null ) { console.log( result ); }
	} );

# JSON Manipulation

Any actual xml values will be put in the "val" field. Any other xml attributes will be under their respective name.
Assuming the following xml:

	<Library>
	  <book Genre="horror">
		<Title>IT</Title>
	  </book>
	</Library>

The JSON object can be manipulated as follows:

	FXML.ParseString( data, function( result )
	{
		if( result.Library.book.Genre == "Horror" )
			console.log( result.Library.book.Title.val + " is a horror book!" );
			
		  result.Library.book.Title.val = "The Jungle Book";
		  result.Library.book.Genre = "Disney";
		  
		  //Or Alternatively
		  
		  result['Library']['book']['Title']['val'] = "The Jungle Book";
		  result['Library']['book']['Genre'] = "Disney";
		  
		  console.log( FXML.asXML( result ) );
	} );

The above would output:

	IT is a horror book!

	<Library>
	  <book Genre="Disney">
		<Title>The Jungle Book</Title>
	  </book>
	</Library>

( I realize "Disney" isn't actually a genre. Im tired huh? Been a long day )

Hopefully someone finds it of use though. I know I will!

# License

The MIT License (MIT)

Copyright (c) 2015 Vance Palacio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
