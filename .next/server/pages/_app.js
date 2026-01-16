/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/CartContext.js":
/*!********************************!*\
  !*** ./context/CartContext.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CartProvider: () => (/* binding */ CartProvider),\n/* harmony export */   useCart: () => (/* binding */ useCart)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction getInitialCart() {\n    if (true) return [];\n    try {\n        const raw = window.localStorage.getItem(\"cart\");\n        if (!raw) return [];\n        const parsed = JSON.parse(raw);\n        return Array.isArray(parsed) ? parsed : [];\n    } catch (e) {\n        console.warn(\"Failed to parse cart from storage\", e);\n        return [];\n    }\n}\nconst CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction cartReducer(state, action) {\n    switch(action.type){\n        case \"HYDRATE\":\n            return action.payload || [];\n        case \"ADD\":\n            {\n                const exists = state.find((i)=>i.id === action.payload.id);\n                if (exists) return state.map((i)=>i.id === action.payload.id ? {\n                        ...i,\n                        quantity: i.quantity + 1\n                    } : i);\n                return [\n                    ...state,\n                    {\n                        ...action.payload,\n                        quantity: 1\n                    }\n                ];\n            }\n        case \"REMOVE\":\n            return state.filter((i)=>i.id !== action.payload.id);\n        case \"CLEAR\":\n            return [];\n        default:\n            return state;\n    }\n}\nfunction CartProvider({ children }) {\n    // Start empty on server to avoid hydration mismatch; hydrate from storage on client\n    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(cartReducer, []);\n    const [hydrated, setHydrated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // Hydrate from localStorage after mount\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initial = getInitialCart();\n        dispatch({\n            type: \"HYDRATE\",\n            payload: initial\n        });\n        setHydrated(true);\n        // notify once to sync listeners with hydrated count\n        if (false) {}\n    }, []);\n    // Persist cart when hydrated\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!hydrated) return; // avoid overwriting persisted cart before hydration completes\n        try {\n            window.localStorage.setItem(\"cart\", JSON.stringify(state));\n            // notify listeners after storage is updated so they read fresh data\n            window.dispatchEvent(new CustomEvent(\"cart-changed\"));\n        } catch (e) {\n            console.warn(\"Failed to persist cart to storage\", e);\n        }\n    }, [\n        state,\n        hydrated\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // expose a simple global helper for non-hook callers (e.g., product cards)\n        if (false) {}\n        return ()=>{\n            if (false) {}\n        };\n    }, []);\n    const add = (product)=>{\n        dispatch({\n            type: \"ADD\",\n            payload: product\n        });\n    };\n    const remove = (product)=>{\n        dispatch({\n            type: \"REMOVE\",\n            payload: product\n        });\n    };\n    const clear = ()=>{\n        dispatch({\n            type: \"CLEAR\"\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CartContext.Provider, {\n        value: {\n            cart: state,\n            add,\n            remove,\n            clear\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\pc vision\\\\OneDrive\\\\Desktop\\\\ecommerece website\\\\context\\\\CartContext.js\",\n        lineNumber: 81,\n        columnNumber: 5\n    }, this);\n}\nconst useCart = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CartContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM5RSxNQUFNRyxRQUFRO1FBQVFaLFNBQVM7WUFBRVgsTUFBTTtRQUFRO0lBQUk7SUFFbkQscUJBQ0UsOERBQUNKLFlBQVk0QixRQUFRO1FBQUNDLE9BQU87WUFBRUMsTUFBTTVCO1lBQU91QjtZQUFLQztZQUFRQztRQUFNO2tCQUM1RGI7Ozs7OztBQUdQO0FBRU8sTUFBTWlCLFVBQVUsSUFBTWhELGlEQUFVQSxDQUFDaUIsYUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL3NxdWF0d29sZi1jbG9uZS8uL2NvbnRleHQvQ2FydENvbnRleHQuanM/YzM5NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VSZWR1Y2VyLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZnVuY3Rpb24gZ2V0SW5pdGlhbENhcnQoKSB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gW107XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJhdyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydCcpO1xyXG4gICAgaWYgKCFyYXcpIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UocmF3KTtcclxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBhcnNlZCkgPyBwYXJzZWQgOiBbXTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBwYXJzZSBjYXJ0IGZyb20gc3RvcmFnZScsIGUpO1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgQ2FydENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XHJcblxyXG5mdW5jdGlvbiBjYXJ0UmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSAnSFlEUkFURSc6XHJcbiAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZCB8fCBbXTtcclxuICAgIGNhc2UgJ0FERCc6IHtcclxuICAgICAgY29uc3QgZXhpc3RzID0gc3RhdGUuZmluZCgoaSkgPT4gaS5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWQpO1xyXG4gICAgICBpZiAoZXhpc3RzKSByZXR1cm4gc3RhdGUubWFwKChpKSA9PiBpLmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZCA/IHsgLi4uaSwgcXVhbnRpdHk6IGkucXVhbnRpdHkgKyAxIH0gOiBpKTtcclxuICAgICAgcmV0dXJuIFsuLi5zdGF0ZSwgeyAuLi5hY3Rpb24ucGF5bG9hZCwgcXVhbnRpdHk6IDEgfV07XHJcbiAgICB9XHJcbiAgICBjYXNlICdSRU1PVkUnOlxyXG4gICAgICByZXR1cm4gc3RhdGUuZmlsdGVyKChpKSA9PiBpLmlkICE9PSBhY3Rpb24ucGF5bG9hZC5pZCk7XHJcbiAgICBjYXNlICdDTEVBUic6XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDYXJ0UHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XHJcbiAgLy8gU3RhcnQgZW1wdHkgb24gc2VydmVyIHRvIGF2b2lkIGh5ZHJhdGlvbiBtaXNtYXRjaDsgaHlkcmF0ZSBmcm9tIHN0b3JhZ2Ugb24gY2xpZW50XHJcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGNhcnRSZWR1Y2VyLCBbXSk7XHJcbiAgY29uc3QgW2h5ZHJhdGVkLCBzZXRIeWRyYXRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIC8vIEh5ZHJhdGUgZnJvbSBsb2NhbFN0b3JhZ2UgYWZ0ZXIgbW91bnRcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaW5pdGlhbCA9IGdldEluaXRpYWxDYXJ0KCk7XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdIWURSQVRFJywgcGF5bG9hZDogaW5pdGlhbCB9KTtcclxuICAgIHNldEh5ZHJhdGVkKHRydWUpO1xyXG4gICAgLy8gbm90aWZ5IG9uY2UgdG8gc3luYyBsaXN0ZW5lcnMgd2l0aCBoeWRyYXRlZCBjb3VudFxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRyeSB7IHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2FydC1jaGFuZ2VkJykpOyB9IGNhdGNoIChlKSB7fVxyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gUGVyc2lzdCBjYXJ0IHdoZW4gaHlkcmF0ZWRcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoeWRyYXRlZCkgcmV0dXJuOyAvLyBhdm9pZCBvdmVyd3JpdGluZyBwZXJzaXN0ZWQgY2FydCBiZWZvcmUgaHlkcmF0aW9uIGNvbXBsZXRlc1xyXG4gICAgdHJ5IHtcclxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXJ0JywgSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTtcclxuICAgICAgLy8gbm90aWZ5IGxpc3RlbmVycyBhZnRlciBzdG9yYWdlIGlzIHVwZGF0ZWQgc28gdGhleSByZWFkIGZyZXNoIGRhdGFcclxuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdjYXJ0LWNoYW5nZWQnKSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignRmFpbGVkIHRvIHBlcnNpc3QgY2FydCB0byBzdG9yYWdlJywgZSk7XHJcbiAgICB9XHJcbiAgfSwgW3N0YXRlLCBoeWRyYXRlZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gZXhwb3NlIGEgc2ltcGxlIGdsb2JhbCBoZWxwZXIgZm9yIG5vbi1ob29rIGNhbGxlcnMgKGUuZy4sIHByb2R1Y3QgY2FyZHMpXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgd2luZG93Ll9fYWRkVG9DYXJ0ID0gKHByb2R1Y3QpID0+IHtcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdBREQnLCBwYXlsb2FkOiBwcm9kdWN0IH0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSBkZWxldGUgd2luZG93Ll9fYWRkVG9DYXJ0O1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGFkZCA9IChwcm9kdWN0KSA9PiB7IGRpc3BhdGNoKHsgdHlwZTogJ0FERCcsIHBheWxvYWQ6IHByb2R1Y3QgfSk7IH07XHJcbiAgY29uc3QgcmVtb3ZlID0gKHByb2R1Y3QpID0+IHsgZGlzcGF0Y2goeyB0eXBlOiAnUkVNT1ZFJywgcGF5bG9hZDogcHJvZHVjdCB9KTsgfTtcclxuICBjb25zdCBjbGVhciA9ICgpID0+IHsgZGlzcGF0Y2goeyB0eXBlOiAnQ0xFQVInIH0pOyB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENhcnRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IGNhcnQ6IHN0YXRlLCBhZGQsIHJlbW92ZSwgY2xlYXIgfX0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvQ2FydENvbnRleHQuUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUNhcnQgPSAoKSA9PiB1c2VDb250ZXh0KENhcnRDb250ZXh0KTtcclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiZ2V0SW5pdGlhbENhcnQiLCJyYXciLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiQXJyYXkiLCJpc0FycmF5IiwiZSIsImNvbnNvbGUiLCJ3YXJuIiwiQ2FydENvbnRleHQiLCJjYXJ0UmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInBheWxvYWQiLCJleGlzdHMiLCJmaW5kIiwiaSIsImlkIiwibWFwIiwicXVhbnRpdHkiLCJmaWx0ZXIiLCJDYXJ0UHJvdmlkZXIiLCJjaGlsZHJlbiIsImRpc3BhdGNoIiwiaHlkcmF0ZWQiLCJzZXRIeWRyYXRlZCIsImluaXRpYWwiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiX19hZGRUb0NhcnQiLCJwcm9kdWN0IiwiYWRkIiwicmVtb3ZlIiwiY2xlYXIiLCJQcm92aWRlciIsInZhbHVlIiwiY2FydCIsInVzZUNhcnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./context/CartContext.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_CartContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/CartContext */ \"./context/CartContext.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst CartSidebar = next_dynamic__WEBPACK_IMPORTED_MODULE_3___default()(()=>__webpack_require__.e(/*! import() */ \"components_CartSidebar_js\").then(__webpack_require__.bind(__webpack_require__, /*! ../components/CartSidebar */ \"./components/CartSidebar.js\")), {\n    loadableGenerated: {\n        modules: [\n            \"pages\\\\_app.js -> \" + \"../components/CartSidebar\"\n        ]\n    },\n    ssr: false\n});\nfunction MyApp({ Component, pageProps }) {\n    const [isTransitioning, setIsTransitioning] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);\n    const [mobileMenuOpen, setMobileMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    // Page transitions\n    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{\n        const handleRouteChangeStart = ()=>{\n            setIsTransitioning(true);\n            setMobileMenuOpen(false);\n        };\n        const handleRouteChangeComplete = ()=>{\n            setIsTransitioning(false);\n        };\n        router.events.on(\"routeChangeStart\", handleRouteChangeStart);\n        router.events.on(\"routeChangeComplete\", handleRouteChangeComplete);\n        return ()=>{\n            router.events.off(\"routeChangeStart\", handleRouteChangeStart);\n            router.events.off(\"routeChangeComplete\", handleRouteChangeComplete);\n        };\n    }, [\n        router\n    ]);\n    // overlay click handler hides the sidebar\n    const hideCart = ()=>{\n        if (true) return;\n        const el = document.getElementById(\"cart-sidebar\");\n        if (el && !el.classList.contains(\"translate-x-full\")) el.classList.add(\"translate-x-full\");\n        const overlay = document.getElementById(\"cart-overlay\");\n        if (overlay) {\n            overlay.classList.add(\"opacity-0\");\n            setTimeout(()=>overlay.classList.add(\"hidden\"), 200);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_CartContext__WEBPACK_IMPORTED_MODULE_2__.CartProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: `page-transition ${isTransitioning ? \"fade-out\" : \"fade-in\"}`,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\pc vision\\\\OneDrive\\\\Desktop\\\\ecommerece website\\\\pages\\\\_app.js\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\pc vision\\\\OneDrive\\\\Desktop\\\\ecommerece website\\\\pages\\\\_app.js\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                id: \"cart-overlay\",\n                onClick: hideCart,\n                className: \"fixed inset-0 bg-black bg-opacity-50 hidden opacity-0 transition-opacity duration-200 z-40\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\pc vision\\\\OneDrive\\\\Desktop\\\\ecommerece website\\\\pages\\\\_app.js\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                id: \"cart-sidebar\",\n                className: \"fixed right-0 top-0 h-full w-full sm:w-96 md:w-[480px] lg:w-[520px] transform translate-x-full transition-transform duration-200 z-50\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CartSidebar, {}, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\pc vision\\\\OneDrive\\\\Desktop\\\\ecommerece website\\\\pages\\\\_app.js\",\n                    lineNumber: 52,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\pc vision\\\\OneDrive\\\\Desktop\\\\ecommerece website\\\\pages\\\\_app.js\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\pc vision\\\\OneDrive\\\\Desktop\\\\ecommerece website\\\\pages\\\\_app.js\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDdUI7QUFDbkI7QUFDSztBQUNJO0FBRTVDLE1BQU1LLGNBQWNKLG1EQUFPQSxDQUFDLElBQU0sc0xBQU87Ozs7OztJQUFnQ0ssS0FBSzs7QUFFL0QsU0FBU0MsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNwRCxNQUFNLENBQUNDLGlCQUFpQkMsbUJBQW1CLEdBQUdQLCtDQUFRQSxDQUFDO0lBQ3ZELE1BQU0sQ0FBQ1EsZ0JBQWdCQyxrQkFBa0IsR0FBR1QsK0NBQVFBLENBQUM7SUFDckQsTUFBTVUsU0FBU1osc0RBQVNBO0lBRXhCLG1CQUFtQjtJQUNuQkMsZ0RBQVNBLENBQUM7UUFDUixNQUFNWSx5QkFBeUI7WUFDN0JKLG1CQUFtQjtZQUNuQkUsa0JBQWtCO1FBQ3BCO1FBQ0EsTUFBTUcsNEJBQTRCO1lBQ2hDTCxtQkFBbUI7UUFDckI7UUFDQUcsT0FBT0csTUFBTSxDQUFDQyxFQUFFLENBQUMsb0JBQW9CSDtRQUNyQ0QsT0FBT0csTUFBTSxDQUFDQyxFQUFFLENBQUMsdUJBQXVCRjtRQUN4QyxPQUFPO1lBQ0xGLE9BQU9HLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLG9CQUFvQko7WUFDdENELE9BQU9HLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLHVCQUF1Qkg7UUFDM0M7SUFDRixHQUFHO1FBQUNGO0tBQU87SUFFWCwwQ0FBMEM7SUFDMUMsTUFBTU0sV0FBVztRQUNmLElBQUksSUFBa0IsRUFBYTtRQUNuQyxNQUFNQyxLQUFLQyxTQUFTQyxjQUFjLENBQUM7UUFDbkMsSUFBSUYsTUFBTSxDQUFDQSxHQUFHRyxTQUFTLENBQUNDLFFBQVEsQ0FBQyxxQkFBcUJKLEdBQUdHLFNBQVMsQ0FBQ0UsR0FBRyxDQUFDO1FBQ3ZFLE1BQU1DLFVBQVVMLFNBQVNDLGNBQWMsQ0FBQztRQUN4QyxJQUFJSSxTQUFTO1lBQ1hBLFFBQVFILFNBQVMsQ0FBQ0UsR0FBRyxDQUFDO1lBQ3RCRSxXQUFXLElBQUlELFFBQVFILFNBQVMsQ0FBQ0UsR0FBRyxDQUFDLFdBQVc7UUFDbEQ7SUFDRjtJQUVBLHFCQUNFLDhEQUFDMUIsOERBQVlBOzswQkFDWCw4REFBQzZCO2dCQUFJQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUVwQixrQkFBa0IsYUFBYSxVQUFVLENBQUM7MEJBQzNFLDRFQUFDRjtvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OzswQkFJMUIsOERBQUNvQjtnQkFBSUUsSUFBRztnQkFBZUMsU0FBU1o7Z0JBQVVVLFdBQVU7Ozs7OzswQkFDcEQsOERBQUNEO2dCQUFJRSxJQUFHO2dCQUFlRCxXQUFVOzBCQUMvQiw0RUFBQ3pCOzs7Ozs7Ozs7Ozs7Ozs7O0FBSVQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcXVhdHdvbGYtY2xvbmUvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xyXG5pbXBvcnQgeyBDYXJ0UHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L0NhcnRDb250ZXh0JztcclxuaW1wb3J0IGR5bmFtaWMgZnJvbSAnbmV4dC9keW5hbWljJztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgQ2FydFNpZGViYXIgPSBkeW5hbWljKCgpID0+IGltcG9ydCgnLi4vY29tcG9uZW50cy9DYXJ0U2lkZWJhcicpLCB7IHNzcjogZmFsc2UgfSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICBjb25zdCBbaXNUcmFuc2l0aW9uaW5nLCBzZXRJc1RyYW5zaXRpb25pbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2JpbGVNZW51T3Blbiwgc2V0TW9iaWxlTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG5cclxuICAvLyBQYWdlIHRyYW5zaXRpb25zXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZVJvdXRlQ2hhbmdlU3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgIHNldElzVHJhbnNpdGlvbmluZyh0cnVlKTtcclxuICAgICAgc2V0TW9iaWxlTWVudU9wZW4oZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGhhbmRsZVJvdXRlQ2hhbmdlQ29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgIHNldElzVHJhbnNpdGlvbmluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgcm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VTdGFydCcsIGhhbmRsZVJvdXRlQ2hhbmdlU3RhcnQpO1xyXG4gICAgcm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VDb21wbGV0ZScsIGhhbmRsZVJvdXRlQ2hhbmdlQ29tcGxldGUpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoJ3JvdXRlQ2hhbmdlU3RhcnQnLCBoYW5kbGVSb3V0ZUNoYW5nZVN0YXJ0KTtcclxuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBoYW5kbGVSb3V0ZUNoYW5nZUNvbXBsZXRlKTtcclxuICAgIH07XHJcbiAgfSwgW3JvdXRlcl0pO1xyXG5cclxuICAvLyBvdmVybGF5IGNsaWNrIGhhbmRsZXIgaGlkZXMgdGhlIHNpZGViYXJcclxuICBjb25zdCBoaWRlQ2FydCA9ICgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FydC1zaWRlYmFyJyk7XHJcbiAgICBpZiAoZWwgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucygndHJhbnNsYXRlLXgtZnVsbCcpKSBlbC5jbGFzc0xpc3QuYWRkKCd0cmFuc2xhdGUteC1mdWxsJyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnQtb3ZlcmxheScpO1xyXG4gICAgaWYgKG92ZXJsYXkpIHtcclxuICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LTAnKTtcclxuICAgICAgc2V0VGltZW91dCgoKT0+b3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSwgMjAwKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENhcnRQcm92aWRlcj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BwYWdlLXRyYW5zaXRpb24gJHtpc1RyYW5zaXRpb25pbmcgPyAnZmFkZS1vdXQnIDogJ2ZhZGUtaW4nfWB9PlxyXG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogR2xvYmFsIGNhcnQgb3ZlcmxheSBhbmQgc2lkZWJhciAoaGlkZGVuIGJ5IGRlZmF1bHQpICovfVxyXG4gICAgICA8ZGl2IGlkPVwiY2FydC1vdmVybGF5XCIgb25DbGljaz17aGlkZUNhcnR9IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS01MCBoaWRkZW4gb3BhY2l0eS0wIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0yMDAgei00MFwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGlkPVwiY2FydC1zaWRlYmFyXCIgY2xhc3NOYW1lPVwiZml4ZWQgcmlnaHQtMCB0b3AtMCBoLWZ1bGwgdy1mdWxsIHNtOnctOTYgbWQ6dy1bNDgwcHhdIGxnOnctWzUyMHB4XSB0cmFuc2Zvcm0gdHJhbnNsYXRlLXgtZnVsbCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0yMDAgei01MFwiPlxyXG4gICAgICAgIDxDYXJ0U2lkZWJhciAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvQ2FydFByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkNhcnRQcm92aWRlciIsImR5bmFtaWMiLCJ1c2VSb3V0ZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNhcnRTaWRlYmFyIiwic3NyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJpc1RyYW5zaXRpb25pbmciLCJzZXRJc1RyYW5zaXRpb25pbmciLCJtb2JpbGVNZW51T3BlbiIsInNldE1vYmlsZU1lbnVPcGVuIiwicm91dGVyIiwiaGFuZGxlUm91dGVDaGFuZ2VTdGFydCIsImhhbmRsZVJvdXRlQ2hhbmdlQ29tcGxldGUiLCJldmVudHMiLCJvbiIsIm9mZiIsImhpZGVDYXJ0IiwiZWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJvdmVybGF5Iiwic2V0VGltZW91dCIsImRpdiIsImNsYXNzTmFtZSIsImlkIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("styled-jsx/style");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();