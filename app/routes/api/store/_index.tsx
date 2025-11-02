import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { StoreService }  from "@/services/store.service";

/**
 * GET /api/store → Fetch all stores
 * POST /api/store → Create a new store
 */

// 🧠 GET: return all stores
export const loader: LoaderFunction = async () => {
  try {
    const stores = await StoreService.getAllStores();
    return json({ success: true, data: stores }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching stores:", error);
    return json(
      { success: false, message: "Failed to fetch stores" },
      { status: 500 }
    );
  }
};

// 🧠 POST: create a new store
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();

    if (!body.shop || !body.accessToken) {
      return json(
        { success: false, message: "Missing required fields: shop or accessToken" },
        { status: 400 }
      );
    }

    const newStore = await StoreService.createStore({
      shop: body.shop,
      accessToken: body.accessToken,
      scope: body.scope,
      isMaster: body.isMaster ?? false,
      masterStoreId: body.masterStoreId,
    });

    return json({ success: true, data: newStore }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating store:", error);
    return json(
      { success: false, message: "Failed to create store", error: (error as Error).message },
      { status: 500 }
    );
  }
};
