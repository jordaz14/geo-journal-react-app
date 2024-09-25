export const clientUrl = import.meta.env.PROD
  ? "https://nearhere.netlify.app"
  : "http://localhost:5173";

export const serverUrl = import.meta.env.PROD
  ? "https://nearhere-server.netlify.app"
  : "http://localhost:5000";

// POST DATA
export async function postData(url: string, data: any = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET DATA
export async function fetchData(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}
