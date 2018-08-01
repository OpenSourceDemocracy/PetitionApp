webpackJsonp([6],{

/***/ 1589:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(1773)
}
var Component = __webpack_require__(662)(
  /* script */
  __webpack_require__(1759),
  /* template */
  __webpack_require__(1766),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1748:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(230)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1759:
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// import Component from 'vue-class-component'

let Petition = class Petition extends __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["a" /* Vue */] {
    constructor() {
        super(...arguments);
        this.title = "";
        this.body = "";
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fs.write('/petitions/' + this.title, JSON.stringify({
                title: this.title,
                body: this.body
            }), { create: true });
            this.fs.commit();
        });
    }
};
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["b" /* State */]
], Petition.prototype, "fs", void 0);
Petition = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["b" /* Component */]
], Petition);
/* harmony default export */ __webpack_exports__["default"] = (Petition);


/***/ }),

/***/ 1766:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-flex', {
    attrs: {
      "xs12": "",
      "md5": "",
      "offset-md2": ""
    }
  }, [_c('v-text-field', {
    attrs: {
      "label": "Subject",
      "single-line": "",
      "full-width": "",
      "hide-details": ""
    },
    model: {
      value: (_vm.title),
      callback: function($$v) {
        _vm.title = $$v
      },
      expression: "title"
    }
  }), _vm._v(" "), _c('v-divider'), _vm._v(" "), _c('v-textarea', {
    attrs: {
      "label": "Message",
      "counter": "",
      "maxlength": "120",
      "full-width": "",
      "single-line": ""
    },
    model: {
      value: (_vm.body),
      callback: function($$v) {
        _vm.body = $$v
      },
      expression: "body"
    }
  }), _vm._v(" "), _c('v-btn', {
    on: {
      "click": _vm.create
    }
  }, [_vm._v("Create")])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1773:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1748);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(663)("a0adc40a", content, true, {});

/***/ })

});
//# sourceMappingURL=6.build.js.map