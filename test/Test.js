var FXML = require('../FriendlyXML');
var qunit = require('qunit');

QUnit.test( 'ParseTest1', function ParseTest1( assert )
{
    var data = '<Library><book Genre="horror"><Title>IT</Title></book></Library>'

    FXML.ParseString( data, function( result )
    {
        assert.equal( result.Library.book.Title.val, "IT" );
        assert.equal( result.Library.book.Genre, "horror" );
    } );
} )

QUnit.test( 'asXmlTest', function ParseTest1( assert )
{
    var data = "<Library><book Genre='horror'><Title>IT</Title></book></Library>"
    var expected = "<Library><book Genre='Disney'><Title>The Jungle Book</Title></book></Library>"

    FXML.ParseString( data, function( result )
    {
        result.Library.book.Title.val = "The Jungle Book";
        result.Library.book.Genre = "Disney";

        assert.equal( FXML.asXML( result ), expected )
    } );
} )