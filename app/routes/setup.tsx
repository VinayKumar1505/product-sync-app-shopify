// app/routes/setup.tsx
import { Form, useActionData } from  "@remix-run/react";
// app/routes/setup.tsx
import { ActionFunction, redirect, json } from "@remix-run/node";
import Store from "~/models/Store";
import { getCurrentStore } from "~/utils/shopifySession.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const role = formData.get("role");
  const masterKey = formData.get("masterKey")?.toString();

  const shopifyStore = await getCurrentStore(request); // from session
  const store = await Store.findOne({ shop: shopifyStore });

  if (!store) throw new Error("Store not found");

  if (role === "master") {
    store.isMaster = true;
    await store.save();
    return json({ masterKey: store.masterKey });
  }

  if (role === "dependent" && masterKey) {
    store.isMaster = false;
    store.masterStoreId = masterKey;
    await store.save();

    // Add dependent to master record
    const master = await Store.findOne({ masterKey });
    if (master) {
      master.dependentStores.push(store.shop);
      await master.save();
    }

    return json({ success: true });
  }

  return redirect("/dashboard");
};



export default function SetupPage() {
  const data = useActionData<typeof action>();

  return (
    <div className="max-w-xl mx-auto mt-12 space-y-6">
      <h1 className="text-2xl font-bold">Complete Your Setup</h1>
      <p className="text-gray-600">
        Choose whether this store will act as a <b>Master Store</b> or a{" "}
        <b>Dependent Store</b>.
      </p>

      <Form method="post" className="space-y-4">
        <label className="block">
          <input type="radio" name="role" value="master" required /> Master Store
        </label>
        <label className="block">
          <input type="radio" name="role" value="dependent" /> Dependent Store
        </label>

        {/* If dependent store, ask for master key */}
        <div className="mt-4">
          <label className="block font-medium">Master Store ID (if dependent)</label>
          <input
            type="text"
            name="masterKey"
            placeholder="Enter Master Store ID"
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded mt-4"
        >
          Complete Setup
        </button>
      </Form>

      {data?.masterKey && (
        <div className="p-4 mt-6 border rounded bg-gray-50">
          <p className="font-semibold">✅ Setup Complete!</p>
          <p>
            Your Master Store ID:{" "}
            <code className="font-mono">{data.masterKey}</code>
          </p>
          <p className="text-sm text-gray-500">
            Share this ID with dependent stores.
          </p>
        </div>
      )}
    </div>
  );
}
