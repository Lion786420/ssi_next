"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/set-function-length";
exports.ids = ["vendor-chunks/set-function-length"];
exports.modules = {

/***/ "(api)/./src/pages/api/node_modules/set-function-length/index.js":
/*!*****************************************************************!*\
  !*** ./src/pages/api/node_modules/set-function-length/index.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar GetIntrinsic = __webpack_require__(/*! get-intrinsic */ \"(api)/./src/pages/api/node_modules/get-intrinsic/index.js\");\nvar define = __webpack_require__(/*! define-data-property */ \"(api)/./src/pages/api/node_modules/define-data-property/index.js\");\nvar hasDescriptors = __webpack_require__(/*! has-property-descriptors */ \"(api)/./src/pages/api/node_modules/has-property-descriptors/index.js\")();\nvar gOPD = __webpack_require__(/*! gopd */ \"(api)/./src/pages/api/node_modules/gopd/index.js\");\n\nvar $TypeError = __webpack_require__(/*! es-errors/type */ \"(api)/./src/pages/api/node_modules/es-errors/type.js\");\nvar $floor = GetIntrinsic('%Math.floor%');\n\n/** @typedef {(...args: unknown[]) => unknown} Func */\n\n/** @type {<T extends Func = Func>(fn: T, length: number, loose?: boolean) => T} */\nmodule.exports = function setFunctionLength(fn, length) {\n\tif (typeof fn !== 'function') {\n\t\tthrow new $TypeError('`fn` is not a function');\n\t}\n\tif (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {\n\t\tthrow new $TypeError('`length` must be a positive 32-bit integer');\n\t}\n\n\tvar loose = arguments.length > 2 && !!arguments[2];\n\n\tvar functionLengthIsConfigurable = true;\n\tvar functionLengthIsWritable = true;\n\tif ('length' in fn && gOPD) {\n\t\tvar desc = gOPD(fn, 'length');\n\t\tif (desc && !desc.configurable) {\n\t\t\tfunctionLengthIsConfigurable = false;\n\t\t}\n\t\tif (desc && !desc.writable) {\n\t\t\tfunctionLengthIsWritable = false;\n\t\t}\n\t}\n\n\tif (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {\n\t\tif (hasDescriptors) {\n\t\t\tdefine(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);\n\t\t} else {\n\t\t\tdefine(/** @type {Parameters<define>[0]} */ (fn), 'length', length);\n\t\t}\n\t}\n\treturn fn;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9zZXQtZnVuY3Rpb24tbGVuZ3RoL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLGdGQUFlO0FBQzFDLGFBQWEsbUJBQU8sQ0FBQyw4RkFBc0I7QUFDM0MscUJBQXFCLG1CQUFPLENBQUMsc0dBQTBCO0FBQ3ZELFdBQVcsbUJBQU8sQ0FBQyw4REFBTTs7QUFFekIsaUJBQWlCLG1CQUFPLENBQUMsNEVBQWdCO0FBQ3pDOztBQUVBLGNBQWMsaUNBQWlDOztBQUUvQyxXQUFXLHNFQUFzRTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDLElBQUk7QUFDSixxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaXNzdWVyX2hvbGRlcl92ZXJpZmllci8uL3NyYy9wYWdlcy9hcGkvbm9kZV9tb2R1bGVzL3NldC1mdW5jdGlvbi1sZW5ndGgvaW5kZXguanM/Yzc0OSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLWRhdGEtcHJvcGVydHknKTtcbnZhciBoYXNEZXNjcmlwdG9ycyA9IHJlcXVpcmUoJ2hhcy1wcm9wZXJ0eS1kZXNjcmlwdG9ycycpKCk7XG52YXIgZ09QRCA9IHJlcXVpcmUoJ2dvcGQnKTtcblxudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xudmFyICRmbG9vciA9IEdldEludHJpbnNpYygnJU1hdGguZmxvb3IlJyk7XG5cbi8qKiBAdHlwZWRlZiB7KC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdW5rbm93bn0gRnVuYyAqL1xuXG4vKiogQHR5cGUgezxUIGV4dGVuZHMgRnVuYyA9IEZ1bmM+KGZuOiBULCBsZW5ndGg6IG51bWJlciwgbG9vc2U/OiBib29sZWFuKSA9PiBUfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXRGdW5jdGlvbkxlbmd0aChmbiwgbGVuZ3RoKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYGZuYCBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHR9XG5cdGlmICh0eXBlb2YgbGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBsZW5ndGggPCAwIHx8IGxlbmd0aCA+IDB4RkZGRkZGRkYgfHwgJGZsb29yKGxlbmd0aCkgIT09IGxlbmd0aCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgbGVuZ3RoYCBtdXN0IGJlIGEgcG9zaXRpdmUgMzItYml0IGludGVnZXInKTtcblx0fVxuXG5cdHZhciBsb29zZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmICEhYXJndW1lbnRzWzJdO1xuXG5cdHZhciBmdW5jdGlvbkxlbmd0aElzQ29uZmlndXJhYmxlID0gdHJ1ZTtcblx0dmFyIGZ1bmN0aW9uTGVuZ3RoSXNXcml0YWJsZSA9IHRydWU7XG5cdGlmICgnbGVuZ3RoJyBpbiBmbiAmJiBnT1BEKSB7XG5cdFx0dmFyIGRlc2MgPSBnT1BEKGZuLCAnbGVuZ3RoJyk7XG5cdFx0aWYgKGRlc2MgJiYgIWRlc2MuY29uZmlndXJhYmxlKSB7XG5cdFx0XHRmdW5jdGlvbkxlbmd0aElzQ29uZmlndXJhYmxlID0gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChkZXNjICYmICFkZXNjLndyaXRhYmxlKSB7XG5cdFx0XHRmdW5jdGlvbkxlbmd0aElzV3JpdGFibGUgPSBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRpZiAoZnVuY3Rpb25MZW5ndGhJc0NvbmZpZ3VyYWJsZSB8fCBmdW5jdGlvbkxlbmd0aElzV3JpdGFibGUgfHwgIWxvb3NlKSB7XG5cdFx0aWYgKGhhc0Rlc2NyaXB0b3JzKSB7XG5cdFx0XHRkZWZpbmUoLyoqIEB0eXBlIHtQYXJhbWV0ZXJzPGRlZmluZT5bMF19ICovIChmbiksICdsZW5ndGgnLCBsZW5ndGgsIHRydWUsIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWZpbmUoLyoqIEB0eXBlIHtQYXJhbWV0ZXJzPGRlZmluZT5bMF19ICovIChmbiksICdsZW5ndGgnLCBsZW5ndGgpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZm47XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/set-function-length/index.js\n");

/***/ })

};
;