/**
 * @jest-environment node
 */
import { POST } from "../app/api/scan/route";
import { NextRequest } from "next/server";

describe("POST /api/scan", () => {
  it("returns 400 error if URL is missing or empty", async () => {
    const req = new NextRequest("http://localhost:3000/api/scan", {
      method: "POST",
      body: JSON.stringify({ url: "" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.message).toBe("Please provide a valid website URL.");
  });

  it("returns 400 error if URL format is invalid", async () => {
    const req = new NextRequest("http://localhost:3000/api/scan", {
      method: "POST",
      body: JSON.stringify({ url: "invalid url whitespace" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.message).toBe("Invalid URL format. Please enter a valid domain or web address.");
  });

  it("returns audit report for valid domain", async () => {
    const req = new NextRequest("http://localhost:3000/api/scan", {
      method: "POST",
      body: JSON.stringify({ url: "example.com" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.url).toBe("https://example.com");
    expect(data.scores).toHaveProperty("performance");
    expect(data.scores).toHaveProperty("seo");
    expect(data.scores).toHaveProperty("accessibility");
    expect(data.scores).toHaveProperty("security");
    expect(Array.isArray(data.recommendations)).toBe(true);
    expect(data.recommendations.length).toBeGreaterThan(0);
  });
});
