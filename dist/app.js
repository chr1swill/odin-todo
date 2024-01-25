/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/home */ \"./src/views/home.js\");\n\nfunction pageRouter() {\n  try {\n    var mainContent = document.querySelector(\"#main-content\");\n    if (!mainContent) {\n      throw new ReferenceError(\"Could not find with id: main-content\");\n    }\n    mainContent.appendChild((0,_views_home__WEBPACK_IMPORTED_MODULE_0__.RenderHomePage)());\n  } catch (error) {\n    console.error(error);\n  }\n}\npageRouter();\n\n//# sourceURL=webpack://odin-todo/./src/app.js?");

/***/ }),

/***/ "./src/components/buttons/ActionBar.js":
/*!*********************************************!*\
  !*** ./src/components/buttons/ActionBar.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ActionBarComponent: () => (/* binding */ ActionBarComponent)\n/* harmony export */ });\n/* harmony import */ var _buttons_AddButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../buttons/AddButton */ \"./src/components/buttons/AddButton.js\");\n\nfunction showCreateListModal() {}\nfunction showCreateTodoModal() {}\n\n/**\r\n * Create a simple Action Bar\r\n * @requires { showCreateListModal, showCreateTodoModal } - which have not been build yet so the event handles will not work \r\n */\nfunction ActionBarComponent() {\n  var addListBtn = (0,_buttons_AddButton__WEBPACK_IMPORTED_MODULE_0__.AddButtonComponent)(\"Add List\");\n  addListBtn.className = \"flex flex-row items-center\";\n  var addTodoBtn = (0,_buttons_AddButton__WEBPACK_IMPORTED_MODULE_0__.AddButtonComponent)(\"Add Todo\");\n  addTodoBtn.className = \"flex flex-row items-center\";\n  var buttonContainer = document.createElement(\"div\");\n  buttonContainer.className = \"grid grid-cols-2 gap-3\";\n  buttonContainer.append(addListBtn, addTodoBtn);\n\n  // TODO: Add ability to add list and todo\n  addListBtn.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n    showCreateListModal();\n  });\n  addTodoBtn.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n    showCreateTodoModal();\n  });\n  return buttonContainer;\n}\n\n//# sourceURL=webpack://odin-todo/./src/components/buttons/ActionBar.js?");

/***/ }),

/***/ "./src/components/buttons/AddButton.js":
/*!*********************************************!*\
  !*** ./src/components/buttons/AddButton.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AddButtonComponent: () => (/* binding */ AddButtonComponent)\n/* harmony export */ });\n/* harmony import */ var _icons_PlusSign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../icons/PlusSign */ \"./src/components/icons/PlusSign.js\");\n\n\n/**\r\n * @param { string } buttonText\r\n * */\nfunction AddButtonComponent(buttonText) {\n  var button = document.createElement(\"button\");\n  button.className = \"flex flex-row items-center gap-1 bg-primary py-2 px-3 text-text font-bold text-base\";\n  button.appendChild((0,_icons_PlusSign__WEBPACK_IMPORTED_MODULE_0__.PlusSignComponent)());\n  button.appendChild(document.createTextNode(buttonText));\n  return button;\n}\n\n//# sourceURL=webpack://odin-todo/./src/components/buttons/AddButton.js?");

/***/ }),

/***/ "./src/components/icons/HorizontalDivider.js":
/*!***************************************************!*\
  !*** ./src/components/icons/HorizontalDivider.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HorizontalDividerComponent: () => (/* binding */ HorizontalDividerComponent)\n/* harmony export */ });\nfunction HorizontalDividerComponent() {\n  var hr = document.createElement('hr');\n  hr.className = \"border-text border-t-2 my-4\";\n  return hr.cloneNode(true);\n}\n\n//# sourceURL=webpack://odin-todo/./src/components/icons/HorizontalDivider.js?");

/***/ }),

