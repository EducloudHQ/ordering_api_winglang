"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
              (await (async () => {
                const $Closure1Client = 
              require("/home/fonchu/Desktop/winlang/learn/target/test/main.wsim/.wing/inflight.$Closure1-1.js")({
                $__parent_this_1_productStorage: 
          (await (async () => {
            const ProductStorageClient = 
          require("/home/fonchu/Desktop/winlang/learn/target/test/main.wsim/.wing/inflight.ProductStorage-1.js")({
            $Product: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js").JsonSchema._createJsonSchema({"id":"/Product","type":"object","properties":{"id":{"type":"string"},"imageUrl":{"type":"string"},"name":{"type":"string"},"price":{"type":"number"},"qty":{"type":"number"}},"required":["id","imageUrl","name","price","qty"]}),
            $std_Number: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js").Number,
          })
        ;
            const client = new ProductStorageClient({
              $this_counter: (function() {
  let handle = process.env.COUNTER_HANDLE_6b912a0c;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_6b912a0c");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle);
})(),
              $this_db: (function() {
  let handle = process.env.TABLE_HANDLE_012f170e;
  if (!handle) {
    throw new Error("Missing environment variable: TABLE_HANDLE_012f170e");
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
                const client = new $Closure1Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            );
  return await $handler.handle(event);
};