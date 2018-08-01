webpackJsonp([3],{

/***/ 1593:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(1776)
}
var Component = __webpack_require__(662)(
  /* script */
  __webpack_require__(1764),
  /* template */
  __webpack_require__(1769),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1751:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(230)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1764:
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


let SignUp = class SignUp extends __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["a" /* Vue */] {
    constructor() {
        super(...arguments);
        this.password = "";
        this.name = "";
        this.form = false;
        this.isLoading = false;
        this.bio = "";
        this.email = "";
    }
    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            let exportedKey = yield this.account.exportAccount(this.password);
            exportedKey.salt = new Blob([exportedKey.salt]);
            debugger;
            this.download("key.json", JSON.stringify(exportedKey));
        });
    }
};
__decorate([
    __WEBPACK_IMPORTED_MODULE_1_vuex_class__["b" /* State */]
], SignUp.prototype, "account", void 0);
SignUp = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["b" /* Component */]
], SignUp);
/* harmony default export */ __webpack_exports__["default"] = (SignUp);


/***/ }),

/***/ 1769:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-card', {
    attrs: {
      "fluid": ""
    }
  }, [_c('v-toolbar', {
    attrs: {
      "color": "deep-purple accent-4",
      "cards": "",
      "dark": "",
      "flat": ""
    }
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    }
  }, [_c('v-icon', [_vm._v("mdi-arrow-left")])], 1), _vm._v(" "), _c('v-card-title', {
    staticClass: "title font-weight-regular"
  }, [_vm._v("Sign up")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "icon": ""
    }
  }, [_c('v-icon', [_vm._v("mdi-magnify")])], 1), _vm._v(" "), _c('v-btn', {
    attrs: {
      "icon": ""
    }
  }, [_c('v-icon', [_vm._v("mdi-dots-vertical")])], 1)], 1), _vm._v(" "), _c('v-form', {
    model: {
      value: (_vm.form),
      callback: function($$v) {
        _vm.form = $$v
      },
      expression: "form"
    }
  }, [_c('v-text-field', {
    staticStyle: {
      "min-height": "96px"
    },
    attrs: {
      "box": "",
      "color": "deep-purple",
      "counter": "6",
      "label": "Password",
      "type": "password"
    },
    model: {
      value: (_vm.password),
      callback: function($$v) {
        _vm.password = $$v
      },
      expression: "password"
    }
  }), _vm._v(" "), _c('v-text-field', {
    attrs: {
      "box": "",
      "color": "deep-purple",
      "label": "Email address",
      "type": "email"
    },
    model: {
      value: (_vm.email),
      callback: function($$v) {
        _vm.email = $$v
      },
      expression: "email"
    }
  }), _vm._v(" "), _c('v-text-field', {
    attrs: {
      "box": "",
      "color": "deep-purple",
      "label": "Name",
      "type": "name"
    },
    model: {
      value: (_vm.name),
      callback: function($$v) {
        _vm.name = $$v
      },
      expression: "name"
    }
  }), _vm._v(" "), _c('v-textarea', {
    attrs: {
      "auto-grow": "",
      "box": "",
      "color": "deep-purple",
      "label": "Bio",
      "rows": "1"
    },
    model: {
      value: (_vm.bio),
      callback: function($$v) {
        _vm.bio = $$v
      },
      expression: "bio"
    }
  })], 1), _vm._v(" "), _c('v-divider'), _vm._v(" "), _c('v-card-actions', [_c('v-btn', {
    attrs: {
      "flat": ""
    },
    on: {
      "click": function($event) {
        _vm.$refs.form.reset()
      }
    }
  }, [_vm._v("\n      Clear\n    ")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "white--text",
    attrs: {
      "disabled": !_vm.form,
      "loading": _vm.isLoading,
      "color": "deep-purple accent-4",
      "depressed": ""
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("Submit")])], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1776:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1751);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(663)("dfd4302c", content, true, {});

/***/ })

});
//# sourceMappingURL=3.build.js.map