/***/ "./src/components/icons/PlusSign.js":
/*!******************************************!*\
  !*** ./src/components/icons/PlusSign.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PlusSignComponent: () => (/* binding */ PlusSignComponent)\n/* harmony export */ });\nfunction PlusSignComponent() {\n  var template = document.createElement(\"template\");\n  template.innerHTML = \"<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"100\\\" height=\\\"100\\\" viewBox=\\\"0 0 100 100\\\"><line x1=\\\"30\\\" y1=\\\"50\\\" x2=\\\"70\\\" y2=\\\"50\\\" class=\\\"stroke-text\\\" stroke-width=\\\"10\\\"/><line x1=\\\"50\\\" y1=\\\"30\\\" x2=\\\"50\\\" y2=\\\"70\\\" class=\\\"stroke-text\\\" stroke-width=\\\"10\\\"/></svg>\";\n  return template.content.cloneNode(true);\n}\n\n//# sourceURL=webpack://odin-todo/./src/components/icons/PlusSign.js?");

/***/ }),

/***/ "./src/components/inputs/CheckBox.js":
/*!*******************************************!*\
  !*** ./src/components/inputs/CheckBox.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CheckBoxComponent: () => (/* binding */ CheckBoxComponent)\n/* harmony export */ });\n/**\r\n * @param { boolean } [isDisabled=false] - choose state: clickable or non-clickable checkbox\r\n * @param { boolean } [isChecked=false] - choose state: checked or not checked\r\n * */\nfunction CheckBoxComponent() {\n  var isDisabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  var isChecked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  var label = document.createElement(\"label\");\n  label.className = \"custom-checkbox-wrapper\";\n  var input = document.createElement(\"input\");\n  input.className = \"form-checkbox\";\n  input.type = \"checkbox\";\n  var span = document.createElement(\"span\");\n  if (isDisabled) {\n    input.setAttribute(\"disabled\", \"\");\n    span.className = \"disabled-indicator\";\n  } else {\n    span.className = \"custom-checkbox-indicator\";\n  }\n  if (isChecked) {\n    input.setAttribute(\"checked\", \"\");\n  }\n  input.addEventListener(\"change\", function (e) {\n    e.preventDefault();\n    span.classList.value = \"\".concat(span.classList.value === \"disabled-indicator\" ? \"custom-checkbox-indicator\" : \"disabled-indicator\");\n  });\n  label.append(input, span);\n  return label;\n}\n\n//# sourceURL=webpack://odin-todo/./src/components/inputs/CheckBox.js?");

/***/ }),

/***/ "./src/components/sections/TitleBar.js":
/*!*********************************************!*\
  !*** ./src/components/sections/TitleBar.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TitleBar: () => (/* binding */ TitleBar)\n/* harmony export */ });\n/* harmony import */ var _buttons_AddButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../buttons/AddButton */ \"./src/components/buttons/AddButton.js\");\n/* harmony import */ var _icons_HorizontalDivider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/HorizontalDivider */ \"./src/components/icons/HorizontalDivider.js\");\n\n\n\n/**\r\n *\r\n * @param { string } title - large h2 level text in section\r\n * @param { string } buttonText - text that wil be added to the button\r\n *\r\n * */\nfunction TitleBar(title, buttonText) {\n  var container = document.createElement(\"div\");\n  container.className = \"flex flex-row content-between\";\n  var h2 = document.createElement(\"h2\");\n  h2.className = \"text-text font-bold text-2xl\";\n  h2.textContent = title;\n  var addButton = (0,_buttons_AddButton__WEBPACK_IMPORTED_MODULE_0__.AddButtonComponent)(buttonText);\n  var hr = (0,_icons_HorizontalDivider__WEBPACK_IMPORTED_MODULE_1__.HorizontalDividerComponent)();\n  container.appendChild(h2);\n  container.appendChild(addButton);\n  container.appendChild(hr);\n  return container;\n}\n\n//# sourceURL=webpack://odin-todo/./src/components/sections/TitleBar.js?");

/***/ }),

