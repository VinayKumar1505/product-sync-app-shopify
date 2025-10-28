import fetch from "node-fetch";

interface ShopifyConnector {
    shop: string;
    accessToken: string;
    apiVersion?: string;
}

export class ShopifyApi {
    private shop: string;
    private accessToken: string;
    private apiVersion: string;

    constructor({ shop, accessToken, apiVersion = "2024-01" }: ShopifyConnector) {
        this.shop = shop;
        this.accessToken = accessToken;
        this.apiVersion = apiVersion;
    }

    private getBaseUrl(): string {
        return `https://${this.shop}/admin/api/${this.apiVersion}`;
    }

    private async request(endpoint: string, method: string = "GET", body?: any): Promise<any> {
        const url = `${this.getBaseUrl()}${endpoint}`;
        const response = await ShopifyApi.buildHeadersAndSendRequest(url, method, this.accessToken, body);

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(
                `Shopify API request failed: ${response.status} ${response.statusText} - ${errorBody}`
            );
        }

        return response.json();
    }

    private static async buildHeadersAndSendRequest(
        url: string,
        method: string,
        accessToken: string,
        body?: any
    ): Promise<Response> {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken,
        };

        const options: RequestInit = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return await fetch(url, options);
    }

    // 🧠 CRUD methods
    public get(endpoint: string): Promise<any> {
        return this.request(endpoint, "GET");
    }

    public post(endpoint: string, body: any): Promise<any> {
        return this.request(endpoint, "POST", body);
    }

    public put(endpoint: string, body: any): Promise<any> {
        return this.request(endpoint, "PUT", body);
    }

    public delete(endpoint: string): Promise<any> {
        return this.request(endpoint, "DELETE");
    }
}
