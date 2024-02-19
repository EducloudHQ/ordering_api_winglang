"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
              (await (async () => {
                const $Closure4Client = 
              require("/home/fonchu/Desktop/winlang/learn/target/test/main.wsim/.wing/inflight.$Closure4-1.js")({
                $__parent_this_4_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_4e93a744;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_4e93a744");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle);
})(),
                $__parent_this_4_storage: 
          (await (async () => {
            const OrderStorageClient = 
          require("/home/fonchu/Desktop/winlang/learn/target/test/main.wsim/.wing/inflight.OrderStorage-1.js")({
            $Order: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"id":"/Order","type":"object","properties":{"id":{"type":"string"},"productId":{"type":"string"},"qty":{"type":"number"},"status":{"type":"string"}},"required":["id","productId","qty","status"]}),
          })
        ;
            const client = new OrderStorageClient({
              $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_0760136f;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_0760136f");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle);
})(),
              $this_db: (function() {
  let handle = process.env.TABLE_HANDLE_681d5788;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_681d5788");
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
                $queue: (function() {
  let handle = process.env.QUEUE_HANDLE_b48ed26c;
  if (!handle) {
    throw new Error("Missing environment variable: QUEUE_HANDLE_b48ed26c");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle);
})(),
                $std_Json: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
                $std_Number: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js").Number,
              })
            ;
                const client = new $Closure4Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            );
  return await $handler.handle(event);
};