/***/ "./src/components/sections/Todo.js":
/*!*****************************************!*\
  !*** ./src/components/sections/Todo.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoComponent: () => (/* binding */ TodoComponent)\n/* harmony export */ });\n/* harmony import */ var _inputs_CheckBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../inputs/CheckBox */ \"./src/components/inputs/CheckBox.js\");\n/* harmony import */ var _logic_todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../logic/todo */ \"./src/logic/todo.js\");\n/* harmony import */ var _icons_HorizontalDivider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/HorizontalDivider */ \"./src/components/icons/HorizontalDivider.js\");\n\n\n\n\n/**\r\n * Checks if all arguments are null.\r\n *\r\n * @param {...(string|number|boolean|null)} args - The arguments to check.\r\n * @returns { boolean } True if all arguments are null, false otherwise.\r\n *\r\n */\nfunction checkAllArgumentsNull() {\n  /**@type { boolean } */\n  var tmp = false;\n  if (Array.prototype.every.call(arguments, function (arg) {\n    return arg === null;\n  })) {\n    tmp = true;\n  }\n  return tmp;\n}\n\n/**\r\n * @param { string | null } todoId\r\n * @param { string | null } todoTitle\r\n * @param { string | null } todoNote\r\n * @param { number | null } todoPriority\r\n * @param { boolean | null} todoComplete\r\n * @param { string | null } todoList\r\n *\r\n * */\nfunction TodoComponent() {\n  var todoId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  var todoTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  var todoNote = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  var todoPriority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;\n  var todoComplete = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;\n  var todoList = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;\n  var container = document.createElement(\"div\");\n  container.className = \"flex flex-row gap-2 justify-center items-center\";\n  var hr = (0,_icons_HorizontalDivider__WEBPACK_IMPORTED_MODULE_2__.HorizontalDividerComponent)();\n  if (checkAllArgumentsNull(todoId, todoTitle, todoNote, todoPriority, todoComplete, todoList)) {\n    container.setAttribute(\"data-todo-id\", \"\");\n    var checkBox = (0,_inputs_CheckBox__WEBPACK_IMPORTED_MODULE_0__.CheckBoxComponent)(true);\n    var wrapper = document.createElement(\"div\");\n    var h3 = document.createElement(\"h3\");\n    h3.className = \"h-3\";\n    var contentPlaceholder = document.createElement(\"div\");\n    contentPlaceholder.className = \"h-4\";\n    wrapper.appendChild(h3);\n    wrapper.appendChild(contentPlaceholder);\n    container.appendChild(checkBox);\n    container.appendChild(wrapper);\n    container.appendChild(hr);\n    return container;\n  } else {\n    var priority;\n    switch (todoPriority) {\n      case _logic_todo__WEBPACK_IMPORTED_MODULE_1__.Priority.HIGH:\n        priority = \"!!!\";\n        break;\n      case _logic_todo__WEBPACK_IMPORTED_MODULE_1__.Priority.MEDIUM:\n        priority = \"!!\";\n        break;\n      case _logic_todo__WEBPACK_IMPORTED_MODULE_1__.Priority.LOW:\n        priority = \"!\";\n        break;\n      default:\n        priority = \"\";\n        break;\n    }\n    if (todoComplete === null) {\n      todoComplete = false;\n    }\n    container.setAttribute(\"data-todo-id\", \"\".concat(todoId === null ? \"\" : todoId));\n    var _checkBox = (0,_inputs_CheckBox__WEBPACK_IMPORTED_MODULE_0__.CheckBoxComponent)(false, todoComplete);\n    var _wrapper = document.createElement(\"div\");\n    _wrapper.className = \"flex flex-col gap-2\";\n    var title = document.createElement(\"h3\");\n    title.className = \"text-text text-xl font-bold\";\n    title.textContent = todoTitle;\n    var noteAndContentWrapper = document.createElement(\"div\");\n    noteAndContentWrapper.className = \"flex flex-row gap-1 justify-center content-between text-text font-medium text-xs\";\n    var note = document.createElement(\"p\");\n    note.textContent = \"\".concat(todoNote === null ? \"\" : todoNote);\n    var listAndPriorityWrapper = document.createElement(\"div\");\n    listAndPriorityWrapper.className = \"flex flex-row gap-2\";\n    var list = document.createElement(\"p\");\n    list.className = \"\".concat(todoList === null ? \"\" : \"bg-secondary rounded-lg text-text font-semibold\");\n    list.textContent = \"\".concat(todoList === null ? \"\" : todoList);\n    var displayPriority = document.createElement(\"p\");\n    displayPriority.className = \"\".concat(priority === \"\" ? \"\" : \"text-red-500\");\n    displayPriority.textContent = priority;\n    listAndPriorityWrapper.appendChild(list);\n    listAndPriorityWrapper.appendChild(displayPriority);\n    noteAndContentWrapper.appendChild(note);\n    noteAndContentWrapper.appendChild(listAndPriorityWrapper);\n    _wrapper.appendChild(title);\n    _wrapper.appendChild(noteAndContentWrapper);\n    container.appendChild(_checkBox);\n    container.appendChild(_wrapper);\n    container.appendChild(hr);\n    return container;\n  }\n}\n\n//# sourceURL=webpack://odin-todo/./src/components/sections/Todo.js?");

