/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/cartComp.js":
/*!*******************************!*\
  !*** ./public/js/cartComp.js ***!
  \*******************************/
/***/ (() => {

eval("Vue.component('cart', {\n  data() {\n    return {\n      showCart: false,\n      cartItems: [],\n      cartUrl: 'cartItems.json'\n    };\n  },\n\n  methods: {\n    addProduct(item) {\n      let find = this.cartItems.find(el => el.id_product === item.id_product);\n\n      if (find) {\n        this.$parent.putJson(`/api/cart/${find.id_product}`, {\n          quantity: 1\n        }).then(data => {\n          if (data.result === 1) {\n            this.$root.cartCounter++;\n            find.quantity++;\n          }\n        });\n      } else {\n        const prod = Object.assign({\n          quantity: 1\n        }, item);\n        this.$parent.postJson(`/api/cart`, prod).then(data => {\n          if (data.result === 1) {\n            this.$root.cartCounter++;\n            this.cartItems.push(prod);\n          }\n        });\n      }\n    },\n\n    remove(product) {\n      if (product.quantity > 1) {\n        this.$parent.putJson(`/api/cart/${product.id_product}`, {\n          quantity: -1\n        }).then(data => {\n          if (data.result) {\n            this.$root.cartCounter--;\n            product.quantity--;\n          }\n        });\n      } else {\n        this.$parent.delJson(`/api/cart/${product.id_product}`, product).then(data => {\n          if (data.result) {\n            this.$root.cartCounter--;\n            this.cartItems.splice(this.cartItems.indexOf(product), 1);\n          } else {\n            console.log('error');\n          }\n        });\n      }\n    }\n\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/cart`).then(data => {\n      for (let el of data.contents) {\n        this.cartItems.push(el);\n      }\n\n      ;\n\n      for (item of this.cartItems) {\n        this.$root.cartCounter += item.quantity;\n      }\n\n      ;\n    });\n  },\n\n  template: `<div v-show=\"showCart\" class=\"cart-hidden\"> \n                    <cart-item v-for=\"item of cartItems\" :product=\"item\" :key=\"item.id_product\">\n                    </cart-item>\n               </div>`\n});\nVue.component('cart-item', {\n  props: ['product'],\n  template: `<div class=\"cart-hidden__item hidden-item\">\n                    <div class=\"hidden-item__wrap\">\n                    <img :src=\"('img/' + product.id_product + '.png')\" width=\"100px\" height=\"100px\">\n                    <div class=hidden-item__info>\n                    <p class=\"hidden-item__name\">Title: {{ product.product_name }}</p>\n                    <p class=\"hidden-item__price\">Price: {{ product.price * product.quantity }} $</p>\n                    <p class=\"hidden-item__quantity\">Quantity: {{product.quantity}}</p>\n                    </div>\n                    </div>\n                    <button class=\"hidden-item__delete-btn\" @click=\"$root.$refs.cart.remove(product)\">&#215;</button>\n                </div>`\n});\n\n//# sourceURL=webpack://project/./public/js/cartComp.js?");

/***/ }),

/***/ "./public/js/errorComp.js":
/*!********************************!*\
  !*** ./public/js/errorComp.js ***!
  \********************************/
/***/ (() => {

eval("Vue.component('error', {\n  data() {\n    return {\n      text: ''\n    };\n  },\n\n  computed: {\n    isVisible() {\n      return this.text !== '';\n    }\n\n  },\n  template: `\n    <div class=\"error-block\" v-if=\"isVisible\">\n        <p class=\"error-msg\">\n        <button class=\"close-btn\" @click=\"text=''\">&times;</button>\n        {{ text }}\n</p>\n</div>\n    `\n});\n\n//# sourceURL=webpack://project/./public/js/errorComp.js?");

/***/ }),

/***/ "./public/js/filterComp.js":
/*!*********************************!*\
  !*** ./public/js/filterComp.js ***!
  \*********************************/
/***/ (() => {

eval("Vue.component('filter-comp', {\n  data() {\n    return {\n      userSearch: ''\n    };\n  },\n\n  template: `<form action=\"#\" class=\"search\" @submit.prevent=\"$root.$refs.products.filter(userSearch)\">\n    <img src=\"img/search.svg\" alt=\"search\"><input type=\"text\" name=\"search\" id=\"search\" v-model=\"userSearch\">\n    </form>`\n});\n\n//# sourceURL=webpack://project/./public/js/filterComp.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("new Vue({\n  el: '#app',\n  data: {\n    cartCounter: 0\n  },\n  methods: {\n    getJson(url) {\n      return fetch(url).then(result => result.json()).catch(error => this.$refs.error.text = error);\n    },\n\n    postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    },\n\n    putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    },\n\n    delJson(url, data) {\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    }\n\n  }\n});\n\n//# sourceURL=webpack://project/./public/js/main.js?");

/***/ }),

/***/ "./public/js/productComp.js":
/*!**********************************!*\
  !*** ./public/js/productComp.js ***!
  \**********************************/
