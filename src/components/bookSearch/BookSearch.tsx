import { BookHistoryRequest } from "@/types/api/bookhistory";
import { GoogleBookData } from "@/types/google/volume";
import SearchField from "../searchField/SearchField";
import { useState } from "react";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";

type BookDataResponse = {
  items: GoogleBookData[];
};

const BookSearch = () => {
  const { toast } = useToast();

  const [searchResults, setSearchResuls] = useState<GoogleBookData[]>();

  const onSearchHandler = async (value: string) => {
    const bookResponse = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${value}`
    );
    console.log(bookResponse);
    // update the below line and use `as BookData[]`to cast it to the correct type
    const bookData = (await bookResponse.json()) as BookDataResponse;
    console.log(bookData);

    // set the bookData into some state
    setSearchResuls(bookData.items);
  };

  const handleSubmit = async (id: string) => {
    // call history endpoint api/history(POST)
    const request: BookHistoryRequest = {
      google_book_id: id,
    };
    console.log(request);
    const response = await fetch("/.netlify/functions/history", {
      method: "POST",
      body: JSON.stringify(request),
    });
    if (response.ok) {
      toast({
        title: "Add Successful",
        description: `View you book collection`,
        action: (
          <ToastAction
            onClick={() => {
              // TODO - Navigate to /profile
            }}
            altText="Go to profile"
          >
            View
          </ToastAction>
        ),
      });
    }
    // TODO error handling
    else {
      toast({
        title: "Error",
        description: "Unsuccessful",
      });
    }
  };
  console.log(searchResults);

  return (
    <>
      <main className="flex flex-col py-10">
        <SearchField onSearch={onSearchHandler} />
      </main>
      <section className="w-3/5">
        {/* Map over the bookData and display the book title and author */}
        {searchResults?.map((result, index) => (
          <div key={index} className="flex items-start mb-4">
            <img
              className="max-w-[126px] h-auto mx-4"
              src={result.volumeInfo.imageLinks?.thumbnail ?? "/flowerBook.jpg"}
              alt="Book Cover"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">
                {result.volumeInfo.title}
              </h3>
              <p className="text-sm text-gray-600">
                {result.volumeInfo.authors?.join(", ")}
              </p>
              <p className="text-xs font-light">
                {result.volumeInfo.description}
              </p>
              <p className="text-xs font-light">
                Page Count: {result.volumeInfo.pageCount}
              </p>
            </div>{" "}
            <Button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
              variant="outline"
              onClick={() => handleSubmit(result.id)}
            >
              Add
            </Button>
          </div>
        ))}
      </section>
    </>
  );
};
export default BookSearch;
