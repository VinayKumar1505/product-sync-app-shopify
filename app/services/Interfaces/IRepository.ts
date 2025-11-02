export interface IRepository<T, K> {
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: K, data: Partial<T>): Promise<T>;
  delete(id: K): Promise<boolean>;
}

export interface IStoreRepository extends IRepository<any, string> {
  // Additional store-specific methods can be defined here
  getStoreByShop(shop: string): Promise<any | null>;
  getAllStores(): Promise<any[]>;
  updateStoreAccessToken(shop: string, newAccessToken: string): Promise<void>;
  getDependentStores(masterStoreId: string): Promise<any[]>;
}

export interface IproductRepository extends IRepository<any, string> {
  // Additional product-specific methods can be defined here
  getProductById(id: string): Promise<any | null>;
  getAllProducts(): Promise<any[]>;
  createProduct(data: Partial<any>): Promise<any>;
  updateProduct(id: string, data: Partial<any>): Promise<any>;
  deleteProduct(id: string): Promise<boolean>;
}