webpackJsonp([4],{

/***/ 1591:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(1775)
}
var Component = __webpack_require__(662)(
  /* script */
  __webpack_require__(1761),
  /* template */
  __webpack_require__(1768),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1750:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(230)(false);
// imports


// module
exports.push([module.i, ".file-select>.select-button{padding:1rem;color:#fff;background-color:#2ea169;border-radius:.3rem;text-align:center;font-weight:700}.file-select>input[type=file]{display:none}", ""]);

// exports


/***/ }),

/***/ 1761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agent_fs__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex_class__ = __webpack_require__(665);
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



let Login = class Login extends __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["a" /* Vue */] {
    constructor() {
        super(...arguments);
        this._password = "";
        // @Prop() account!: string;
        // email = "" ; //TODO: Make Email type
        this.file = null;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            this.account.importAccount(JSON.parse(this.file.toString()), this._password);
        });
    }
    upload(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.file = yield __WEBPACK_IMPORTED_MODULE_1__agent_fs__["a" /* OrbitFS */].readFile(e.target.files[0]);
        });
    }
};
__decorate([
    __WEBPACK_IMPORTED_MODULE_2_vuex_class__["b" /* State */]
], Login.prototype, "account", void 0);
Login = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["b" /* Component */]
], Login);
/* harmony default export */ __webpack_exports__["default"] = (Login);


/***/ }),

/***/ 1768:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-content', [_c('v-container', {
    attrs: {
      "fluid": "",
      "fill-height": ""
    }
  }, [_c('v-layout', {
    attrs: {
      "align-center": "",
      "justify-center": ""
    }
  }, [_c('v-flex', {
    attrs: {
      "xs12": "",
      "sm8": "",
      "md4": ""
    }
  }, [_c('v-card', {
    staticClass: "elevation-12"
  }, [_c('v-toolbar', {
    attrs: {
      "dark": "",
      "color": "primary"
    }
  }, [_c('v-toolbar-title', [_vm._v("Login form")]), _vm._v(" "), _c('v-spacer')], 1), _vm._v(" "), _c('v-card-text', [_c('v-form', [_c('label', {
    staticClass: "file-select"
  }, [_c('div', {
    staticClass: "select-button"
  }, [(_vm.file) ? _c('span', [_vm._v("Selected File: " + _vm._s(_vm.file.name))]) : _c('span', [_vm._v("Select File")])]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "file"
    },
    on: {
      "change": _vm.upload
    }
  })]), _vm._v(" "), _c('v-text-field', {
    attrs: {
      "id": "password",
      "prepend-icon": "lock",
      "name": "password",
      "label": "Password",
      "type": "password"
    },
    model: {
      value: (_vm._password),
      callback: function($$v) {
        _vm._password = $$v
      },
      expression: "_password"
    }
  })], 1)], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "color": "primary"
    },
    on: {
      "click": _vm.login
    }
  }, [_vm._v("Login")])], 1)], 1)], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1775:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1750);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(663)("27cd34e9", content, true, {});

/***/ })

});
//# sourceMappingURL=4.build.js.map