"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (new (require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/target-sim/queue.setconsumer.inflight.js")).QueueSetConsumerHandlerClient({ handler: 
              (await (async () => {
                const $Closure7Client = 
              require("/home/fonchu/Desktop/winlang/learn/target/test/main.wsim/.wing/inflight.$Closure7-1.js")({
                $__parent_this_7_prodStorage: 
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
                $__parent_this_7_storage: 
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
                $std_Json: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
                $std_Number: require("/home/fonchu/.nvm/versions/node/v21.4.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js").Number,
              })
            ;
                const client = new $Closure7Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            , args: {} }));
  return await $handler.handle(event);
};