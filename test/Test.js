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

QUnit.test( 'ParseTest2', function ParseTest1( assert )
{
    var data = '<Library><book Genre="horror"><Title>IT</Title></book><book Genre="Disney"><Title>Toy Story</Title></book></Library>'

    FXML.ParseString( data, function( result )
    {
        assert.equal( 2, result.Library.book.length )
        assert.equal( result.Library.book[0].Title.val, "IT" );
        assert.equal( result.Library.book[0].Genre, "horror" );
        assert.equal( result.Library.book[1].Title.val, "Toy Story" );
        assert.equal( result.Library.book[1].Genre, "Disney" );
    } );
} )

QUnit.test( 'ParseTest3', function ParseTest1( assert )
{
    var data = '<Library><book Genre="horror"><Title Special="True">IT</Title></book><book Genre="Disney"><Title>Toy Story</Title></book></Library>'

    FXML.ParseString( data, function( result )
    {
        assert.equal( 2, result.Library.book.length )
        assert.equal( result.Library.book[0].Title.val, "IT" );
        assert.equal( result.Library.book[0].Title.Special, "True" );
        assert.equal( result.Library.book[0].Genre, "horror" );
        assert.equal( result.Library.book[1].Title.val, "Toy Story" );
        assert.equal( result.Library.book[1].Genre, "Disney" );
    } );
} )

QUnit.test( 'MultiTitleTest', function ParseTest1( assert )
{
    var data = '<Library><book Genre="horror"><Title Special="True">IT</Title><Title Special="False">Toy Story</Title></book></Library>'

    FXML.ParseString( data, function( result )
    {
        assert.equal( 2, result.Library.book.Title.length )
        assert.equal( result.Library.book.Title[0].val, "IT" );
        assert.equal( result.Library.book.Title[0].Special, "True" );
        assert.equal( result.Library.book.Title[1].val, "Toy Story" );
        assert.equal( result.Library.book.Title[1].Special, "False" );
    } );
} )

QUnit.test( 'MultiTitleTest2', function ParseTest1( assert )
{
    var data = '<Library><book Genre="horror"><Title Special="True">IT</Title><Title>Toy Story</Title></book></Library>'

    FXML.ParseString( data, function( result )
    {
        assert.equal( 2, result.Library.book.Title.length )
        assert.equal( result.Library.book.Title[0].val, "IT" );
        assert.equal( result.Library.book.Title[0].Special, "True" );
        assert.equal( result.Library.book.Title[1].val, "Toy Story" );
        assert.equal( typeof result.Library.book.Title[1].Special, 'undefined' );
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

QUnit.test( 'asXmlTest2', function ParseTest1( assert )
{
    var expected = "<Library><book Genre='Disney'><Title>The Jungle Book</Title></book></Library>"

    var obj = {
        "Library" : {
            "book" : {
                "Genre" : "Disney",
                "Title" : { "val" : "The Jungle Book" }
            }
        }
    }

    assert.equal( FXML.asXML( obj ), expected )
} )

QUnit.test( 'asXmlTest3', function ParseTest1( assert )
{
    var expected = "<Library><book Genre='Disney'><Title>The Jungle Book</Title></book><book Genre='Thriller'><Title>Maze Runner</Title></book></Library>"

    var obj = {
        "Library" : {
            "book" : [ 
                {
                    "Genre" : "Disney",
                    "Title" : { "val" : "The Jungle Book" }
                },
                {
                    "Genre": "Thriller",
                    "Title" : { "val" : "Maze Runner" } 
                }
            ]
        }
    }

    assert.equal( FXML.asXML( obj ), expected )
} )