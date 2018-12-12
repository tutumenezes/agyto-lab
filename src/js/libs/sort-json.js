;function SortJSON( data, key, isAscending ) {

  return data.sort( function( a, b ) {
    var x = a[key];
    var y = b[key];

    if ( isAscending ) {
      return ( ( x < y ) ? -1 : ( ( x > y ) ? 1 : 0 ) );
    } else {
      return ( ( x > y ) ? -1 : ( ( x < y ) ? 1 : 0 ) );
    }
  });

};
