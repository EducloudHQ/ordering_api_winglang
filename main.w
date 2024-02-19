bring cloud;
bring ex;
bring util;
bring http;
bring expect;

let queue = new cloud.Queue();

enum ColumnType {
  STRING,
  NUMBER
}

enum OrderStatus {
  PENDING,
  PROCESSING,
  COMPLETED
}

/*************************************************************************
 * Define a product Item Struct
 *************************************************************************/

struct Product {
  id: str;
  name: str;
  qty: num;
  price: num;
  imageUrl: str;
}

/*************************************************************************
 * Define an order Item Struct
 *************************************************************************/
struct Order {
  id: str;
  productId: str;
  qty: num;
  status: str;
}

/*************************************************************************
 * Define product interface
 *************************************************************************/
interface IProductStorage extends std.IResource {
  inflight add(product: Json): str;
  inflight remove(id: str): void;
  inflight get(id: str): Product?;
  inflight updateProduct(id: str, qty: num): void;
  inflight list(): Array<Json>;
}

/*************************************************************************
 * Define Order interface
 *************************************************************************/
interface IOrderStorage extends std.IResource {
  inflight add(id: str, j: Json): void;
  inflight get(id: str): Order?;
  inflight list(): Array<Json>?;
  inflight updateOrderStatus(id: str, status: str): void;
}

/******************************************************************************
 * Create a ProductStorage Class that implements the IProductStorage interface
 *****************************************************************************/
class ProductStorage impl IProductStorage {
  db: ex.Table;
  counter: cloud.Counter;
  

  new() {
    let tableProps = ex.TableProps{
      name: "ProductsTable",
      primaryKey: "id",
      columns: {
        id: ColumnType.STRING,
        name: ColumnType.STRING,
        qty: ColumnType.NUMBER,
        price: ColumnType.NUMBER,
        imageUrl: ColumnType.STRING
      }
    };
    this.db = new ex.Table(tableProps);
    this.counter = new cloud.Counter();
  }

  inflight _add(id: str, j: Json) {
    this.db.insert(id, j);
  }

  pub inflight add(product: Json): str {
    let id = "{this.counter.inc()}";
    let productJson = {
      id: id,
      name: product.get("name"),
      qty: product.get("qty"),
      price: product.get("price"),
      imageUrl: product.get("imageUrl")
    };
    this._add(id, productJson);
    log("adding task {id} with data: {productJson}");
    return id;
  }

  pub inflight remove(id: str) {
    this.db.delete(id);
    log("deleting product {id}");
  }

  pub inflight get(id: str): Product {
  let productJson = this.db.tryGet(id);
      return Product.fromJson(productJson);
  }

  pub inflight list(): Array<Json> {
  let productJson = this.db.list();
      return productJson;
  }

  pub inflight updateProduct(id: str, qty: num) {
      let productId = id;
      let orderQty = qty;
      let response = this.db.tryGet(productId);
      let prodQty = response!.get("qty");
      let totalQty = num.fromJson(prodQty) - orderQty;
      let updatedItem = {
        qty: totalQty
      };
      this.db.update(productId, updatedItem);
    }
}


/***************************************************
 * Create a ProductService Class with api endpoints
 ***************************************************/
class ProductService {
  pub api: cloud.Api;
  productStorage: IProductStorage;

  new(storage: IProductStorage) {
    this.api = new cloud.Api({
      cors: true,
      corsOptions: {
        allowHeaders: ["*"],
        allowMethods: [http.HttpMethod.POST],
      },
    });

    this.productStorage = storage;

    // API endpoints
    this.api.post("/product", inflight (req): cloud.ApiResponse => {
      if let body = req.body {
        let product = Json.parse(req.body!);
        let id = this.productStorage.add(product);
        return {
          status:201,
          body: id
        };
      } else {
        return {
          status: 400,
        };
      }
    });

    this.api.get("/product/:id", inflight (req): cloud.ApiResponse => {
        let id = req.vars.get("id");
        let product = this.productStorage.get(id);
        return {
          status:200,
          body: Json.stringify(product)
        };
    });

    this.api.get("/products", inflight (req): cloud.ApiResponse => {
        let product = this.productStorage.list();
        
        return {
          status:200,
          body: Json.stringify({
            message: "Product created successfully"
          })
        };
    });

  }
}


