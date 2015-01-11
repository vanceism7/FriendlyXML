# FriendlyXML
A basic xml parser/serializer inspired by PHP's SimpleXML

This is a basic sax-js based xml parser which converts an xml formatted string into a sensible json object which can be used to locate xml values, edit xml values, and serialize json objects back into an xml string. I'm more of a c#/c++ coder and am just barely dabbing into javascript and node so if you look at the code and you're like, "Dang what a newb!", don't be so hard on me cuz I coded this quick status lol. Consequently, It may not be super stable but I think I've gotten the basic idea across.

# Methods

ParseString( xml_string, callback );

Where xml_string is an xml formatted string and callback is a function 
which takes one argument which will be the resulting json object of the parser.
	
asXML( json_object );

Returns an xml formatted string based on a json object. ( ie. json_object )

# Parsing Usage

Parsing is done in the expected way
	var FXML = require('./FriendlyXML');

	FXML.ParseString( xml_string, function( result )
	{
		//Result will be json object
		console.log( result );
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

Other Note: I also realize that this readme is really messed up. I don't know markdown language...
Ill fix it eventually. 

I haven't gotten it up on NPM yet but Ill definitely try to do that in the future when I know its
more stable. All you basically need is the FriendlyXML.js file and you should be able to use the module.
Hopefully someone finds it of use though. I know I will!
