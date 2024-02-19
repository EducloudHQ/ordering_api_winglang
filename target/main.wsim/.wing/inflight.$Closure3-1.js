"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_3_productStorage, $std_Json }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const product = (await $__parent_this_3_productStorage.list());
      return ({"status": 200, "body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"message": "Product created successfully"}))});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map