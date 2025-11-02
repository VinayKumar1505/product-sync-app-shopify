import { IStoreRepository } from "../Interfaces/IRepository";
import Store from "@/models/Store";


export class StoreRepository implements IStoreRepository {
  // Implementation of IRepository methods
  async findById(id: string): Promise<Store | null> {
    try {
      const store = await Store.findById(id);
      return store || null;
    } catch (error) {
      console.error("Error finding store by ID:", error);
      return null;
    }
  }

  async findAll(): Promise<Store[]> {
    try {
      const stores = await Store.find();
      return stores || [];
    } catch (error) {
      console.error("Error finding all stores:", error);
      return [];
    }
  }


  async create(data: Partial<Store>): Promise<Store> {
    try {
      const store = await Store.create(data);
      return store;
    } catch (error) {
      console.error("Error creating store:", error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Store>): Promise<Store> {
    try {
      const store = await Store.findByIdAndUpdate(id, data, { new: true });
      return store || ({} as Store);
    } catch (error) {
      console.error("Error updating store:", error);
      throw error;
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const result = await Store.findByIdAndDelete(id);
      return result ? true : false;
    } catch (error) {
      console.error("Error deleting store:", error);
      return false;
    }
  }

  // Implementation of IStoreRepository methods
  async getStoreByShop(shop: string): Promise<any | null> {
    try {
      const store = await Store.findOne({ shop });
      return store || null;
    } catch (error) {
      console.error("Error finding store by shop:", error);
      return null;
    }
  }

  async getAllStores(): Promise<any[]> {
    try {
      const stores = await Store.find();
      return stores || [];
    } catch (error) {
      console.error("Error finding all stores:", error);
      return [];
    }
  }

  async updateStoreAccessToken(shop: string, newAccessToken: string): Promise<void> {
    // Implementation here
    try {
      await Store.findOneAndUpdate({ shop }, { accessToken: newAccessToken });
    } catch (error) {
      console.error("Error updating store access token:", error);
      throw error;
    } 
  }

  async getDependentStores(masterStoreId: string): Promise<any[]> {
    // Implementation here
    try {
      const stores = await Store.find({ masterStoreId });
      return stores || [];
    } catch (error) {
      console.error("Error finding dependent stores:", error);
      return [];
    }
  }
}