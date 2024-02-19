"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_4_counter, $__parent_this_4_storage, $queue, $std_Json, $std_Number }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      {
        const $if_let_value = req.body;
        if ($if_let_value != undefined) {
          const body = $if_let_value;
          const id = String.raw({ raw: ["", ""] }, (await $__parent_this_4_counter.inc()));
          const prodId = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "id");
          const orderQty = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "qty");
          (await $__parent_this_4_storage.add(id, ({"id": id, "qty": ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return Number(args) })(orderQty), "prodId": prodId, "status": "PENDING"})));
          console.log("Sending to queue");
          (await $queue.push(((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"id": id, "prodId": prodId, "orderQty": orderQty}))));
          console.log("Queue recieved");
          return ({"status": 201, "body": prodId});
        }
        else {
          return ({"status": 400});
        }
      }
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.js.map