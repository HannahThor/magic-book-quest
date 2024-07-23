import { createClient } from "@supabase/supabase-js";
import { Handler } from "@netlify/functions";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

export const handler: Handler = async (event) => {
  const { httpMethod, path, queryStringParameters, body } = event;

  if (httpMethod === "POST") {
    if (body === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Body required" }),
      };
    }

    const requestBody = JSON.parse(body);
    const userId = path.split("/")[3];

    try {
      const { data, error } = await supabase
        .from("reading_history")
        .insert({
          google_book_id: requestBody.google_book_id,
          user_id: userId,
        })
        .select();

      if (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Error inserting data" }),
        };
      }

      console.log("Data inserted successfully:", data);

      return {
        statusCode: 200,
        body: JSON.stringify({ data }),
      };
    } catch (error) {
      console.error("Error inserting data:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error inserting data" }),
      };
    }
  }

  if (httpMethod === "GET") {
    const userId = queryStringParameters?.userId;

    console.log({ userId });

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "UserId is required" }),
      };
    }

    try {
      const { data, error } = await supabase
        .from("reading_history")
        .select()
        .eq("user_id", userId);

      if (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Error fetching data" }),
        };
      }

      const bookHistory = data;
      console.log(bookHistory);
      const googleBooks = [];

      for (let i = 0; i < bookHistory.length; i++) {
        const currentBookHistory = bookHistory[i];

        const bookResponse = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${currentBookHistory.google_book_id}`
        );

        const bookData = await bookResponse.json();

        // TODO - fix ts
        googleBooks.push(bookData);
      }

      return {
        statusCode: 200,
        body: JSON.stringify(googleBooks),
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error fetching data" }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