/***/ (() => {

eval("Vue.component('products', {\n  data() {\n    return {\n      catalogUrl: 'catalogProduct.json',\n      products: [],\n      filtered: [],\n      userSearch: ''\n    };\n  },\n\n  methods: {\n    filter(value) {\n      const regexp = new RegExp(value, 'i');\n      this.filtered = this.products.filter(el => regexp.test(el.product_name));\n    }\n\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/products`).then(data => {\n      for (let el of data) {\n        this.filtered.push(el);\n        this.products.push(el);\n      }\n    });\n  },\n\n  template: `<section class=\"products\">\n                    <div class=\"products__wrap container\">\n                    <h2 class=\"products__heading\">Fetured Items</h2>\n                    <p class=\"products__text\">Shop for items based on what we featured in this week</p>\n                    <section class=\"product__cards\">\n                  <product v-for=\"item of filtered\" :product=\"item\" :key=\"item.id_product\"></product> \n                    </section>\n                    <a href=\"catalog.html\" class=\"products__button\">\n                    Browse All Product\n                </a>\n                    </div>\n               </section>`\n});\nVue.component('product', {\n  props: ['product'],\n  template: `          <article class=\"product__card\">\n                        <div class=\"product__img\"> <img :src=\"('img/' + product.id_product + '.png')\" alt=\"Product\"></div>\n                        <div class=\"card__hover\">\n                            <button @click=\"$root.$refs.cart.addProduct(product)\" class=\"card__hover_btn\">\n                                <svg width=\"27\" height=\"25\" viewBox=\"0 0 27 25\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path\n                                        d=\"M21.876 22.2662C21.921 22.2549 21.9423 22.2339 21.96 22.2129C21.9678 22.2037 21.9756 22.1946 21.9835 22.1855C22.02 22.1438 22.0233 22.0553 22.0224 22.0105C22.0092 21.9044 21.9185 21.8315 21.8412 21.8315C21.8375 21.8315 21.8336 21.8317 21.8312 21.8318C21.7531 21.8372 21.6653 21.9409 21.6719 22.0625C21.6813 22.1793 21.7675 22.2662 21.8392 22.2662H21.876ZM8.21954 22.2599C8.31873 22.2599 8.39935 22.1655 8.39935 22.0496C8.39935 21.9341 8.31873 21.8401 8.21954 21.8401C8.12042 21.8401 8.03973 21.9341 8.03973 22.0496C8.03973 22.1655 8.12042 22.2599 8.21954 22.2599ZM21.9995 24.2662C21.9517 24.2662 21.8878 24.2662 21.8392 24.2662C20.7017 24.2662 19.7567 23.3545 19.6765 22.198C19.5964 20.9929 20.4937 19.9183 21.6953 19.8364C21.7441 19.8331 21.7928 19.8315 21.8412 19.8315C22.9799 19.8315 23.9413 20.7324 24.019 21.8884C24.0505 22.4915 23.8741 23.0612 23.4898 23.5012C23.1055 23.9575 22.5764 24.2177 21.9995 24.2662ZM8.21954 24.2599C7.01532 24.2599 6.03973 23.2709 6.03973 22.0496C6.03973 20.8291 7.01532 19.8401 8.21954 19.8401C9.42371 19.8401 10.3994 20.8291 10.3994 22.0496C10.3994 23.2709 9.42371 24.2599 8.21954 24.2599ZM21.1984 17.3938H9.13306C8.70013 17.3938 8.31586 17.1005 8.20331 16.6775L4.27753 2.24768H1.52173C0.993408 2.24768 0.560547 1.80859 0.560547 1.27039C0.560547 0.733032 0.993408 0.292969 1.52173 0.292969H4.99933C5.43134 0.292969 5.81561 0.586304 5.9281 1.01025L9.85394 15.4391H20.5576L24.1144 7.13379H12.2578C11.7286 7.13379 11.2957 6.69373 11.2957 6.15649C11.2957 5.61914 11.7286 5.17908 12.2578 5.17908H25.5886C25.9091 5.17908 26.2141 5.34192 26.3896 5.61914C26.566 5.89539 26.5984 6.23743 26.4697 6.547L22.0795 16.807C21.9193 17.1653 21.5827 17.3938 21.1984 17.3938Z\" />\n                                </svg>\n                                &emsp;Add to Cart\n                            </button>\n                        </div>\n                        <a href=\"product.html\">\n                            <div class=\"product__card__info\">\n                                <h3 class=\"product__card__heading\">{{product.product_name}}</h3>\n                                <p class=\"product__card__text\">{{product.info}}</p>\n                                <p class=\"product__card__price\">{{product.price}}</p>\n                            </div>\n                        </a>\n                        </article>`\n});\n\n//# sourceURL=webpack://project/./public/js/productComp.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/cartComp.js"]();
/******/ 	__webpack_modules__["./public/js/errorComp.js"]();
/******/ 	__webpack_modules__["./public/js/filterComp.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/productComp.js"]();
/******/ 	
/******/ })()
;