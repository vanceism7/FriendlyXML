# FriendlyXML
A basic xml parser/serializer inspired by PHP's SimpleXML

This is a basic sax-js based xml parser which converts an xml formatted string into a sensible json object which can be used to locate xml values, edit xml values, and serialize json objects back into an xml string. I'm more of a c#/c++ coder and am just barely dabbing into javascript and node so it may not be super stable but I think I've gotten the basic idea across.

# Methods

ParseString( xml_string, callback );
asXML( json_object ); //Returns string

# Parsing Usage
var FXML = require('./FriendlyXML');

//Parsing is done in the expected way
FXML.ParseString( xml_string, function( result )
{
    //Result will be json object
    console.log( result );
} );

# JSON Manipulation

Any actual xml values will be put in the "val" field. Any other xml attributes will be under their respective name.
Assuming the following xml

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

      console.log( FXML.asXML( result ) );
} );

The above would output
<Library>
  <book Genre="Disney">
    <Title>The Jungle Book</Title>
  </book>
</Library>

( I realize "Disney" isn't actually a genre. Im tired huh? Been a long day )

I just realized that this doesn't have support for multiple elements with the same name, aka arrays.
So I'll hopefully get to that soon. Hopefully someone finds it of use though. I know I will!