/***/ }),

/***/ "./src/logic/todo.js":
/*!***************************!*\
  !*** ./src/logic/todo.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Priority: () => (/* binding */ Priority),\n/* harmony export */   Todo: () => (/* binding */ Todo)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : String(i); }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }\nfunction _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }\nfunction _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError(\"Cannot initialize the same private elements twice on an object\"); } }\nfunction _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError(\"attempted to get private field on non-instance\"); } return fn; }\nfunction _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, \"get\"); return _classApplyDescriptorGet(receiver, descriptor); }\nfunction _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }\nfunction _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, \"set\"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }\nfunction _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError(\"attempted to \" + action + \" private field on non-instance\"); } return privateMap.get(receiver); }\nfunction _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError(\"attempted to set read only private field\"); } descriptor.value = value; } }\n/** @enum { number } */\nvar Priority = {\n  NONE: 0,\n  LOW: 1,\n  MEDIUM: 2,\n  HIGH: 3\n};\n\n/** @enum { string } */\nvar AllowedTypes = {\n  NUMBER: \"number\",\n  STRING: \"string\",\n  BOOLEAN: \"boolean\"\n};\n\n/**\r\n * @typedef {Object} TodoObject\r\n * @property {string} id\r\n * @property {string} title\r\n * @property {string} note\r\n * @property {string} list\r\n * @property {Priority} priority\r\n * @property {boolean} complete\r\n */\nvar _id = /*#__PURE__*/new WeakMap();\nvar _handleLocalStorageGet = /*#__PURE__*/new WeakSet();\nvar _handleLocalStorageSet = /*#__PURE__*/new WeakSet();\nvar Todo = /*#__PURE__*/function () {\n  function Todo() {\n    _classCallCheck(this, Todo);\n    /**\r\n     * handle setting value of todo properies in local storage\r\n     *\r\n     * @param { string } property - key of the value to you would like to modify\r\n     * @param { number | string | boolean } newValue - new value you would like to set the key\r\n     * @param { AllowedTypes } newValueType - type of the newValue, need to be boolean, number, or string\r\n     * */\n    _classPrivateMethodInitSpec(this, _handleLocalStorageSet);\n    /**\r\n     * handle getting item form local storage on todo properties\r\n     *\r\n     * @param { string } property - key you would like to access the value to on this todo object\r\n     * @returns { Error | string | boolean | number }\r\n     * */\n    _classPrivateMethodInitSpec(this, _handleLocalStorageGet);\n    /** @type { string }*/\n    _classPrivateFieldInitSpec(this, _id, {\n      writable: true,\n      value: void 0\n    });\n    _classPrivateFieldSet(this, _id, (Date.now() + Math.random()).toString());\n    localStorage.setItem(_classPrivateFieldGet(this, _id), JSON.stringify({\n      id: _classPrivateFieldGet(this, _id),\n      title: \"\",\n      note: \"\",\n      list: \"\",\n      priority: Priority.NONE,\n      complete: false\n    }));\n  }\n\n  /**\r\n   * Returns an array of all Todo instances stored in localStorage.\r\n   * @returns { TodoObject[] | null } An array of Todo objects.\r\n   */\n  _createClass(Todo, [{\n    key: \"id\",\n    get: /** @returns { string } todo unique id number as a string */\n    function get() {\n      return _classPrivateFieldGet(this, _id);\n    }\n  }, {\n    key: \"title\",\n    get: /**@returns { string | null }*/\n    function get() {\n      try {\n        var value = _classPrivateMethodGet(this, _handleLocalStorageGet, _handleLocalStorageGet2).call(this, \"title\").toString();\n        if (typeof value !== \"string\") {\n          throw TypeError(\"Value accessed was not a string\");\n        }\n        return value;\n      } catch (error) {\n        console.error(error);\n        return null;\n      }\n    }\n\n    /**@param { string } title */,\n    set: function set(title) {\n      _classPrivateMethodGet(this, _handleLocalStorageSet, _handleLocalStorageSet2).call(this, \"title\", title, AllowedTypes.STRING);\n    }\n\n    /**@returns { string | null }*/\n  }, {\n    key: \"note\",\n    get: function get() {\n      try {\n        var value = _classPrivateMethodGet(this, _handleLocalStorageGet, _handleLocalStorageGet2).call(this, \"note\").toString();\n        if (typeof value !== \"string\") {\n          throw TypeError(\"Value accessed was not a string\");\n        }\n        return value;\n      } catch (error) {\n        console.error(error);\n        return null;\n      }\n    }\n\n    /**@param { string } note */,\n    set: function set(note) {\n      _classPrivateMethodGet(this, _handleLocalStorageSet, _handleLocalStorageSet2).call(this, \"note\", note, AllowedTypes.STRING);\n    }\n\n    /**@returns { string | null }*/\n  }, {\n    key: \"list\",\n    get: function get() {\n      try {\n        var value = _classPrivateMethodGet(this, _handleLocalStorageGet, _handleLocalStorageGet2).call(this, \"list\").toString();\n        if (typeof value !== \"string\") {\n          throw TypeError(\"Value accessed was not a string\");\n        }\n        return value;\n      } catch (error) {\n        console.error(error);\n        return null;\n      }\n    }\n\n    /**@param { string } list */,\n    set: function set(list) {\n      _classPrivateMethodGet(this, _handleLocalStorageSet, _handleLocalStorageSet2).call(this, \"list\", list, AllowedTypes.STRING);\n    }\n\n    /**@returns { number | null}*/\n  }, {\n    key: \"priority\",\n    get: function get() {\n      try {\n        var value = Number(_classPrivateMethodGet(this, _handleLocalStorageGet, _handleLocalStorageGet2).call(this, \"priority\"));\n        if (typeof value !== \"number\") {\n          throw TypeError(\"Value accessed was not a number\");\n        }\n        return value;\n      } catch (error) {\n        console.error(error);\n        return null;\n      }\n    }\n\n    /**@param { Priority } priority */,\n    set: function set(priority) {\n      _classPrivateMethodGet(this, _handleLocalStorageSet, _handleLocalStorageSet2).call(this, \"priority\", priority, AllowedTypes.NUMBER);\n    }\n\n    /**@returns { boolean | null }*/\n  }, {\n    key: \"complete\",\n    get: function get() {\n      try {\n        var value = _classPrivateMethodGet(this, _handleLocalStorageGet, _handleLocalStorageGet2).call(this, \"complete\");\n        if (typeof value !== \"boolean\") {\n          throw TypeError(\"Value accessed was not a boolean\");\n        }\n        return value;\n      } catch (error) {\n        console.error(error);\n        return null;\n      }\n    }\n\n    /**@param { boolean } complete */,\n    set: function set(complete) {\n      _classPrivateMethodGet(this, _handleLocalStorageSet, _handleLocalStorageSet2).call(this, \"complete\", complete, AllowedTypes.BOOLEAN);\n    }\n  }], [{\n    key: \"allInstances\",\n    get: function get() {\n      try {\n        if (localStorage.length === 0) {\n          throw new ReferenceError(\"Not able to access value of null\");\n        }\n\n        /** @type { TodoObject[] } */\n        var todos = [];\n        for (var todoId in localStorage) {\n          var todoString = localStorage.getItem(todoId);\n          if (todoString !== null) {\n            /** @type { TodoObject } */\n            var todo = JSON.parse(todoString);\n            todos.push(todo);\n          }\n        }\n        return todos;\n      } catch (error) {\n        console.error(error);\n        return null;\n      }\n    }\n\n    /**\r\n     * @param { string } id - id of the todo you would like to get\r\n     *\r\n     * @returns { Todo | null }\r\n     * */\n  }, {\n    key: \"getTodo\",\n    value: function getTodo(id) {\n      try {\n        if (typeof id !== \"string\") {\n          throw TypeError(\"Expect value of todo id to be a string\");\n        }\n        var todoString = localStorage.getItem(id);\n        if (todoString === null) {\n          throw new ReferenceError(\"Not able to access value of null\");\n        }\n        return JSON.parse(todoString);\n      } catch (error) {\n        console.error(error);\n        return null;\n      }\n    }\n  }]);\n  return Todo;\n}();\nfunction _handleLocalStorageGet2(property) {\n  var todoString = localStorage.getItem(_classPrivateFieldGet(this, _id));\n  if (todoString === null) {\n    throw new ReferenceError(\"Not able to access value of null\");\n  }\n  var todoObj = JSON.parse(todoString);\n  if (todoObj[property] !== undefined) {\n    return todoObj[property];\n  }\n  throw new ReferenceError(\"Not able to access undefined property\");\n}\nfunction _handleLocalStorageSet2(property, newValue, newValueType) {\n  if (_typeof(newValue) !== newValueType) {\n    throw new TypeError(\"Value must be a \".concat(newValueType));\n  }\n  if (property === \"priority\") {\n    if (newValue !== Priority.NONE && newValue !== Priority.LOW && newValue !== Priority.MEDIUM && newValue !== Priority.HIGH) {\n      throw new RangeError(\"Value provided for key priority is invalid\");\n    }\n  }\n  var todoString = localStorage.getItem(_classPrivateFieldGet(this, _id));\n  if (todoString === null) {\n    throw new ReferenceError(\"Not able to access value of null\");\n  }\n  var todoObj = JSON.parse(todoString);\n  if (typeof property !== \"string\") {\n    throw new TypeError(\"Value must be string\");\n  }\n  todoObj[property] = newValue;\n  localStorage.setItem(_classPrivateFieldGet(this, _id), JSON.stringify(todoObj));\n}\n\n//# sourceURL=webpack://odin-todo/./src/logic/todo.js?");