/******************************************************************************
 * Create a OrderStorage Class that implements the IOrderStorage interface
 *****************************************************************************/
class OrderStorage impl IOrderStorage {
  db: ex.Table;
  counter: cloud.Counter;
  new() {
    let orderProps = ex.TableProps{
      name: "OrdersTable",
      primaryKey: "id",
      columns: {
        id: ColumnType.STRING,
        prodId: ColumnType.STRING,
        qty: ColumnType.NUMBER,
        status: ColumnType.STRING
      }
    };
    this.db = new ex.Table(orderProps);
    this.counter = new cloud.Counter();
  }

  pub inflight add(name: str, productData: Json) {
    let id = "{this.counter.inc()}";
    this.db.insert(id, productData);
    
  }

  pub inflight remove(id: str) {
    this.db.delete(id);
    log("deleting product {id}");
  }

  pub inflight get(id: str): Order {
  let orderJson = this.db.tryGet(id);
      return Order.fromJson(orderJson);
  }

  pub inflight list(): Array<Json> {
  let orderJson = this.db.list();
      return orderJson;
  }

  pub inflight updateOrderStatus(id: str, status: str) {
      let updatedItem = {
        status: status
      };
      this.db.update(id, updatedItem);
    }
}


/***************************************************
 * Create a OrderService Class with api endpoints
 ***************************************************/
class OrderService {
  pub api: cloud.Api;
  storage: IOrderStorage;
  prodStorage: IProductStorage;
  counter: cloud.Counter;
  
  
  new(storage: IOrderStorage, prodStore: IProductStorage) {
    this.api = new cloud.Api({
      cors: true,
      corsOptions: {
        allowHeaders: ["*"],
        allowMethods: [http.HttpMethod.POST],
      },
    });

    this.storage = storage;
    this.prodStorage = prodStore;
    this.counter = new cloud.Counter();

    // API endpoints
    this.api.post("/order/:id/:qty", inflight (req): cloud.ApiResponse => {
      if let body = req.body {
        let id = "{this.counter.inc()}";
        let prodId = req.vars.get("id");
        let orderQty = req.vars.get("qty");
        this.storage.add(id, {id: id, qty: num.fromStr(orderQty), prodId: prodId, status: "PENDING"});
        log("Sending to queue");
        queue.push(Json.stringify({
                id: id,
                prodId: prodId,
                orderQty: orderQty
              }));
              log("Queue recieved");
        return {
          status:201,
          body: prodId
        };
      } else {
        return {
          status: 400,
        };
      }
    });

    this.api.get("/order/:id", inflight (req): cloud.ApiResponse => {
        let id = req.vars.get("id");
        let order = this.storage.get(id);
        return {
          status:200,
          body: Json.stringify(order)
        };
    });

    this.api.get("/orders", inflight (req): cloud.ApiResponse => {
        let order = this.storage.list();
        return {
          status:200,
          body: Json.stringify(order)
        };
    });


/***************************************************
 * Setup a queue consumer
 ***************************************************/
    queue.setConsumer(inflight (message) => {
      let orderInfo = Json.parse(message);
      let id = orderInfo.get("id").asStr();
      let prodId = orderInfo.get("prodId").asStr();
      let orderQty = orderInfo.get("orderQty").asStr();
      this.prodStorage.updateProduct(prodId, num.fromStr(orderQty));
      this.storage.updateOrderStatus(id, "COMPLETED");
    }, timeout: 3s);
    
  }
}


/***************************************************
 * Instantiating the instance of the defined classes.
 ***************************************************/
let productStorage = new ProductStorage();
let orderStorage = new OrderStorage();
let productApi = new ProductService(productStorage);
let orderApi = new OrderService(orderStorage, productStorage);

