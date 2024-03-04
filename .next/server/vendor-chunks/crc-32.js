/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/crc-32";
exports.ids = ["vendor-chunks/crc-32"];
exports.modules = {

/***/ "(api)/./src/pages/api/node_modules/crc-32/crc32.js":
/*!****************************************************!*\
  !*** ./src/pages/api/node_modules/crc-32/crc32.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */\n/* vim: set ts=2: */\n/*exported CRC32 */\nvar CRC32;\n(function (factory) {\n\t/*jshint ignore:start */\n\t/*eslint-disable */\n\tif(typeof DO_NOT_EXPORT_CRC === 'undefined') {\n\t\tif(true) {\n\t\t\tfactory(exports);\n\t\t} else {}\n\t} else {\n\t\tfactory(CRC32 = {});\n\t}\n\t/*eslint-enable */\n\t/*jshint ignore:end */\n}(function(CRC32) {\nCRC32.version = '1.2.2';\n/*global Int32Array */\nfunction signed_crc_table() {\n\tvar c = 0, table = new Array(256);\n\n\tfor(var n =0; n != 256; ++n){\n\t\tc = n;\n\t\tc = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));\n\t\tc = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));\n\t\tc = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));\n\t\tc = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));\n\t\tc = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));\n\t\tc = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));\n\t\tc = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));\n\t\tc = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));\n\t\ttable[n] = c;\n\t}\n\n\treturn typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;\n}\n\nvar T0 = signed_crc_table();\nfunction slice_by_16_tables(T) {\n\tvar c = 0, v = 0, n = 0, table = typeof Int32Array !== 'undefined' ? new Int32Array(4096) : new Array(4096) ;\n\n\tfor(n = 0; n != 256; ++n) table[n] = T[n];\n\tfor(n = 0; n != 256; ++n) {\n\t\tv = T[n];\n\t\tfor(c = 256 + n; c < 4096; c += 256) v = table[c] = (v >>> 8) ^ T[v & 0xFF];\n\t}\n\tvar out = [];\n\tfor(n = 1; n != 16; ++n) out[n - 1] = typeof Int32Array !== 'undefined' ? table.subarray(n * 256, n * 256 + 256) : table.slice(n * 256, n * 256 + 256);\n\treturn out;\n}\nvar TT = slice_by_16_tables(T0);\nvar T1 = TT[0],  T2 = TT[1],  T3 = TT[2],  T4 = TT[3],  T5 = TT[4];\nvar T6 = TT[5],  T7 = TT[6],  T8 = TT[7],  T9 = TT[8],  Ta = TT[9];\nvar Tb = TT[10], Tc = TT[11], Td = TT[12], Te = TT[13], Tf = TT[14];\nfunction crc32_bstr(bstr, seed) {\n\tvar C = seed ^ -1;\n\tfor(var i = 0, L = bstr.length; i < L;) C = (C>>>8) ^ T0[(C^bstr.charCodeAt(i++))&0xFF];\n\treturn ~C;\n}\n\nfunction crc32_buf(B, seed) {\n\tvar C = seed ^ -1, L = B.length - 15, i = 0;\n\tfor(; i < L;) C =\n\t\tTf[B[i++] ^ (C & 255)] ^\n\t\tTe[B[i++] ^ ((C >> 8) & 255)] ^\n\t\tTd[B[i++] ^ ((C >> 16) & 255)] ^\n\t\tTc[B[i++] ^ (C >>> 24)] ^\n\t\tTb[B[i++]] ^ Ta[B[i++]] ^ T9[B[i++]] ^ T8[B[i++]] ^\n\t\tT7[B[i++]] ^ T6[B[i++]] ^ T5[B[i++]] ^ T4[B[i++]] ^\n\t\tT3[B[i++]] ^ T2[B[i++]] ^ T1[B[i++]] ^ T0[B[i++]];\n\tL += 15;\n\twhile(i < L) C = (C>>>8) ^ T0[(C^B[i++])&0xFF];\n\treturn ~C;\n}\n\nfunction crc32_str(str, seed) {\n\tvar C = seed ^ -1;\n\tfor(var i = 0, L = str.length, c = 0, d = 0; i < L;) {\n\t\tc = str.charCodeAt(i++);\n\t\tif(c < 0x80) {\n\t\t\tC = (C>>>8) ^ T0[(C^c)&0xFF];\n\t\t} else if(c < 0x800) {\n\t\t\tC = (C>>>8) ^ T0[(C ^ (192|((c>>6)&31)))&0xFF];\n\t\t\tC = (C>>>8) ^ T0[(C ^ (128|(c&63)))&0xFF];\n\t\t} else if(c >= 0xD800 && c < 0xE000) {\n\t\t\tc = (c&1023)+64; d = str.charCodeAt(i++)&1023;\n\t\t\tC = (C>>>8) ^ T0[(C ^ (240|((c>>8)&7)))&0xFF];\n\t\t\tC = (C>>>8) ^ T0[(C ^ (128|((c>>2)&63)))&0xFF];\n\t\t\tC = (C>>>8) ^ T0[(C ^ (128|((d>>6)&15)|((c&3)<<4)))&0xFF];\n\t\t\tC = (C>>>8) ^ T0[(C ^ (128|(d&63)))&0xFF];\n\t\t} else {\n\t\t\tC = (C>>>8) ^ T0[(C ^ (224|((c>>12)&15)))&0xFF];\n\t\t\tC = (C>>>8) ^ T0[(C ^ (128|((c>>6)&63)))&0xFF];\n\t\t\tC = (C>>>8) ^ T0[(C ^ (128|(c&63)))&0xFF];\n\t\t}\n\t}\n\treturn ~C;\n}\nCRC32.table = T0;\n// $FlowIgnore\nCRC32.bstr = crc32_bstr;\n// $FlowIgnore\nCRC32.buf = crc32_buf;\n// $FlowIgnore\nCRC32.str = crc32_str;\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9jcmMtMzIvY3JjMzIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBMkI7QUFDaEM7QUFDQSxJQUFJLEtBQUssRUFRTjtBQUNILEdBQUc7QUFDSCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsVUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFlBQVksVUFBVTtBQUN0QixZQUFZLFVBQVU7QUFDdEI7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsTUFBTTtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPLE1BQU07QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSixvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pc3N1ZXJfaG9sZGVyX3ZlcmlmaWVyLy4vc3JjL3BhZ2VzL2FwaS9ub2RlX21vZHVsZXMvY3JjLTMyL2NyYzMyLmpzP2Y5MzkiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIGNyYzMyLmpzIChDKSAyMDE0LXByZXNlbnQgU2hlZXRKUyAtLSBodHRwOi8vc2hlZXRqcy5jb20gKi9cbi8qIHZpbTogc2V0IHRzPTI6ICovXG4vKmV4cG9ydGVkIENSQzMyICovXG52YXIgQ1JDMzI7XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0Lypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdC8qZXNsaW50LWRpc2FibGUgKi9cblx0aWYodHlwZW9mIERPX05PVF9FWFBPUlRfQ1JDID09PSAndW5kZWZpbmVkJykge1xuXHRcdGlmKCdvYmplY3QnID09PSB0eXBlb2YgZXhwb3J0cykge1xuXHRcdFx0ZmFjdG9yeShleHBvcnRzKTtcblx0XHR9IGVsc2UgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuXHRcdFx0ZGVmaW5lKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIG1vZHVsZSA9IHt9O1xuXHRcdFx0XHRmYWN0b3J5KG1vZHVsZSk7XG5cdFx0XHRcdHJldHVybiBtb2R1bGU7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmFjdG9yeShDUkMzMiA9IHt9KTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0ZmFjdG9yeShDUkMzMiA9IHt9KTtcblx0fVxuXHQvKmVzbGludC1lbmFibGUgKi9cblx0Lypqc2hpbnQgaWdub3JlOmVuZCAqL1xufShmdW5jdGlvbihDUkMzMikge1xuQ1JDMzIudmVyc2lvbiA9ICcxLjIuMic7XG4vKmdsb2JhbCBJbnQzMkFycmF5ICovXG5mdW5jdGlvbiBzaWduZWRfY3JjX3RhYmxlKCkge1xuXHR2YXIgYyA9IDAsIHRhYmxlID0gbmV3IEFycmF5KDI1Nik7XG5cblx0Zm9yKHZhciBuID0wOyBuICE9IDI1NjsgKytuKXtcblx0XHRjID0gbjtcblx0XHRjID0gKChjJjEpID8gKC0zMDY2NzQ5MTIgXiAoYyA+Pj4gMSkpIDogKGMgPj4+IDEpKTtcblx0XHRjID0gKChjJjEpID8gKC0zMDY2NzQ5MTIgXiAoYyA+Pj4gMSkpIDogKGMgPj4+IDEpKTtcblx0XHRjID0gKChjJjEpID8gKC0zMDY2NzQ5MTIgXiAoYyA+Pj4gMSkpIDogKGMgPj4+IDEpKTtcblx0XHRjID0gKChjJjEpID8gKC0zMDY2NzQ5MTIgXiAoYyA+Pj4gMSkpIDogKGMgPj4+IDEpKTtcblx0XHRjID0gKChjJjEpID8gKC0zMDY2NzQ5MTIgXiAoYyA+Pj4gMSkpIDogKGMgPj4+IDEpKTtcblx0XHRjID0gKChjJjEpID8gKC0zMDY2NzQ5MTIgXiAoYyA+Pj4gMSkpIDogKGMgPj4+IDEpKTtcblx0XHRjID0gKChjJjEpID8gKC0zMDY2NzQ5MTIgXiAoYyA+Pj4gMSkpIDogKGMgPj4+IDEpKTtcblx0XHRjID0gKChjJjEpID8gKC0zMDY2NzQ5MTIgXiAoYyA+Pj4gMSkpIDogKGMgPj4+IDEpKTtcblx0XHR0YWJsZVtuXSA9IGM7XG5cdH1cblxuXHRyZXR1cm4gdHlwZW9mIEludDMyQXJyYXkgIT09ICd1bmRlZmluZWQnID8gbmV3IEludDMyQXJyYXkodGFibGUpIDogdGFibGU7XG59XG5cbnZhciBUMCA9IHNpZ25lZF9jcmNfdGFibGUoKTtcbmZ1bmN0aW9uIHNsaWNlX2J5XzE2X3RhYmxlcyhUKSB7XG5cdHZhciBjID0gMCwgdiA9IDAsIG4gPSAwLCB0YWJsZSA9IHR5cGVvZiBJbnQzMkFycmF5ICE9PSAndW5kZWZpbmVkJyA/IG5ldyBJbnQzMkFycmF5KDQwOTYpIDogbmV3IEFycmF5KDQwOTYpIDtcblxuXHRmb3IobiA9IDA7IG4gIT0gMjU2OyArK24pIHRhYmxlW25dID0gVFtuXTtcblx0Zm9yKG4gPSAwOyBuICE9IDI1NjsgKytuKSB7XG5cdFx0diA9IFRbbl07XG5cdFx0Zm9yKGMgPSAyNTYgKyBuOyBjIDwgNDA5NjsgYyArPSAyNTYpIHYgPSB0YWJsZVtjXSA9ICh2ID4+PiA4KSBeIFRbdiAmIDB4RkZdO1xuXHR9XG5cdHZhciBvdXQgPSBbXTtcblx0Zm9yKG4gPSAxOyBuICE9IDE2OyArK24pIG91dFtuIC0gMV0gPSB0eXBlb2YgSW50MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyB0YWJsZS5zdWJhcnJheShuICogMjU2LCBuICogMjU2ICsgMjU2KSA6IHRhYmxlLnNsaWNlKG4gKiAyNTYsIG4gKiAyNTYgKyAyNTYpO1xuXHRyZXR1cm4gb3V0O1xufVxudmFyIFRUID0gc2xpY2VfYnlfMTZfdGFibGVzKFQwKTtcbnZhciBUMSA9IFRUWzBdLCAgVDIgPSBUVFsxXSwgIFQzID0gVFRbMl0sICBUNCA9IFRUWzNdLCAgVDUgPSBUVFs0XTtcbnZhciBUNiA9IFRUWzVdLCAgVDcgPSBUVFs2XSwgIFQ4ID0gVFRbN10sICBUOSA9IFRUWzhdLCAgVGEgPSBUVFs5XTtcbnZhciBUYiA9IFRUWzEwXSwgVGMgPSBUVFsxMV0sIFRkID0gVFRbMTJdLCBUZSA9IFRUWzEzXSwgVGYgPSBUVFsxNF07XG5mdW5jdGlvbiBjcmMzMl9ic3RyKGJzdHIsIHNlZWQpIHtcblx0dmFyIEMgPSBzZWVkIF4gLTE7XG5cdGZvcih2YXIgaSA9IDAsIEwgPSBic3RyLmxlbmd0aDsgaSA8IEw7KSBDID0gKEM+Pj44KSBeIFQwWyhDXmJzdHIuY2hhckNvZGVBdChpKyspKSYweEZGXTtcblx0cmV0dXJuIH5DO1xufVxuXG5mdW5jdGlvbiBjcmMzMl9idWYoQiwgc2VlZCkge1xuXHR2YXIgQyA9IHNlZWQgXiAtMSwgTCA9IEIubGVuZ3RoIC0gMTUsIGkgPSAwO1xuXHRmb3IoOyBpIDwgTDspIEMgPVxuXHRcdFRmW0JbaSsrXSBeIChDICYgMjU1KV0gXlxuXHRcdFRlW0JbaSsrXSBeICgoQyA+PiA4KSAmIDI1NSldIF5cblx0XHRUZFtCW2krK10gXiAoKEMgPj4gMTYpICYgMjU1KV0gXlxuXHRcdFRjW0JbaSsrXSBeIChDID4+PiAyNCldIF5cblx0XHRUYltCW2krK11dIF4gVGFbQltpKytdXSBeIFQ5W0JbaSsrXV0gXiBUOFtCW2krK11dIF5cblx0XHRUN1tCW2krK11dIF4gVDZbQltpKytdXSBeIFQ1W0JbaSsrXV0gXiBUNFtCW2krK11dIF5cblx0XHRUM1tCW2krK11dIF4gVDJbQltpKytdXSBeIFQxW0JbaSsrXV0gXiBUMFtCW2krK11dO1xuXHRMICs9IDE1O1xuXHR3aGlsZShpIDwgTCkgQyA9IChDPj4+OCkgXiBUMFsoQ15CW2krK10pJjB4RkZdO1xuXHRyZXR1cm4gfkM7XG59XG5cbmZ1bmN0aW9uIGNyYzMyX3N0cihzdHIsIHNlZWQpIHtcblx0dmFyIEMgPSBzZWVkIF4gLTE7XG5cdGZvcih2YXIgaSA9IDAsIEwgPSBzdHIubGVuZ3RoLCBjID0gMCwgZCA9IDA7IGkgPCBMOykge1xuXHRcdGMgPSBzdHIuY2hhckNvZGVBdChpKyspO1xuXHRcdGlmKGMgPCAweDgwKSB7XG5cdFx0XHRDID0gKEM+Pj44KSBeIFQwWyhDXmMpJjB4RkZdO1xuXHRcdH0gZWxzZSBpZihjIDwgMHg4MDApIHtcblx0XHRcdEMgPSAoQz4+PjgpIF4gVDBbKEMgXiAoMTkyfCgoYz4+NikmMzEpKSkmMHhGRl07XG5cdFx0XHRDID0gKEM+Pj44KSBeIFQwWyhDIF4gKDEyOHwoYyY2MykpKSYweEZGXTtcblx0XHR9IGVsc2UgaWYoYyA+PSAweEQ4MDAgJiYgYyA8IDB4RTAwMCkge1xuXHRcdFx0YyA9IChjJjEwMjMpKzY0OyBkID0gc3RyLmNoYXJDb2RlQXQoaSsrKSYxMDIzO1xuXHRcdFx0QyA9IChDPj4+OCkgXiBUMFsoQyBeICgyNDB8KChjPj44KSY3KSkpJjB4RkZdO1xuXHRcdFx0QyA9IChDPj4+OCkgXiBUMFsoQyBeICgxMjh8KChjPj4yKSY2MykpKSYweEZGXTtcblx0XHRcdEMgPSAoQz4+PjgpIF4gVDBbKEMgXiAoMTI4fCgoZD4+NikmMTUpfCgoYyYzKTw8NCkpKSYweEZGXTtcblx0XHRcdEMgPSAoQz4+PjgpIF4gVDBbKEMgXiAoMTI4fChkJjYzKSkpJjB4RkZdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRDID0gKEM+Pj44KSBeIFQwWyhDIF4gKDIyNHwoKGM+PjEyKSYxNSkpKSYweEZGXTtcblx0XHRcdEMgPSAoQz4+PjgpIF4gVDBbKEMgXiAoMTI4fCgoYz4+NikmNjMpKSkmMHhGRl07XG5cdFx0XHRDID0gKEM+Pj44KSBeIFQwWyhDIF4gKDEyOHwoYyY2MykpKSYweEZGXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIH5DO1xufVxuQ1JDMzIudGFibGUgPSBUMDtcbi8vICRGbG93SWdub3JlXG5DUkMzMi5ic3RyID0gY3JjMzJfYnN0cjtcbi8vICRGbG93SWdub3JlXG5DUkMzMi5idWYgPSBjcmMzMl9idWY7XG4vLyAkRmxvd0lnbm9yZVxuQ1JDMzIuc3RyID0gY3JjMzJfc3RyO1xufSkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/crc-32/crc32.js\n");

/***/ })

};
;