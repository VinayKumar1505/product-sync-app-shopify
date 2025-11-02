import { StoreRepository } from "@/services/respositories/store.repsoitory";
import type { IStore } from "@/models/Store";

/**
 * StoreService
 * Acts as a business logic layer between the controller/API and repository.
 */
export class StoreService {
  private storeRepository: StoreRepository;

  constructor(storeRepository = new StoreRepository()) {
    this.storeRepository = storeRepository;
  }

  /** Create a new store */
  async createStore(storeData: Partial<IStore>): Promise<IStore> {
    return await this.storeRepository.create(storeData);
  }

  /** Get a store by ID */
  async getStoreById(id: string): Promise<IStore | null> {
    return await this.storeRepository.findById(id);
  }

  /** Get all stores */
  async getAllStores(): Promise<IStore[]> {
    return await this.storeRepository.findAll();
  }

  /** Update a store */
  async updateStore(id: string, storeData: Partial<IStore>): Promise<IStore | null> {
    return await this.storeRepository.update(id, storeData);
  }

  /** Delete a store */
  async deleteStore(id: string): Promise<boolean> {
    return await this.storeRepository.delete(id);
  }
}
