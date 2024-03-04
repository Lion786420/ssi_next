"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/toidentifier";
exports.ids = ["vendor-chunks/toidentifier"];
exports.modules = {

/***/ "(api)/./src/pages/api/node_modules/toidentifier/index.js":
/*!**********************************************************!*\
  !*** ./src/pages/api/node_modules/toidentifier/index.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("/*!\n * toidentifier\n * Copyright(c) 2016 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = toIdentifier\n\n/**\n * Trasform the given string into a JavaScript identifier\n *\n * @param {string} str\n * @returns {string}\n * @public\n */\n\nfunction toIdentifier (str) {\n  return str\n    .split(' ')\n    .map(function (token) {\n      return token.slice(0, 1).toUpperCase() + token.slice(1)\n    })\n    .join('')\n    .replace(/[^ _0-9a-z]/gi, '')\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy90b2lkZW50aWZpZXIvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pc3N1ZXJfaG9sZGVyX3ZlcmlmaWVyLy4vc3JjL3BhZ2VzL2FwaS9ub2RlX21vZHVsZXMvdG9pZGVudGlmaWVyL2luZGV4LmpzPzAyMmMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiB0b2lkZW50aWZpZXJcbiAqIENvcHlyaWdodChjKSAyMDE2IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4ndXNlIHN0cmljdCdcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqIEBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvSWRlbnRpZmllclxuXG4vKipcbiAqIFRyYXNmb3JtIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gdG9JZGVudGlmaWVyIChzdHIpIHtcbiAgcmV0dXJuIHN0clxuICAgIC5zcGxpdCgnICcpXG4gICAgLm1hcChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgIHJldHVybiB0b2tlbi5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpICsgdG9rZW4uc2xpY2UoMSlcbiAgICB9KVxuICAgIC5qb2luKCcnKVxuICAgIC5yZXBsYWNlKC9bXiBfMC05YS16XS9naSwgJycpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/toidentifier/index.js\n");

/***/ })

};
;