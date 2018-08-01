webpackJsonp([5],{

/***/ 1590:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(1774)
}
var Component = __webpack_require__(662)(
  /* script */
  __webpack_require__(1760),
  /* template */
  __webpack_require__(1767),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1749:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(230)(false);
// imports


// module
exports.push([module.i, ".greeting{font-size:20px}", ""]);

// exports


/***/ }),

/***/ 1760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_class__ = __webpack_require__(665);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let Home = class Home extends __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["a" /* Vue */] {
    constructor() {
        super(...arguments);
        this.drawer = true;
    }
    get id() {
        return this.account.id;
    }
    //
    // @Action
    // async getFS({state, commit}, id){
    //   this.setFS(await states.store.account.getPrivateFS(this.id));
    // }
    created() {
        this.getFS(this.id);
    }
};
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["a" /* Action */]
], Home.prototype, "getFS", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["b" /* State */]
], Home.prototype, "fs", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["b" /* State */]
], Home.prototype, "account", void 0);
Home = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["b" /* Component */]
], Home);
/* harmony default export */ __webpack_exports__["default"] = (Home);


/***/ }),

/***/ 1767:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("\n  Welcome to Open Source Demecracy's Petition App "), _c('br'), _vm._v("\n  " + _vm._s(_vm.id)), _c('br')])
},staticRenderFns: []}

/***/ }),

/***/ 1774:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1749);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(663)("35bbf890", content, true, {});

/***/ })

});
//# sourceMappingURL=5.build.js.map