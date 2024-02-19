"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
const util = $stdlib.util;
const http = $stdlib.http;
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const Order = $stdlib.std.Struct._createJsonSchema({id:"/Order",type:"object",properties:{id:{type:"string"},productId:{type:"string"},qty:{type:"number"},status:{type:"string"},},required:["id","productId","qty","status",]});
    const Product = $stdlib.std.Struct._createJsonSchema({id:"/Product",type:"object",properties:{id:{type:"string"},imageUrl:{type:"string"},name:{type:"string"},price:{type:"number"},qty:{type:"number"},},required:["id","imageUrl","name","price","qty",]});
    class ProductStorage extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        const tableProps = ({"name": "ProductsTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "name": ColumnType.STRING, "qty": ColumnType.NUMBER, "price": ColumnType.NUMBER, "imageUrl": ColumnType.STRING})});
        this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "ex.Table", tableProps);
        this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ProductStorage-1.js")({
            $Product: ${$stdlib.core.liftObject(Product)},
            $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const ProductStorageClient = ${ProductStorage._toInflightType()};
            const client = new ProductStorageClient({
              $this_counter: ${$stdlib.core.liftObject(this.counter)},
              $this_db: ${$stdlib.core.liftObject(this.db)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "_add": [
            [this.db, ["insert"]],
          ],
          "add": [
            [this, ["_add"]],
            [this.counter, ["inc"]],
          ],
          "remove": [
            [this.db, ["delete"]],
          ],
          "get": [
            [this.db, ["tryGet"]],
          ],
          "list": [
            [this.db, ["list"]],
          ],
          "updateProduct": [
            [this.db, ["tryGet", "update"]],
          ],
          "$inflight_init": [
            [this.counter, []],
            [this.db, []],
          ],
        });
      }
    }
    class ProductService extends $stdlib.std.Resource {
      constructor($scope, $id, storage) {
        super($scope, $id);
        this.api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api", ({"cors": true, "corsOptions": ({"allowHeaders": ["*"], "allowMethods": [http.HttpMethod.POST]})}));
        this.productStorage = storage;
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
                $__parent_this_1_productStorage: ${$stdlib.core.liftObject(__parent_this_1.productStorage)},
                $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure1Client = ${$Closure1._toInflightType()};
                const client = new $Closure1Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_1.productStorage, ["add"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (this.api.post("/product", new $Closure1(this, "$Closure1")));
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
                $__parent_this_2_productStorage: ${$stdlib.core.liftObject(__parent_this_2.productStorage)},
                $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure2Client = ${$Closure2._toInflightType()};
                const client = new $Closure2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_2.productStorage, ["get"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (this.api.get("/product/:id", new $Closure2(this, "$Closure2")));
        const __parent_this_3 = this;
        class $Closure3 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.js")({
                $__parent_this_3_productStorage: ${$stdlib.core.liftObject(__parent_this_3.productStorage)},
                $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure3Client = ${$Closure3._toInflightType()};
                const client = new $Closure3Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_3.productStorage, ["list"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (this.api.get("/products", new $Closure3(this, "$Closure3")));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ProductService-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const ProductServiceClient = ${ProductService._toInflightType()};
            const client = new ProductServiceClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class OrderStorage extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        const orderProps = ({"name": "OrdersTable", "primaryKey": "id", "columns": ({"id": ColumnType.STRING, "prodId": ColumnType.STRING, "qty": ColumnType.NUMBER, "status": ColumnType.STRING})});
        this.db = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "ex.Table", orderProps);
        this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.OrderStorage-1.js")({
            $Order: ${$stdlib.core.liftObject(Order)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const OrderStorageClient = ${OrderStorage._toInflightType()};
            const client = new OrderStorageClient({
              $this_counter: ${$stdlib.core.liftObject(this.counter)},
              $this_db: ${$stdlib.core.liftObject(this.db)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "add": [
            [this.counter, ["inc"]],
            [this.db, ["insert"]],
          ],
          "remove": [
            [this.db, ["delete"]],
          ],
          "get": [
            [this.db, ["tryGet"]],
          ],
          "list": [
            [this.db, ["list"]],
          ],
          "updateOrderStatus": [
            [this.db, ["update"]],
          ],
          "$inflight_init": [
            [this.counter, []],
            [this.db, []],
          ],
        });
      }
    }
    class OrderService extends $stdlib.std.Resource {
      constructor($scope, $id, storage, prodStore) {
        super($scope, $id);
        this.api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api", ({"cors": true, "corsOptions": ({"allowHeaders": ["*"], "allowMethods": [http.HttpMethod.POST]})}));
        this.storage = storage;
        this.prodStorage = prodStore;
        this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
        const __parent_this_4 = this;
        class $Closure4 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.js")({
                $__parent_this_4_counter: ${$stdlib.core.liftObject(__parent_this_4.counter)},
                $__parent_this_4_storage: ${$stdlib.core.liftObject(__parent_this_4.storage)},
                $queue: ${$stdlib.core.liftObject(queue)},
                $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
                $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure4Client = ${$Closure4._toInflightType()};
                const client = new $Closure4Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_4.counter, ["inc"]],
                [__parent_this_4.storage, ["add"]],
                [queue, ["push"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (this.api.post("/order/:id/:qty", new $Closure4(this, "$Closure4")));
        const __parent_this_5 = this;
        class $Closure5 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-1.js")({
                $__parent_this_5_storage: ${$stdlib.core.liftObject(__parent_this_5.storage)},
                $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure5Client = ${$Closure5._toInflightType()};
                const client = new $Closure5Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_5.storage, ["get"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (this.api.get("/order/:id", new $Closure5(this, "$Closure5")));
        const __parent_this_6 = this;
        class $Closure6 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure6-1.js")({
                $__parent_this_6_storage: ${$stdlib.core.liftObject(__parent_this_6.storage)},
                $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure6Client = ${$Closure6._toInflightType()};
                const client = new $Closure6Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_6.storage, ["list"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (this.api.get("/orders", new $Closure6(this, "$Closure6")));
        const __parent_this_7 = this;
        class $Closure7 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure7-1.js")({
                $__parent_this_7_prodStorage: ${$stdlib.core.liftObject(__parent_this_7.prodStorage)},
                $__parent_this_7_storage: ${$stdlib.core.liftObject(__parent_this_7.storage)},
                $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
                $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure7Client = ${$Closure7._toInflightType()};
                const client = new $Closure7Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_7.prodStorage, ["updateProduct"]],
                [__parent_this_7.storage, ["updateOrderStatus"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (queue.setConsumer(new $Closure7(this, "$Closure7"), { timeout: (std.Duration.fromSeconds(3)) }));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.OrderService-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const OrderServiceClient = ${OrderService._toInflightType()};
            const client = new OrderServiceClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const queue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "cloud.Queue");
    const ColumnType =
      (function (tmp) {
        tmp[tmp["STRING"] = 0] = ",STRING";
        tmp[tmp["NUMBER"] = 1] = ",NUMBER";
        return tmp;
      })({})
    ;
    const OrderStatus =
      (function (tmp) {
        tmp[tmp["PENDING"] = 0] = ",PENDING";
        tmp[tmp["PROCESSING"] = 1] = ",PROCESSING";
        tmp[tmp["COMPLETED"] = 2] = ",COMPLETED";
        return tmp;
      })({})
    ;
    const productStorage = new ProductStorage(this, "ProductStorage");
    const orderStorage = new OrderStorage(this, "OrderStorage");
    const productApi = new ProductService(this, "ProductService", productStorage);
    const orderApi = new OrderService(this, "OrderService", orderStorage, productStorage);
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "main", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map