var sax = require('sax' );
var parser = sax.parser( true, {trim: true} );

function ParseString( arg_string, arg_callback )
{
    var xml = { };
    var current = xml;
    var parent = [];
    var attributes = [];

    parser.onerror = function (e)
    {
        console.log( e );
    };

    parser.onopentag = function (node)
    {
        //Doesn't already exist
        if( typeof current[node.name] == 'undefined' )
        {
            parent.push( current );
            current[node.name] = { };
            current = current[node.name];
        }
        else
        {
            var c = current[node.name];
            current[node.name] = [ ];
            current[node.name].push( c );
            current[node.name].push( { } );
            var l = current[node.name].length;

            parent.push( current[node.name] );
            current = current[node.name][l-1];
        }

        for( var i = 0; i < attributes.length; ++i )
        {
            current[attributes[i].name] = attributes[i].value;
        }
        attributes = []
    };

    parser.ontext = function (t)
    {
        if( typeof parent[parent.length-1].length == "undefined" )
        {
            parent[parent.length-1][parser.tag.name]["val"] = t;
        }
        else if( typeof parent[parent.length-1].length != 'undefined' )
        {
            var l = parent[parent.length-1].length;
            parent[parent.length-1][l-1]["val"] = t;
        }
    };

    parser.onclosetag = function (tagName)
    {
        current = parent[parent.length-1];
        parent.pop();
    }

    parser.onattribute = function (attr)
    {
        // an attribute.  attr has "name" and "value"
        attributes.push( attr );
    };

    parser.onend = function()
    {
        arg_callback( xml );
    };

    parser.write( arg_string ).end();
}

/*
function asXML( json_obj, bool_pretty )
{
    var result = genXML( json_obj );
    if( bool_pretty ) result = pd.xml( result );

    return result;
}
*/

function asXML( json_obj )
{
    var result = "";

    for( var p in json_obj )
    {
        if( json_obj.hasOwnProperty( p ) )
        {
            if( typeof( json_obj[p] ) == 'object' )
            {
                result += "<" + p + getAttr( json_obj[p] ) + ">";
                result += asXML( json_obj[p] );
                result += "<\\" + p + ">";
            }
            else if( p == "val" ) result += json_obj[p];
        }
    }

    return result;
}

function getAttr( json_obj )
{
    var result = "";

    for( var p in json_obj )
    {
        if( json_obj.hasOwnProperty( p ) )
            if( typeof( json_obj[p] ) != 'object' )
                if( p != "val" )
                    result += " " + p + "='" + json_obj[p] + "'";
    }

    return result;
}

exports.ParseString = ParseString;
exports.asXML = asXML;