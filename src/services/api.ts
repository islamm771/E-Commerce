export const fetcher = async <T>(path: string): Promise<T> => {
  const url = `${process.env.NEXT_PUBLIC_LOCALHOST}${path}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }
    });

    const data = await res.json()

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} /n Error: ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error("Fetcher Error:", error);
    throw error;
  }
};



export const mutation = async <T>(path: string, init?: RequestInit): Promise<T> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LOCALHOST}${path}`, init
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Mutation Error:", error);
    throw error;
  }
};