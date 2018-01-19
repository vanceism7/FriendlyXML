var sax = require('sax');

const val = "val"

function ParseString( arg_string, arg_callback )
{
	var parser = sax.parser( true, {trim: true} );
	
	var xml = { };
    var current = xml;
    var parent = [];
    var attributes = [];

    function Undefined(x) { return typeof x == 'undefined' }
    function ArrayLast(x) { return x[x.length-1]; }

    parser.onopentag = function (node)
    {
        //First encounter of xml tag
        if( Undefined( current[node.name] ) )
            CreateNewXmlNode( node );
        else 
        {
            //tag occurs multiple times -- make node into an array of nodes
            TransformXmlNodeToArray( node );

            parent.push( current[node.name] );
            current = ArrayLast( current[node.name] );
        }
        
        ProcessAttributes();
    };

    function CreateNewXmlNode( node )
    {
        parent.push( current );
        current[node.name] = { };
        current = current[node.name];
    }

    function TransformXmlNodeToArray( node )
    {
        var c = current[node.name];
        current[node.name] = [ ];
        current[node.name].push( c );
        current[node.name].push( { } );
    }

    function ProcessAttributes()
    {
        attributes.forEach( a => current[a.name] = a.value );
        attributes = [];
    }

    parser.ontext = function (value)
    {
        var LastNode = parent[parent.length-1];

        if( LastNode instanceof Array )
            ArrayLast( LastNode )[val] = value;
        else
            LastNode[parser.tag.name][val] = value;
    };

    parser.onclosetag = (tagName) =>
        current = parent.pop();

    parser.onattribute = (attr) =>
        attributes.push( attr );

    parser.onend = () => 
        arg_callback( xml )

    parser.onerror = (e) =>
		delete parser;

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

function asXML( json_obj )
{
    var result = "";

    for( var prop in json_obj )
    {
        if( json_obj.hasOwnProperty( prop ) )
        {
            if( json_obj[prop] instanceof Object )
            {
                if( json_obj[prop] instanceof Array )
                    result += ProcessArrayNode( prop, json_obj )
                else
                    result += ProcessSingleNode( prop, json_obj );   
            }
            else if( prop == "val" ) 
                result += json_obj[prop];
        }
    }

    return result;

    function ProcessSingleNode( prop, json_obj )
    {
        var result = "<" + prop + getAttr( json_obj[prop] ) + ">";
        result += asXML( json_obj[prop] );
        result += "</" + prop + ">";

        return result;
    }

    function ProcessArrayNode( prop, json_obj )
    {
        var result = ""
        for( var i = 0; i < json_obj[prop].length; ++i )
        {
            result += "<" + prop + getAttr( json_obj[prop][i] ) + ">";
            result += asXML( json_obj[prop][i] );
            result += "</" + prop + ">";
        }

        return result;
    }

    function getAttr( json_obj )
    {
        var result = "";

        for( var prop in json_obj )
        {
            if( json_obj.hasOwnProperty( prop ) )
                if( typeof( json_obj[prop] ) != 'object' )
                    if( prop != val )
                        result += " " + prop + "='" + json_obj[prop] + "'";
        }

        return result;
    }
}

exports.ParseString = ParseString;
exports.asXML = asXML;