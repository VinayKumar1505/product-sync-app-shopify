import { Form } from "@remix-run/react";
import { useState } from "react";
import { redirect } from "@remix-run/node";
import { Store, Link2 } from "lucide-react";

export default function IndexPage() {
  const [selectedRole, setSelectedRole] = useState<"master" | "dependent" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "master") {
      redirect("/master/setup");
    } else if (selectedRole === "dependent") {
      redirect("/dependent/setup");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-10 text-center transition-all duration-300 hover:shadow-blue-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
           Product Syncer Setup
        </h1>
        <p className="text-gray-600 mb-10">
          Choose how this store should act in your product sync network.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Master store card */}
          <label
            className={`relative border rounded-2xl p-6 cursor-pointer text-left !flex gap-4 items-center transition-all ${
              selectedRole === "master"
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200 shadow-md"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/40"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="master"
              checked={selectedRole === "master"}
              onChange={() => setSelectedRole("master")}
              className="hidden"
            />
            <div className="flex-shrink-0">
              <Store
                className={`h-8 w-8 ${
                  selectedRole === "master" ? "text-blue-600" : "text-gray-500"
                }`}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Master Store</h3>
              <p className="text-sm text-gray-500">
                Acts as the main source of truth for products.
              </p>
            </div>
          </label>

          {/* Dependent store card */}
          <label
            className={`relative border rounded-2xl p-6 cursor-pointer text-left flex gap-4 items-center transition-all ${
              selectedRole === "dependent"
                ? "border-green-600 bg-green-50 ring-2 ring-green-200 shadow-md"
                : "border-gray-300 hover:border-green-400 hover:bg-green-50/40"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="dependent"
              checked={selectedRole === "dependent"}
              onChange={() => setSelectedRole("dependent")}
              className="hidden"
            />
            <div className="flex-shrink-0">
              <Link2
                className={`h-8 w-8 ${
                  selectedRole === "dependent"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Dependent Store</h3>
              <p className="text-sm text-gray-500">
                Syncs products from a connected master store.
              </p>
            </div>
          </label>

          <button
            type="submit"
            disabled={!selectedRole}
            className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 ${
              selectedRole
                ? "bg-blue-600 hover:bg-blue-700 active:scale-95"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </form>

        <footer className="mt-10 text-xs text-gray-400">
          © {new Date().getFullYear()} Product Syncer App
        </footer>
      </div>
    </div>
  );
}
