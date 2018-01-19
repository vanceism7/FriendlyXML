var sax = require('sax');

function ParseString( arg_string, arg_callback )
{
	var parser = sax.parser( true, {trim: true} );
	
	var xml = { };
    var current = xml;
    var parent = [];
    var attributes = [];

    parser.onerror = function (e)
    {
		delete parser;
    };

    parser.onopentag = function (node)
    {
        //First encounter of xml tag
        if( typeof current[node.name] == 'undefined' )
            CreateNewXmlNode( node );
        else //tag occurs multiple times -- make node an array of tags
            TransformXmlNodeToArray( node );

        attributes.forEach( a => current[a.name] = a.value );
        attributes = [];
    };

    function CreateNewXmlNode( node )
    {
        parent.push( current );
        current = NewNode( node.name );
    }

    function NewNode( NodeName )
    {
        current[NodeName] = { };
        return current[NodeName];
    }

    function TransformXmlNodeToArray( node )
    {
        var c = current[node.name];
        current[node.name] = [ ];
        current[node.name].push( c );
        current[node.name].push( { } );
        
        var l = current[node.name].length;
        parent.push( current[node.name] );
        current = current[node.name][l-1];
    }

    parser.ontext = function (value)
    {
        var LastNode = parent[parent.length-1];

        if( typeof LastNode.length == "undefined" )
        {
            LastNode[parser.tag.name]["val"] = value;
        }
        else if( typeof LastNode.length != 'undefined' )
        {
            var l = LastNode.length;
            LastNode[l-1]["val"] = value;
        }
    };

    parser.onclosetag = (tagName) =>
        current = parent.pop();

    parser.onattribute = (attr) =>
        attributes.push( attr );

    parser.onend = () => 
        arg_callback( xml )

	try
	{
		parser.write( arg_string ).close();
	}
	catch( ex )
	{
		console.log( "XML Read Error" );
		arg_callback( null );
	}
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
            if( typeof json_obj[p] == "object" )
            {
                //Is a single node
                if( typeof json_obj[p].length == 'undefined' )
                {
                    result += "<" + p + getAttr( json_obj[p] ) + ">";
                    result += asXML( json_obj[p] );
                    result += "</" + p + ">";
                }
                //Is an array node
                else if( typeof json_obj[p].length != 'undefined' )
                {
                    for( var i = 0; i < json_obj[p].length; ++i )
                    {
                        result += "<" + p + getAttr( json_obj[p][i] ) + ">";
                        result += asXML( json_obj[p][i] );
                        result += "</" + p + ">";
                    }
                }
            }
            else if( p == "val") result += json_obj[p];
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
