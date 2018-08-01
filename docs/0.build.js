webpackJsonp([0],{

/***/ 1753:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(230)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1762:
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

// import Component from 'vue-class-component'

let Petition = class Petition extends __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["a" /* Vue */] {
    constructor() {
        super(...arguments);
        this.signed = false;
    }
    get petitions() {
        return this.$store.state.petition.petitions;
    }
    created() {
        this.$store.dispatch('petition/fetchState', this.key);
    }
    sign(petition) {
        petition.signed = !petition.signed;
    }
};
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["c" /* Getter */]
], Petition.prototype, "key", void 0);
Petition = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["b" /* Component */]
], Petition);
/* harmony default export */ __webpack_exports__["default"] = (Petition);


/***/ }),

/***/ 1771:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-flex', {
    attrs: {
      "xs12": "",
      "md5": "",
      "offset-md2": ""
    }
  }, _vm._l((_vm.petitions), function(petition) {
    return _c('div', {
      key: petition.title
    }, [_c('v-card', {
      staticClass: "my-3",
      attrs: {
        "hover": ""
      }
    }, [_c('v-container', {
      attrs: {
        "fill-height": "",
        "fluid": ""
      }
    }, [_c('v-layout', [_c('v-flex', {
      attrs: {
        "xs12": "",
        "align-end": "",
        "d-flex": ""
      }
    }, [_c('span', {
      staticClass: "headline"
    }, [_vm._v(_vm._s(petition.title))])])], 1)], 1), _vm._v(" "), _c('v-card-text', [_vm._v("\n               " + _vm._s(petition.body) + "\n             ")]), _vm._v(" "), _c('v-card-actions', [_c('v-btn', {
      staticClass: "blue--text text--darken-4",
      attrs: {
        "icon": ""
      },
      on: {
        "click": function($event) {
          _vm.sign(petition)
        }
      }
    }, [(!petition.signed) ? _c('div', [_c('v-icon', {
      attrs: {
        "medium": ""
      }
    }, [_vm._v(" assignment ")])], 1) : _c('div', [_c('v-icon', {
      directives: [{
        name: "if:",
        rawName: "v-if:"
      }],
      attrs: {
        "medium": ""
      }
    }, [_vm._v(" assignment_turned_in ")])], 1), _vm._v("\n                Sign\n               ")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('v-btn', {
      staticClass: "blue--text",
      attrs: {
        "flat": ""
      }
    }, [_vm._v("Read More")])], 1)], 1)], 1)
  }))
},staticRenderFns: []}

/***/ }),

/***/ 1778:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1753);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(663)("5f8f88cf", content, true, {});

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(1778)
}
var Component = __webpack_require__(662)(
  /* script */
  __webpack_require__(1762),
  /* template */
  __webpack_require__(1771),
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
//# sourceMappingURL=0.build.js.map