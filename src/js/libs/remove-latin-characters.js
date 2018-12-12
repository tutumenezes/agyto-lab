;function RemoveLatinCharacters( string ) {
  var latinCharacters = {
    'â': 'a',
    'à': 'a',
    'á': 'a',
    'ã': 'a',
    'ê': 'e',
    'è': 'e',
    'é': 'e',
    'î': 'i',
    'ì': 'i',
    'í': 'i',
    'õ': 'o',
    'ô': 'o',
    'ò': 'o',
    'ó': 'o',
    'ü': 'u',
    'û': 'u',
    'ú': 'u',
    'ù': 'u',
    'ç': 'c'
  }

  return string.replace( /[\W\[\] ]/g, function( l ) {
    return latinCharacters[l] || l
  });
};
