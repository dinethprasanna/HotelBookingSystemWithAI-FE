import { useParams } from "react-router";
import { useGetHotelByIdQuery, useCreateBookingMutation } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CreateBookingForm from "@/components/CreateBookingForm";

const HotelPage = () => {
  const { id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(id);



  if (isLoading)
    return (
      <div>Loading...</div>
    );

  if (isError) return <p className="text-red-500">Error: {isError.message}</p>;

  return (
    <main>
      <section className="py-8 bg-white md:py-20 lg:py-24 min-h-[75vh]">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img className="w-full object-cover rounded-lg" src={hotel.image} alt={hotel.name} />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1
                className="text-xl font-semibold text-gray-900 sm:text-3xl dark:text-white"
              >
                {hotel.name}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p
                  className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white md:block flex"
                >
                  ${hotel.price}
                  <span className="md:ml-1 text-sm text-muted-foreground">(per night)</span>
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <div className="flex flex-row space-x-1">
                      {[...Array(5)].map((_, index) => {
                        const isFilled = index < hotel.rating;
                        return (
                          <svg
                            key={index}
                            className={`w-5 h-5 ${isFilled ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                          </svg>
                        );
                      })}
                    </div>
                  </div>
                  <p
                    className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                  >
                    ({hotel.rating})
                  </p>
                  <a
                    href="#"
                    className="hidden text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {hotel.reviews ? "No" : hotel.reviews} Reviews
                  </a>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Book Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Book Your Hotel Now</DialogTitle>
                      <DialogDescription>
                        Place your hotel booking by filling this form.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="booking-form">
                        <CreateBookingForm pricePerDay={hotel.price} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <hr className="my-4 md:mt-6 md:mb:2 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">{hotel.description}</p>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
};

export default HotelPage;