/***/ }),

/***/ "./src/views/home.js":
/*!***************************!*\
  !*** ./src/views/home.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RenderHomePage: () => (/* binding */ RenderHomePage)\n/* harmony export */ });\n/* harmony import */ var _components_sections_TitleBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/sections/TitleBar */ \"./src/components/sections/TitleBar.js\");\n/* harmony import */ var _components_sections_Todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/sections/Todo */ \"./src/components/sections/Todo.js\");\n/* harmony import */ var _logic_todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logic/todo */ \"./src/logic/todo.js\");\n/* harmony import */ var _components_buttons_ActionBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/buttons/ActionBar */ \"./src/components/buttons/ActionBar.js\");\n\n\n\n\nfunction RenderHomePage() {\n  var sectionContent = document.createElement('section');\n  var titleBar = (0,_components_sections_TitleBar__WEBPACK_IMPORTED_MODULE_0__.TitleBar)(\"All Todos\", \"Add Todos\");\n  var allTodos = _logic_todo__WEBPACK_IMPORTED_MODULE_2__.Todo.allInstances;\n  if (allTodos === null || allTodos === undefined) {\n    sectionContent.appendChild(titleBar);\n    sectionContent.appendChild((0,_components_sections_Todo__WEBPACK_IMPORTED_MODULE_1__.TodoComponent)());\n    // TODO: section to show my active list \n    sectionContent.appendChild((0,_components_buttons_ActionBar__WEBPACK_IMPORTED_MODULE_3__.ActionBarComponent)());\n    return sectionContent;\n  }\n  sectionContent.appendChild(titleBar);\n  var listOfTodoWrapper = document.createElement('div');\n  for (var i = 0; i < allTodos.length - 1; i++) {\n    var todo = allTodos[i];\n    listOfTodoWrapper.appendChild((0,_components_sections_Todo__WEBPACK_IMPORTED_MODULE_1__.TodoComponent)(todo.id, todo.title, todo.note, todo.priority, todo.complete, todo.list));\n  }\n  // TODO: make it so this empty todo can be clicked on to create a new todo\n  listOfTodoWrapper.appendChild((0,_components_sections_Todo__WEBPACK_IMPORTED_MODULE_1__.TodoComponent)());\n  sectionContent.appendChild(listOfTodoWrapper);\n  // TODO: section to show my active list \n  sectionContent.appendChild((0,_components_buttons_ActionBar__WEBPACK_IMPORTED_MODULE_3__.ActionBarComponent)());\n  return sectionContent;\n}\n\n//# sourceURL=webpack://odin-todo/./src/views/home.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;