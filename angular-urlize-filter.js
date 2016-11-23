angular.module('app').filter('urlize', function () {
    'use strict';

    return function (value) {
        if (value && angular.isString(value)) {
            var chars = [],
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
                removeDiacritics = function (str) {
                    for (var key in TURKISH_MAP) {
                        chars.push(key)
                    }
                    return str.replace(new RegExp(chars.join('|'), 'g'), function (key) {
                        return TURKISH_MAP[key]
                    });
                };

            return removeDiacritics(value)
                .replace(/[^A-Za-z0-9.,_~-]+/g, '-') // disallowed characters
                .replace(/[^A-Za-z0-9]+-|-[^A-Za-z0-9]+/g, '') // starting or ending dash
                .replace(/(^-)|(-$)/g, '-') // repeating dash
                .toLowerCase();
        }
    }
});
