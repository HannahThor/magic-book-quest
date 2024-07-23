import { GoogleBookData } from "@/types/google/volume";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BookCollection = () => {
  const [bookCollection, setBookCollection] = useState<GoogleBookData[] | null>(
    null
  );
  const [totalPageCount, setTotalPageCount] = useState<number>(0); // Added type 'number' to state

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/.netlify/functions/history?userId=Hannah");
      const jsonData = await response.json();
      const sortedData = jsonData.reverse();
      setBookCollection(sortedData);

      // Calculate total page count
      const totalCount = jsonData.reduce(
        (total: number, book: GoogleBookData) => {
          if (book.volumeInfo && book.volumeInfo.pageCount) {
            return total + book.volumeInfo.pageCount;
          }
          return total;
        },
        0
      );

      // Set the total page count
      setTotalPageCount(totalCount);
    };
    fetchData();
  }, []);

  return (
    <>
      <p className="text-lg font-light py-5">
        Your page count is{" "}
        <span className="text-xl font-semibold">{totalPageCount}</span>
      </p>
      <section className="flex justify-center w-full h-full">
        <Carousel className="w-4/5 max-w-screen-xl">
          <CarouselContent className="flex justify-between">
            {bookCollection?.map((book, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card className="flex flex-col items-center justify-between p-6 h-[396px] w-[300px] max-w-full bg-card text-card-foreground shadow">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {book.volumeInfo?.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {book.volumeInfo?.authors?.join(", ")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center flex-grow">
                      <img
                        className="w-auto h-[150px]"
                        src={
                          book.volumeInfo?.imageLinks?.thumbnail ??
                          "/flowerBook.jpg"
                        }
                        alt="Book Cover"
                      />
                    </CardContent>
                    <CardFooter className="text-sm">
                      Page Count: {book.volumeInfo?.pageCount}
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};

export default BookCollection;
