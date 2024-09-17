export const serverUrl = "http://localhost:5000";

export async function postData(
  url: string,
  data: any = {},
  headers: {} = { "Content-Type": "application/json" }
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchData(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Page not found");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}
