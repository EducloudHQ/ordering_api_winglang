"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_7_prodStorage, $__parent_this_7_storage, $std_Json, $std_Number }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(message) {
      const orderInfo = JSON.parse(message);
      const id = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(orderInfo, "id"));
      const prodId = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(orderInfo, "prodId"));
      const orderQty = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(orderInfo, "orderQty"));
      (await $__parent_this_7_prodStorage.updateProduct(prodId, ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return Number(args) })(orderQty)));
      (await $__parent_this_7_storage.updateOrderStatus(id, "COMPLETED"));
    }
  }
  return $Closure7;
}
//# sourceMappingURL=inflight.$Closure7-1.js.map