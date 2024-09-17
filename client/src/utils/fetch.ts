export const serverUrl = "http://localhost:5000"

export async function postData(url: string, data: any) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
