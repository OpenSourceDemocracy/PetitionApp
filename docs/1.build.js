webpackJsonp([1],{

/***/ 1752:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(230)(false);
// imports


// module
exports.push([module.i, ".greeting{font-size:20px}", ""]);

// exports


/***/ }),

/***/ 1765:
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


let Tree = class Tree extends __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["a" /* Vue */] {
    get items() {
        return this.$store.state.tree.tree.items;
    }
    created() {
        debugger;
        let key = this.$store.state.route.params.key || this.key;
        this.$store.dispatch('tree/fetchTree', key);
    }
};
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["b" /* State */]
], Tree.prototype, "fs", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["a" /* Action */]
], Tree.prototype, "getFS", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["b" /* State */]
], Tree.prototype, "account", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["c" /* Getter */]
], Tree.prototype, "key", void 0);
Tree = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["b" /* Component */]
], Tree);
/* harmony default export */ __webpack_exports__["default"] = (Tree);


/***/ }),

/***/ 1770:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-list', _vm._l((_vm.items), function(item) {
    return _c('v-list-group', {
      key: item.title,
      attrs: {
        "prepend-icon": item.action,
        "no-action": ""
      },
      model: {
        value: (item.active),
        callback: function($$v) {
          _vm.$set(item, "active", $$v)
        },
        expression: "item.active"
      }
    }, [_c('v-list-tile', {
      attrs: {
        "slot": "activator"
      },
      slot: "activator"
    }, [_c('v-list-tile-content', [_c('v-list-tile-title', [_vm._v(_vm._s(item.title))])], 1)], 1), _vm._v(" "), _vm._l((item.items), function(subItem) {
      return _c('v-list-tile', {
        key: subItem.title,
        on: {
          "click": function($event) {}
        }
      }, [_c('v-list-tile-content', [_c('v-list-tile-title', [_vm._v(_vm._s(subItem.title))])], 1), _vm._v(" "), _c('v-list-tile-action', [_c('v-icon', [_vm._v(_vm._s(subItem.action))])], 1)], 1)
    })], 2)
  }))
},staticRenderFns: []}

/***/ }),

/***/ 1777:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1752);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(663)("204db545", content, true, {});

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(1777)
}
var Component = __webpack_require__(662)(
  /* script */
  __webpack_require__(1765),
  /* template */
  __webpack_require__(1770),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ })

});
//# sourceMappingURL=1.build.js.map