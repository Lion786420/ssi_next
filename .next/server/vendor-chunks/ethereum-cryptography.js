"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ethereum-cryptography";
exports.ids = ["vendor-chunks/ethereum-cryptography"];
exports.modules = {

/***/ "(api)/./src/pages/api/node_modules/ethereum-cryptography/aes.js":
/*!*****************************************************************!*\
  !*** ./src/pages/api/node_modules/ethereum-cryptography/aes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.decrypt = exports.encrypt = void 0;\nconst crypto_1 = __webpack_require__(/*! @noble/hashes/crypto */ \"(api)/./src/pages/api/node_modules/@noble/hashes/cryptoNode.js\");\nconst utils_js_1 = __webpack_require__(/*! ./utils.js */ \"(api)/./src/pages/api/node_modules/ethereum-cryptography/utils.js\");\nconst crypto = { web: crypto_1.crypto };\nfunction validateOpt(key, iv, mode) {\n    if (!mode.startsWith(\"aes-\")) {\n        throw new Error(`AES submodule doesn't support mode ${mode}`);\n    }\n    if (iv.length !== 16) {\n        throw new Error(\"AES: wrong IV length\");\n    }\n    if ((mode.startsWith(\"aes-128\") && key.length !== 16) ||\n        (mode.startsWith(\"aes-256\") && key.length !== 32)) {\n        throw new Error(\"AES: wrong key length\");\n    }\n}\nasync function getBrowserKey(mode, key, iv) {\n    if (!crypto.web) {\n        throw new Error(\"Browser crypto not available.\");\n    }\n    let keyMode;\n    if ([\"aes-128-cbc\", \"aes-256-cbc\"].includes(mode)) {\n        keyMode = \"cbc\";\n    }\n    if ([\"aes-128-ctr\", \"aes-256-ctr\"].includes(mode)) {\n        keyMode = \"ctr\";\n    }\n    if (!keyMode) {\n        throw new Error(\"AES: unsupported mode\");\n    }\n    const wKey = await crypto.web.subtle.importKey(\"raw\", key, { name: `AES-${keyMode.toUpperCase()}`, length: key.length * 8 }, true, [\"encrypt\", \"decrypt\"]);\n    // node.js uses whole 128 bit as a counter, without nonce, instead of 64 bit\n    // recommended by NIST SP800-38A\n    return [wKey, { name: `aes-${keyMode}`, iv, counter: iv, length: 128 }];\n}\nasync function encrypt(msg, key, iv, mode = \"aes-128-ctr\", pkcs7PaddingEnabled = true) {\n    validateOpt(key, iv, mode);\n    if (crypto.web) {\n        const [wKey, wOpt] = await getBrowserKey(mode, key, iv);\n        const cipher = await crypto.web.subtle.encrypt(wOpt, wKey, msg);\n        // Remove PKCS7 padding on cbc mode by stripping end of message\n        let res = new Uint8Array(cipher);\n        if (!pkcs7PaddingEnabled && wOpt.name === \"aes-cbc\" && !(msg.length % 16)) {\n            res = res.slice(0, -16);\n        }\n        return res;\n    }\n    else if (crypto.node) {\n        const cipher = crypto.node.createCipheriv(mode, key, iv);\n        cipher.setAutoPadding(pkcs7PaddingEnabled);\n        return (0, utils_js_1.concatBytes)(cipher.update(msg), cipher.final());\n    }\n    else {\n        throw new Error(\"The environment doesn't have AES module\");\n    }\n}\nexports.encrypt = encrypt;\nasync function getPadding(cypherText, key, iv, mode) {\n    const lastBlock = cypherText.slice(-16);\n    for (let i = 0; i < 16; i++) {\n        // Undo xor of iv and fill with lastBlock ^ padding (16)\n        lastBlock[i] ^= iv[i] ^ 16;\n    }\n    const res = await encrypt(lastBlock, key, iv, mode);\n    return res.slice(0, 16);\n}\nasync function decrypt(cypherText, key, iv, mode = \"aes-128-ctr\", pkcs7PaddingEnabled = true) {\n    validateOpt(key, iv, mode);\n    if (crypto.web) {\n        const [wKey, wOpt] = await getBrowserKey(mode, key, iv);\n        // Add empty padding so Chrome will correctly decrypt message\n        if (!pkcs7PaddingEnabled && wOpt.name === \"aes-cbc\") {\n            const padding = await getPadding(cypherText, key, iv, mode);\n            cypherText = (0, utils_js_1.concatBytes)(cypherText, padding);\n        }\n        const msg = await crypto.web.subtle.decrypt(wOpt, wKey, cypherText);\n        const msgBytes = new Uint8Array(msg);\n        // Safari always ignores padding (if no padding -> broken message)\n        if (wOpt.name === \"aes-cbc\") {\n            const encrypted = await encrypt(msgBytes, key, iv, mode);\n            if (!(0, utils_js_1.equalsBytes)(encrypted, cypherText)) {\n                throw new Error(\"AES: wrong padding\");\n            }\n        }\n        return msgBytes;\n    }\n    else if (crypto.node) {\n        const decipher = crypto.node.createDecipheriv(mode, key, iv);\n        decipher.setAutoPadding(pkcs7PaddingEnabled);\n        return (0, utils_js_1.concatBytes)(decipher.update(cypherText), decipher.final());\n    }\n    else {\n        throw new Error(\"The environment doesn't have AES module\");\n    }\n}\nexports.decrypt = decrypt;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvYWVzLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWUsR0FBRyxlQUFlO0FBQ2pDLGlCQUFpQixtQkFBTyxDQUFDLDRGQUFzQjtBQUMvQyxtQkFBbUIsbUJBQU8sQ0FBQyxxRkFBWTtBQUN2QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLDhEQUE4RCxLQUFLO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsYUFBYSxzQkFBc0IsMkJBQTJCO0FBQy9IO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYSxRQUFRLGlDQUFpQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pc3N1ZXJfaG9sZGVyX3ZlcmlmaWVyLy4vc3JjL3BhZ2VzL2FwaS9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2Flcy5qcz8xYTcwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWNyeXB0ID0gZXhwb3J0cy5lbmNyeXB0ID0gdm9pZCAwO1xuY29uc3QgY3J5cHRvXzEgPSByZXF1aXJlKFwiQG5vYmxlL2hhc2hlcy9jcnlwdG9cIik7XG5jb25zdCB1dGlsc19qc18xID0gcmVxdWlyZShcIi4vdXRpbHMuanNcIik7XG5jb25zdCBjcnlwdG8gPSB7IHdlYjogY3J5cHRvXzEuY3J5cHRvIH07XG5mdW5jdGlvbiB2YWxpZGF0ZU9wdChrZXksIGl2LCBtb2RlKSB7XG4gICAgaWYgKCFtb2RlLnN0YXJ0c1dpdGgoXCJhZXMtXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQUVTIHN1Ym1vZHVsZSBkb2Vzbid0IHN1cHBvcnQgbW9kZSAke21vZGV9YCk7XG4gICAgfVxuICAgIGlmIChpdi5sZW5ndGggIT09IDE2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFFUzogd3JvbmcgSVYgbGVuZ3RoXCIpO1xuICAgIH1cbiAgICBpZiAoKG1vZGUuc3RhcnRzV2l0aChcImFlcy0xMjhcIikgJiYga2V5Lmxlbmd0aCAhPT0gMTYpIHx8XG4gICAgICAgIChtb2RlLnN0YXJ0c1dpdGgoXCJhZXMtMjU2XCIpICYmIGtleS5sZW5ndGggIT09IDMyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBRVM6IHdyb25nIGtleSBsZW5ndGhcIik7XG4gICAgfVxufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QnJvd3NlcktleShtb2RlLCBrZXksIGl2KSB7XG4gICAgaWYgKCFjcnlwdG8ud2ViKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJyb3dzZXIgY3J5cHRvIG5vdCBhdmFpbGFibGUuXCIpO1xuICAgIH1cbiAgICBsZXQga2V5TW9kZTtcbiAgICBpZiAoW1wiYWVzLTEyOC1jYmNcIiwgXCJhZXMtMjU2LWNiY1wiXS5pbmNsdWRlcyhtb2RlKSkge1xuICAgICAgICBrZXlNb2RlID0gXCJjYmNcIjtcbiAgICB9XG4gICAgaWYgKFtcImFlcy0xMjgtY3RyXCIsIFwiYWVzLTI1Ni1jdHJcIl0uaW5jbHVkZXMobW9kZSkpIHtcbiAgICAgICAga2V5TW9kZSA9IFwiY3RyXCI7XG4gICAgfVxuICAgIGlmICgha2V5TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBRVM6IHVuc3VwcG9ydGVkIG1vZGVcIik7XG4gICAgfVxuICAgIGNvbnN0IHdLZXkgPSBhd2FpdCBjcnlwdG8ud2ViLnN1YnRsZS5pbXBvcnRLZXkoXCJyYXdcIiwga2V5LCB7IG5hbWU6IGBBRVMtJHtrZXlNb2RlLnRvVXBwZXJDYXNlKCl9YCwgbGVuZ3RoOiBrZXkubGVuZ3RoICogOCB9LCB0cnVlLCBbXCJlbmNyeXB0XCIsIFwiZGVjcnlwdFwiXSk7XG4gICAgLy8gbm9kZS5qcyB1c2VzIHdob2xlIDEyOCBiaXQgYXMgYSBjb3VudGVyLCB3aXRob3V0IG5vbmNlLCBpbnN0ZWFkIG9mIDY0IGJpdFxuICAgIC8vIHJlY29tbWVuZGVkIGJ5IE5JU1QgU1A4MDAtMzhBXG4gICAgcmV0dXJuIFt3S2V5LCB7IG5hbWU6IGBhZXMtJHtrZXlNb2RlfWAsIGl2LCBjb3VudGVyOiBpdiwgbGVuZ3RoOiAxMjggfV07XG59XG5hc3luYyBmdW5jdGlvbiBlbmNyeXB0KG1zZywga2V5LCBpdiwgbW9kZSA9IFwiYWVzLTEyOC1jdHJcIiwgcGtjczdQYWRkaW5nRW5hYmxlZCA9IHRydWUpIHtcbiAgICB2YWxpZGF0ZU9wdChrZXksIGl2LCBtb2RlKTtcbiAgICBpZiAoY3J5cHRvLndlYikge1xuICAgICAgICBjb25zdCBbd0tleSwgd09wdF0gPSBhd2FpdCBnZXRCcm93c2VyS2V5KG1vZGUsIGtleSwgaXYpO1xuICAgICAgICBjb25zdCBjaXBoZXIgPSBhd2FpdCBjcnlwdG8ud2ViLnN1YnRsZS5lbmNyeXB0KHdPcHQsIHdLZXksIG1zZyk7XG4gICAgICAgIC8vIFJlbW92ZSBQS0NTNyBwYWRkaW5nIG9uIGNiYyBtb2RlIGJ5IHN0cmlwcGluZyBlbmQgb2YgbWVzc2FnZVxuICAgICAgICBsZXQgcmVzID0gbmV3IFVpbnQ4QXJyYXkoY2lwaGVyKTtcbiAgICAgICAgaWYgKCFwa2NzN1BhZGRpbmdFbmFibGVkICYmIHdPcHQubmFtZSA9PT0gXCJhZXMtY2JjXCIgJiYgIShtc2cubGVuZ3RoICUgMTYpKSB7XG4gICAgICAgICAgICByZXMgPSByZXMuc2xpY2UoMCwgLTE2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBlbHNlIGlmIChjcnlwdG8ubm9kZSkge1xuICAgICAgICBjb25zdCBjaXBoZXIgPSBjcnlwdG8ubm9kZS5jcmVhdGVDaXBoZXJpdihtb2RlLCBrZXksIGl2KTtcbiAgICAgICAgY2lwaGVyLnNldEF1dG9QYWRkaW5nKHBrY3M3UGFkZGluZ0VuYWJsZWQpO1xuICAgICAgICByZXR1cm4gKDAsIHV0aWxzX2pzXzEuY29uY2F0Qnl0ZXMpKGNpcGhlci51cGRhdGUobXNnKSwgY2lwaGVyLmZpbmFsKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSBBRVMgbW9kdWxlXCIpO1xuICAgIH1cbn1cbmV4cG9ydHMuZW5jcnlwdCA9IGVuY3J5cHQ7XG5hc3luYyBmdW5jdGlvbiBnZXRQYWRkaW5nKGN5cGhlclRleHQsIGtleSwgaXYsIG1vZGUpIHtcbiAgICBjb25zdCBsYXN0QmxvY2sgPSBjeXBoZXJUZXh0LnNsaWNlKC0xNik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgIC8vIFVuZG8geG9yIG9mIGl2IGFuZCBmaWxsIHdpdGggbGFzdEJsb2NrIF4gcGFkZGluZyAoMTYpXG4gICAgICAgIGxhc3RCbG9ja1tpXSBePSBpdltpXSBeIDE2O1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCBlbmNyeXB0KGxhc3RCbG9jaywga2V5LCBpdiwgbW9kZSk7XG4gICAgcmV0dXJuIHJlcy5zbGljZSgwLCAxNik7XG59XG5hc3luYyBmdW5jdGlvbiBkZWNyeXB0KGN5cGhlclRleHQsIGtleSwgaXYsIG1vZGUgPSBcImFlcy0xMjgtY3RyXCIsIHBrY3M3UGFkZGluZ0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgdmFsaWRhdGVPcHQoa2V5LCBpdiwgbW9kZSk7XG4gICAgaWYgKGNyeXB0by53ZWIpIHtcbiAgICAgICAgY29uc3QgW3dLZXksIHdPcHRdID0gYXdhaXQgZ2V0QnJvd3NlcktleShtb2RlLCBrZXksIGl2KTtcbiAgICAgICAgLy8gQWRkIGVtcHR5IHBhZGRpbmcgc28gQ2hyb21lIHdpbGwgY29ycmVjdGx5IGRlY3J5cHQgbWVzc2FnZVxuICAgICAgICBpZiAoIXBrY3M3UGFkZGluZ0VuYWJsZWQgJiYgd09wdC5uYW1lID09PSBcImFlcy1jYmNcIikge1xuICAgICAgICAgICAgY29uc3QgcGFkZGluZyA9IGF3YWl0IGdldFBhZGRpbmcoY3lwaGVyVGV4dCwga2V5LCBpdiwgbW9kZSk7XG4gICAgICAgICAgICBjeXBoZXJUZXh0ID0gKDAsIHV0aWxzX2pzXzEuY29uY2F0Qnl0ZXMpKGN5cGhlclRleHQsIHBhZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1zZyA9IGF3YWl0IGNyeXB0by53ZWIuc3VidGxlLmRlY3J5cHQod09wdCwgd0tleSwgY3lwaGVyVGV4dCk7XG4gICAgICAgIGNvbnN0IG1zZ0J5dGVzID0gbmV3IFVpbnQ4QXJyYXkobXNnKTtcbiAgICAgICAgLy8gU2FmYXJpIGFsd2F5cyBpZ25vcmVzIHBhZGRpbmcgKGlmIG5vIHBhZGRpbmcgLT4gYnJva2VuIG1lc3NhZ2UpXG4gICAgICAgIGlmICh3T3B0Lm5hbWUgPT09IFwiYWVzLWNiY1wiKSB7XG4gICAgICAgICAgICBjb25zdCBlbmNyeXB0ZWQgPSBhd2FpdCBlbmNyeXB0KG1zZ0J5dGVzLCBrZXksIGl2LCBtb2RlKTtcbiAgICAgICAgICAgIGlmICghKDAsIHV0aWxzX2pzXzEuZXF1YWxzQnl0ZXMpKGVuY3J5cHRlZCwgY3lwaGVyVGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBRVM6IHdyb25nIHBhZGRpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1zZ0J5dGVzO1xuICAgIH1cbiAgICBlbHNlIGlmIChjcnlwdG8ubm9kZSkge1xuICAgICAgICBjb25zdCBkZWNpcGhlciA9IGNyeXB0by5ub2RlLmNyZWF0ZURlY2lwaGVyaXYobW9kZSwga2V5LCBpdik7XG4gICAgICAgIGRlY2lwaGVyLnNldEF1dG9QYWRkaW5nKHBrY3M3UGFkZGluZ0VuYWJsZWQpO1xuICAgICAgICByZXR1cm4gKDAsIHV0aWxzX2pzXzEuY29uY2F0Qnl0ZXMpKGRlY2lwaGVyLnVwZGF0ZShjeXBoZXJUZXh0KSwgZGVjaXBoZXIuZmluYWwoKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIEFFUyBtb2R1bGVcIik7XG4gICAgfVxufVxuZXhwb3J0cy5kZWNyeXB0ID0gZGVjcnlwdDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/ethereum-cryptography/aes.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/node_modules/ethereum-cryptography/keccak.js":
/*!********************************************************************!*\
  !*** ./src/pages/api/node_modules/ethereum-cryptography/keccak.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.keccak512 = exports.keccak384 = exports.keccak256 = exports.keccak224 = void 0;\nconst sha3_1 = __webpack_require__(/*! @noble/hashes/sha3 */ \"(api)/./src/pages/api/node_modules/@noble/hashes/sha3.js\");\nconst utils_js_1 = __webpack_require__(/*! ./utils.js */ \"(api)/./src/pages/api/node_modules/ethereum-cryptography/utils.js\");\nexports.keccak224 = (0, utils_js_1.wrapHash)(sha3_1.keccak_224);\nexports.keccak256 = (() => {\n    const k = (0, utils_js_1.wrapHash)(sha3_1.keccak_256);\n    k.create = sha3_1.keccak_256.create;\n    return k;\n})();\nexports.keccak384 = (0, utils_js_1.wrapHash)(sha3_1.keccak_384);\nexports.keccak512 = (0, utils_js_1.wrapHash)(sha3_1.keccak_512);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkva2VjY2FrLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQixHQUFHLGlCQUFpQixHQUFHLGlCQUFpQixHQUFHLGlCQUFpQjtBQUM3RSxlQUFlLG1CQUFPLENBQUMsb0ZBQW9CO0FBQzNDLG1CQUFtQixtQkFBTyxDQUFDLHFGQUFZO0FBQ3ZDLGlCQUFpQjtBQUNqQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlCQUFpQjtBQUNqQixpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pc3N1ZXJfaG9sZGVyX3ZlcmlmaWVyLy4vc3JjL3BhZ2VzL2FwaS9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2tlY2Nhay5qcz9jMTQ5Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5rZWNjYWs1MTIgPSBleHBvcnRzLmtlY2NhazM4NCA9IGV4cG9ydHMua2VjY2FrMjU2ID0gZXhwb3J0cy5rZWNjYWsyMjQgPSB2b2lkIDA7XG5jb25zdCBzaGEzXzEgPSByZXF1aXJlKFwiQG5vYmxlL2hhc2hlcy9zaGEzXCIpO1xuY29uc3QgdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzLmpzXCIpO1xuZXhwb3J0cy5rZWNjYWsyMjQgPSAoMCwgdXRpbHNfanNfMS53cmFwSGFzaCkoc2hhM18xLmtlY2Nha18yMjQpO1xuZXhwb3J0cy5rZWNjYWsyNTYgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGsgPSAoMCwgdXRpbHNfanNfMS53cmFwSGFzaCkoc2hhM18xLmtlY2Nha18yNTYpO1xuICAgIGsuY3JlYXRlID0gc2hhM18xLmtlY2Nha18yNTYuY3JlYXRlO1xuICAgIHJldHVybiBrO1xufSkoKTtcbmV4cG9ydHMua2VjY2FrMzg0ID0gKDAsIHV0aWxzX2pzXzEud3JhcEhhc2gpKHNoYTNfMS5rZWNjYWtfMzg0KTtcbmV4cG9ydHMua2VjY2FrNTEyID0gKDAsIHV0aWxzX2pzXzEud3JhcEhhc2gpKHNoYTNfMS5rZWNjYWtfNTEyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/ethereum-cryptography/keccak.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/node_modules/ethereum-cryptography/pbkdf2.js":
/*!********************************************************************!*\
  !*** ./src/pages/api/node_modules/ethereum-cryptography/pbkdf2.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.pbkdf2Sync = exports.pbkdf2 = void 0;\nconst pbkdf2_1 = __webpack_require__(/*! @noble/hashes/pbkdf2 */ \"(api)/./src/pages/api/node_modules/@noble/hashes/pbkdf2.js\");\nconst sha256_1 = __webpack_require__(/*! @noble/hashes/sha256 */ \"(api)/./src/pages/api/node_modules/@noble/hashes/sha256.js\");\nconst sha512_1 = __webpack_require__(/*! @noble/hashes/sha512 */ \"(api)/./src/pages/api/node_modules/@noble/hashes/sha512.js\");\nconst utils_js_1 = __webpack_require__(/*! ./utils.js */ \"(api)/./src/pages/api/node_modules/ethereum-cryptography/utils.js\");\nasync function pbkdf2(password, salt, iterations, keylen, digest) {\n    if (![\"sha256\", \"sha512\"].includes(digest)) {\n        throw new Error(\"Only sha256 and sha512 are supported\");\n    }\n    (0, utils_js_1.assertBytes)(password);\n    (0, utils_js_1.assertBytes)(salt);\n    return (0, pbkdf2_1.pbkdf2Async)(digest === \"sha256\" ? sha256_1.sha256 : sha512_1.sha512, password, salt, {\n        c: iterations,\n        dkLen: keylen\n    });\n}\nexports.pbkdf2 = pbkdf2;\nfunction pbkdf2Sync(password, salt, iterations, keylen, digest) {\n    if (![\"sha256\", \"sha512\"].includes(digest)) {\n        throw new Error(\"Only sha256 and sha512 are supported\");\n    }\n    (0, utils_js_1.assertBytes)(password);\n    (0, utils_js_1.assertBytes)(salt);\n    return (0, pbkdf2_1.pbkdf2)(digest === \"sha256\" ? sha256_1.sha256 : sha512_1.sha512, password, salt, {\n        c: iterations,\n        dkLen: keylen\n    });\n}\nexports.pbkdf2Sync = pbkdf2Sync;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvcGJrZGYyLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGNBQWM7QUFDbkMsaUJBQWlCLG1CQUFPLENBQUMsd0ZBQXNCO0FBQy9DLGlCQUFpQixtQkFBTyxDQUFDLHdGQUFzQjtBQUMvQyxpQkFBaUIsbUJBQU8sQ0FBQyx3RkFBc0I7QUFDL0MsbUJBQW1CLG1CQUFPLENBQUMscUZBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtCQUFrQiIsInNvdXJjZXMiOlsid2VicGFjazovL2lzc3Vlcl9ob2xkZXJfdmVyaWZpZXIvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvcGJrZGYyLmpzPzk4MTAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBia2RmMlN5bmMgPSBleHBvcnRzLnBia2RmMiA9IHZvaWQgMDtcbmNvbnN0IHBia2RmMl8xID0gcmVxdWlyZShcIkBub2JsZS9oYXNoZXMvcGJrZGYyXCIpO1xuY29uc3Qgc2hhMjU2XzEgPSByZXF1aXJlKFwiQG5vYmxlL2hhc2hlcy9zaGEyNTZcIik7XG5jb25zdCBzaGE1MTJfMSA9IHJlcXVpcmUoXCJAbm9ibGUvaGFzaGVzL3NoYTUxMlwiKTtcbmNvbnN0IHV0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi91dGlscy5qc1wiKTtcbmFzeW5jIGZ1bmN0aW9uIHBia2RmMihwYXNzd29yZCwgc2FsdCwgaXRlcmF0aW9ucywga2V5bGVuLCBkaWdlc3QpIHtcbiAgICBpZiAoIVtcInNoYTI1NlwiLCBcInNoYTUxMlwiXS5pbmNsdWRlcyhkaWdlc3QpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgc2hhMjU2IGFuZCBzaGE1MTIgYXJlIHN1cHBvcnRlZFwiKTtcbiAgICB9XG4gICAgKDAsIHV0aWxzX2pzXzEuYXNzZXJ0Qnl0ZXMpKHBhc3N3b3JkKTtcbiAgICAoMCwgdXRpbHNfanNfMS5hc3NlcnRCeXRlcykoc2FsdCk7XG4gICAgcmV0dXJuICgwLCBwYmtkZjJfMS5wYmtkZjJBc3luYykoZGlnZXN0ID09PSBcInNoYTI1NlwiID8gc2hhMjU2XzEuc2hhMjU2IDogc2hhNTEyXzEuc2hhNTEyLCBwYXNzd29yZCwgc2FsdCwge1xuICAgICAgICBjOiBpdGVyYXRpb25zLFxuICAgICAgICBka0xlbjoga2V5bGVuXG4gICAgfSk7XG59XG5leHBvcnRzLnBia2RmMiA9IHBia2RmMjtcbmZ1bmN0aW9uIHBia2RmMlN5bmMocGFzc3dvcmQsIHNhbHQsIGl0ZXJhdGlvbnMsIGtleWxlbiwgZGlnZXN0KSB7XG4gICAgaWYgKCFbXCJzaGEyNTZcIiwgXCJzaGE1MTJcIl0uaW5jbHVkZXMoZGlnZXN0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IHNoYTI1NiBhbmQgc2hhNTEyIGFyZSBzdXBwb3J0ZWRcIik7XG4gICAgfVxuICAgICgwLCB1dGlsc19qc18xLmFzc2VydEJ5dGVzKShwYXNzd29yZCk7XG4gICAgKDAsIHV0aWxzX2pzXzEuYXNzZXJ0Qnl0ZXMpKHNhbHQpO1xuICAgIHJldHVybiAoMCwgcGJrZGYyXzEucGJrZGYyKShkaWdlc3QgPT09IFwic2hhMjU2XCIgPyBzaGEyNTZfMS5zaGEyNTYgOiBzaGE1MTJfMS5zaGE1MTIsIHBhc3N3b3JkLCBzYWx0LCB7XG4gICAgICAgIGM6IGl0ZXJhdGlvbnMsXG4gICAgICAgIGRrTGVuOiBrZXlsZW5cbiAgICB9KTtcbn1cbmV4cG9ydHMucGJrZGYyU3luYyA9IHBia2RmMlN5bmM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/ethereum-cryptography/pbkdf2.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/node_modules/ethereum-cryptography/random.js":
/*!********************************************************************!*\
  !*** ./src/pages/api/node_modules/ethereum-cryptography/random.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getRandomBytes = exports.getRandomBytesSync = void 0;\nconst utils_1 = __webpack_require__(/*! @noble/hashes/utils */ \"(api)/./src/pages/api/node_modules/@noble/hashes/utils.js\");\nfunction getRandomBytesSync(bytes) {\n    return (0, utils_1.randomBytes)(bytes);\n}\nexports.getRandomBytesSync = getRandomBytesSync;\nasync function getRandomBytes(bytes) {\n    return (0, utils_1.randomBytes)(bytes);\n}\nexports.getRandomBytes = getRandomBytes;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvcmFuZG9tLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQixHQUFHLDBCQUEwQjtBQUNuRCxnQkFBZ0IsbUJBQU8sQ0FBQyxzRkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2lzc3Vlcl9ob2xkZXJfdmVyaWZpZXIvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvcmFuZG9tLmpzPzMxOTgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFJhbmRvbUJ5dGVzID0gZXhwb3J0cy5nZXRSYW5kb21CeXRlc1N5bmMgPSB2b2lkIDA7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIkBub2JsZS9oYXNoZXMvdXRpbHNcIik7XG5mdW5jdGlvbiBnZXRSYW5kb21CeXRlc1N5bmMoYnl0ZXMpIHtcbiAgICByZXR1cm4gKDAsIHV0aWxzXzEucmFuZG9tQnl0ZXMpKGJ5dGVzKTtcbn1cbmV4cG9ydHMuZ2V0UmFuZG9tQnl0ZXNTeW5jID0gZ2V0UmFuZG9tQnl0ZXNTeW5jO1xuYXN5bmMgZnVuY3Rpb24gZ2V0UmFuZG9tQnl0ZXMoYnl0ZXMpIHtcbiAgICByZXR1cm4gKDAsIHV0aWxzXzEucmFuZG9tQnl0ZXMpKGJ5dGVzKTtcbn1cbmV4cG9ydHMuZ2V0UmFuZG9tQnl0ZXMgPSBnZXRSYW5kb21CeXRlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/ethereum-cryptography/random.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/node_modules/ethereum-cryptography/scrypt.js":
/*!********************************************************************!*\
  !*** ./src/pages/api/node_modules/ethereum-cryptography/scrypt.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.scryptSync = exports.scrypt = void 0;\nconst scrypt_1 = __webpack_require__(/*! @noble/hashes/scrypt */ \"(api)/./src/pages/api/node_modules/@noble/hashes/scrypt.js\");\nconst utils_js_1 = __webpack_require__(/*! ./utils.js */ \"(api)/./src/pages/api/node_modules/ethereum-cryptography/utils.js\");\nasync function scrypt(password, salt, n, p, r, dkLen, onProgress) {\n    (0, utils_js_1.assertBytes)(password);\n    (0, utils_js_1.assertBytes)(salt);\n    return (0, scrypt_1.scryptAsync)(password, salt, { N: n, r, p, dkLen, onProgress });\n}\nexports.scrypt = scrypt;\nfunction scryptSync(password, salt, n, p, r, dkLen, onProgress) {\n    (0, utils_js_1.assertBytes)(password);\n    (0, utils_js_1.assertBytes)(salt);\n    return (0, scrypt_1.scrypt)(password, salt, { N: n, r, p, dkLen, onProgress });\n}\nexports.scryptSync = scryptSync;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvc2NyeXB0LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGNBQWM7QUFDbkMsaUJBQWlCLG1CQUFPLENBQUMsd0ZBQXNCO0FBQy9DLG1CQUFtQixtQkFBTyxDQUFDLHFGQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCwrQkFBK0I7QUFDdEY7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELCtCQUErQjtBQUNqRjtBQUNBLGtCQUFrQiIsInNvdXJjZXMiOlsid2VicGFjazovL2lzc3Vlcl9ob2xkZXJfdmVyaWZpZXIvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvc2NyeXB0LmpzPzVmMzciXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjcnlwdFN5bmMgPSBleHBvcnRzLnNjcnlwdCA9IHZvaWQgMDtcbmNvbnN0IHNjcnlwdF8xID0gcmVxdWlyZShcIkBub2JsZS9oYXNoZXMvc2NyeXB0XCIpO1xuY29uc3QgdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzLmpzXCIpO1xuYXN5bmMgZnVuY3Rpb24gc2NyeXB0KHBhc3N3b3JkLCBzYWx0LCBuLCBwLCByLCBka0xlbiwgb25Qcm9ncmVzcykge1xuICAgICgwLCB1dGlsc19qc18xLmFzc2VydEJ5dGVzKShwYXNzd29yZCk7XG4gICAgKDAsIHV0aWxzX2pzXzEuYXNzZXJ0Qnl0ZXMpKHNhbHQpO1xuICAgIHJldHVybiAoMCwgc2NyeXB0XzEuc2NyeXB0QXN5bmMpKHBhc3N3b3JkLCBzYWx0LCB7IE46IG4sIHIsIHAsIGRrTGVuLCBvblByb2dyZXNzIH0pO1xufVxuZXhwb3J0cy5zY3J5cHQgPSBzY3J5cHQ7XG5mdW5jdGlvbiBzY3J5cHRTeW5jKHBhc3N3b3JkLCBzYWx0LCBuLCBwLCByLCBka0xlbiwgb25Qcm9ncmVzcykge1xuICAgICgwLCB1dGlsc19qc18xLmFzc2VydEJ5dGVzKShwYXNzd29yZCk7XG4gICAgKDAsIHV0aWxzX2pzXzEuYXNzZXJ0Qnl0ZXMpKHNhbHQpO1xuICAgIHJldHVybiAoMCwgc2NyeXB0XzEuc2NyeXB0KShwYXNzd29yZCwgc2FsdCwgeyBOOiBuLCByLCBwLCBka0xlbiwgb25Qcm9ncmVzcyB9KTtcbn1cbmV4cG9ydHMuc2NyeXB0U3luYyA9IHNjcnlwdFN5bmM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/ethereum-cryptography/scrypt.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/node_modules/ethereum-cryptography/secp256k1.js":
/*!***********************************************************************!*\
  !*** ./src/pages/api/node_modules/ethereum-cryptography/secp256k1.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.secp256k1 = void 0;\nvar secp256k1_1 = __webpack_require__(/*! @noble/curves/secp256k1 */ \"(api)/./src/pages/api/node_modules/@noble/curves/secp256k1.js\");\nObject.defineProperty(exports, \"secp256k1\", ({ enumerable: true, get: function () { return secp256k1_1.secp256k1; } }));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvc2VjcDI1NmsxLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQixrQkFBa0IsbUJBQU8sQ0FBQyw4RkFBeUI7QUFDbkQsNkNBQTRDLEVBQUUscUNBQXFDLGlDQUFpQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaXNzdWVyX2hvbGRlcl92ZXJpZmllci8uL3NyYy9wYWdlcy9hcGkvbm9kZV9tb2R1bGVzL2V0aGVyZXVtLWNyeXB0b2dyYXBoeS9zZWNwMjU2azEuanM/MDk5YiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2VjcDI1NmsxID0gdm9pZCAwO1xudmFyIHNlY3AyNTZrMV8xID0gcmVxdWlyZShcIkBub2JsZS9jdXJ2ZXMvc2VjcDI1NmsxXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2VjcDI1NmsxXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWNwMjU2azFfMS5zZWNwMjU2azE7IH0gfSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/ethereum-cryptography/secp256k1.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/node_modules/ethereum-cryptography/utils.js":
/*!*******************************************************************!*\
  !*** ./src/pages/api/node_modules/ethereum-cryptography/utils.js ***!
  \*******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.crypto = exports.wrapHash = exports.equalsBytes = exports.hexToBytes = exports.bytesToUtf8 = exports.utf8ToBytes = exports.createView = exports.concatBytes = exports.toHex = exports.bytesToHex = exports.assertBytes = exports.assertBool = void 0;\nconst _assert_1 = __importDefault(__webpack_require__(/*! @noble/hashes/_assert */ \"(api)/./src/pages/api/node_modules/@noble/hashes/_assert.js\"));\nconst utils_1 = __webpack_require__(/*! @noble/hashes/utils */ \"(api)/./src/pages/api/node_modules/@noble/hashes/utils.js\");\nconst assertBool = _assert_1.default.bool;\nexports.assertBool = assertBool;\nconst assertBytes = _assert_1.default.bytes;\nexports.assertBytes = assertBytes;\nvar utils_2 = __webpack_require__(/*! @noble/hashes/utils */ \"(api)/./src/pages/api/node_modules/@noble/hashes/utils.js\");\nObject.defineProperty(exports, \"bytesToHex\", ({ enumerable: true, get: function () { return utils_2.bytesToHex; } }));\nObject.defineProperty(exports, \"toHex\", ({ enumerable: true, get: function () { return utils_2.bytesToHex; } }));\nObject.defineProperty(exports, \"concatBytes\", ({ enumerable: true, get: function () { return utils_2.concatBytes; } }));\nObject.defineProperty(exports, \"createView\", ({ enumerable: true, get: function () { return utils_2.createView; } }));\nObject.defineProperty(exports, \"utf8ToBytes\", ({ enumerable: true, get: function () { return utils_2.utf8ToBytes; } }));\n// buf.toString('utf8') -> bytesToUtf8(buf)\nfunction bytesToUtf8(data) {\n    if (!(data instanceof Uint8Array)) {\n        throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof data}`);\n    }\n    return new TextDecoder().decode(data);\n}\nexports.bytesToUtf8 = bytesToUtf8;\nfunction hexToBytes(data) {\n    const sliced = data.startsWith(\"0x\") ? data.substring(2) : data;\n    return (0, utils_1.hexToBytes)(sliced);\n}\nexports.hexToBytes = hexToBytes;\n// buf.equals(buf2) -> equalsBytes(buf, buf2)\nfunction equalsBytes(a, b) {\n    if (a.length !== b.length) {\n        return false;\n    }\n    for (let i = 0; i < a.length; i++) {\n        if (a[i] !== b[i]) {\n            return false;\n        }\n    }\n    return true;\n}\nexports.equalsBytes = equalsBytes;\n// Internal utils\nfunction wrapHash(hash) {\n    return (msg) => {\n        _assert_1.default.bytes(msg);\n        return hash(msg);\n    };\n}\nexports.wrapHash = wrapHash;\n// TODO(v3): switch away from node crypto, remove this unnecessary variable.\nexports.crypto = (() => {\n    const webCrypto = typeof globalThis === \"object\" && \"crypto\" in globalThis ? globalThis.crypto : undefined;\n    const nodeRequire =  true &&\n        typeof module.require === \"function\" &&\n        module.require.bind(module);\n    return {\n        node: nodeRequire && !webCrypto ? nodeRequire(\"crypto\") : undefined,\n        web: webCrypto\n    };\n})();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvdXRpbHMuanMiLCJtYXBwaW5ncyI6IjtBQUFhO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsY0FBYyxHQUFHLGdCQUFnQixHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixHQUFHLG1CQUFtQixHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixHQUFHLG1CQUFtQixHQUFHLGFBQWEsR0FBRyxrQkFBa0IsR0FBRyxtQkFBbUIsR0FBRyxrQkFBa0I7QUFDblAsa0NBQWtDLG1CQUFPLENBQUMsMEZBQXVCO0FBQ2pFLGdCQUFnQixtQkFBTyxDQUFDLHNGQUFxQjtBQUM3QztBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLG1CQUFtQjtBQUNuQixjQUFjLG1CQUFPLENBQUMsc0ZBQXFCO0FBQzNDLDhDQUE2QyxFQUFFLHFDQUFxQyw4QkFBOEIsRUFBQztBQUNuSCx5Q0FBd0MsRUFBRSxxQ0FBcUMsOEJBQThCLEVBQUM7QUFDOUcsK0NBQThDLEVBQUUscUNBQXFDLCtCQUErQixFQUFDO0FBQ3JILDhDQUE2QyxFQUFFLHFDQUFxQyw4QkFBOEIsRUFBQztBQUNuSCwrQ0FBOEMsRUFBRSxxQ0FBcUMsK0JBQStCLEVBQUM7QUFDckg7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLFlBQVk7QUFDaEY7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQSx3QkFBd0IsS0FBNkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2lzc3Vlcl9ob2xkZXJfdmVyaWZpZXIvLi9zcmMvcGFnZXMvYXBpL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvdXRpbHMuanM/NGVhYSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3J5cHRvID0gZXhwb3J0cy53cmFwSGFzaCA9IGV4cG9ydHMuZXF1YWxzQnl0ZXMgPSBleHBvcnRzLmhleFRvQnl0ZXMgPSBleHBvcnRzLmJ5dGVzVG9VdGY4ID0gZXhwb3J0cy51dGY4VG9CeXRlcyA9IGV4cG9ydHMuY3JlYXRlVmlldyA9IGV4cG9ydHMuY29uY2F0Qnl0ZXMgPSBleHBvcnRzLnRvSGV4ID0gZXhwb3J0cy5ieXRlc1RvSGV4ID0gZXhwb3J0cy5hc3NlcnRCeXRlcyA9IGV4cG9ydHMuYXNzZXJ0Qm9vbCA9IHZvaWQgMDtcbmNvbnN0IF9hc3NlcnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiQG5vYmxlL2hhc2hlcy9fYXNzZXJ0XCIpKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiQG5vYmxlL2hhc2hlcy91dGlsc1wiKTtcbmNvbnN0IGFzc2VydEJvb2wgPSBfYXNzZXJ0XzEuZGVmYXVsdC5ib29sO1xuZXhwb3J0cy5hc3NlcnRCb29sID0gYXNzZXJ0Qm9vbDtcbmNvbnN0IGFzc2VydEJ5dGVzID0gX2Fzc2VydF8xLmRlZmF1bHQuYnl0ZXM7XG5leHBvcnRzLmFzc2VydEJ5dGVzID0gYXNzZXJ0Qnl0ZXM7XG52YXIgdXRpbHNfMiA9IHJlcXVpcmUoXCJAbm9ibGUvaGFzaGVzL3V0aWxzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYnl0ZXNUb0hleFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXRpbHNfMi5ieXRlc1RvSGV4OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidG9IZXhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHV0aWxzXzIuYnl0ZXNUb0hleDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbmNhdEJ5dGVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB1dGlsc18yLmNvbmNhdEJ5dGVzOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY3JlYXRlVmlld1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXRpbHNfMi5jcmVhdGVWaWV3OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidXRmOFRvQnl0ZXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHV0aWxzXzIudXRmOFRvQnl0ZXM7IH0gfSk7XG4vLyBidWYudG9TdHJpbmcoJ3V0ZjgnKSAtPiBieXRlc1RvVXRmOChidWYpXG5mdW5jdGlvbiBieXRlc1RvVXRmOChkYXRhKSB7XG4gICAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGJ5dGVzVG9VdGY4IGV4cGVjdGVkIFVpbnQ4QXJyYXksIGdvdCAke3R5cGVvZiBkYXRhfWApO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGRhdGEpO1xufVxuZXhwb3J0cy5ieXRlc1RvVXRmOCA9IGJ5dGVzVG9VdGY4O1xuZnVuY3Rpb24gaGV4VG9CeXRlcyhkYXRhKSB7XG4gICAgY29uc3Qgc2xpY2VkID0gZGF0YS5zdGFydHNXaXRoKFwiMHhcIikgPyBkYXRhLnN1YnN0cmluZygyKSA6IGRhdGE7XG4gICAgcmV0dXJuICgwLCB1dGlsc18xLmhleFRvQnl0ZXMpKHNsaWNlZCk7XG59XG5leHBvcnRzLmhleFRvQnl0ZXMgPSBoZXhUb0J5dGVzO1xuLy8gYnVmLmVxdWFscyhidWYyKSAtPiBlcXVhbHNCeXRlcyhidWYsIGJ1ZjIpXG5mdW5jdGlvbiBlcXVhbHNCeXRlcyhhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5lcXVhbHNCeXRlcyA9IGVxdWFsc0J5dGVzO1xuLy8gSW50ZXJuYWwgdXRpbHNcbmZ1bmN0aW9uIHdyYXBIYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gKG1zZykgPT4ge1xuICAgICAgICBfYXNzZXJ0XzEuZGVmYXVsdC5ieXRlcyhtc2cpO1xuICAgICAgICByZXR1cm4gaGFzaChtc2cpO1xuICAgIH07XG59XG5leHBvcnRzLndyYXBIYXNoID0gd3JhcEhhc2g7XG4vLyBUT0RPKHYzKTogc3dpdGNoIGF3YXkgZnJvbSBub2RlIGNyeXB0bywgcmVtb3ZlIHRoaXMgdW5uZWNlc3NhcnkgdmFyaWFibGUuXG5leHBvcnRzLmNyeXB0byA9ICgoKSA9PiB7XG4gICAgY29uc3Qgd2ViQ3J5cHRvID0gdHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIgJiYgXCJjcnlwdG9cIiBpbiBnbG9iYWxUaGlzID8gZ2xvYmFsVGhpcy5jcnlwdG8gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgbm9kZVJlcXVpcmUgPSB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHR5cGVvZiBtb2R1bGUucmVxdWlyZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIG1vZHVsZS5yZXF1aXJlLmJpbmQobW9kdWxlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBub2RlOiBub2RlUmVxdWlyZSAmJiAhd2ViQ3J5cHRvID8gbm9kZVJlcXVpcmUoXCJjcnlwdG9cIikgOiB1bmRlZmluZWQsXG4gICAgICAgIHdlYjogd2ViQ3J5cHRvXG4gICAgfTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/node_modules/ethereum-cryptography/utils.js\n");

/***/ })

};
;