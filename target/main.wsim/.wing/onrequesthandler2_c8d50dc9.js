"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
              (await (async () => {
                const $Closure6Client = 
              require("/home/fonchu/Desktop/winlang/learn/target/main.wsim/.wing/inflight.$Closure6-1.js")({
                $__parent_this_6_storage: 
          (await (async () => {
            const OrderStorageClient = 
          require("/home/fonchu/Desktop/winlang/learn/target/main.wsim/.wing/inflight.OrderStorage-1.js")({
            $Order: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"id":"/Order","type":"object","properties":{"id":{"type":"string"},"productId":{"type":"string"},"qty":{"type":"number"},"status":{"type":"string"}},"required":["id","productId","qty","status"]}),
          })
        ;
            const client = new OrderStorageClient({
              $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_52f7793a;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_52f7793a");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle);
})(),
              $this_db: (function() {
  let handle = process.env.TABLE_HANDLE_ad01cb57;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_ad01cb57");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle);
})(),
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
                $std_Json: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
              })
            ;
                const client = new $Closure6Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            );
  return await $handler.handle(event);
};