(function() {
    var map = {},
        chars = [],
        TURKISH_MAP = {
	        'ş': 's',
	        'Ş': 'S',
	        'ı': 'i',
	        'İ': 'I',
	        'ç': 'c',
	        'Ç': 'C',
	        'ü': 'u',
	        'Ü': 'U',
	        'ö': 'o',
	        'Ö': 'O',
	        'ğ': 'g',
	        'Ğ': 'G'
	    },
        removeDiacritics = function(str) {
            for (var c in TURKISH_MAP) {
                if (TURKISH_MAP.hasOwnProperty(c)) {
                    map[c] = TURKISH_MAP[c];
                }
            }
            for (var k in map) {
                if (map.hasOwnProperty(k)) {
                    chars.push(k);
                }
            }
            var regex = new RegExp(chars.join('|'), 'g');
            return str.replace(regex, function(m) {
                return map[m];
            });
        };

    window.urlize = function urlize(value) {
        if (value) {
            var result = removeDiacritics(value)
            .replace(/[^A-Za-z0-9.,_~-]+/g, '-') // disallowed characters
            .replace(/(^-)|(-$)/g, '') // starting or ending dash
            .replace(/[^A-Za-z0-9]+-|-[^A-Za-z0-9]+/g, '-') // repeating dash
            .toLocaleLowerCase();
            return result;
        }
    }

})();