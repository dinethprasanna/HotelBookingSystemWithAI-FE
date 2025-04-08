import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateBookingMutation } from "@/lib/api";

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { addDays, format, differenceInDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useUser } from "@clerk/clerk-react";
// import { DateRange } from "react-day-picker"


function generateRandomForRoom(min = 0, max = 100) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}



const formSchema = z.object({
  hotelId: z.string(),
  checkIn: z.date(),
  checkOut: z.date(),
  note: z.string().optional(),
  roomNumber: z.number(),
  booking_price: z.number()
});

const CreateBookingForm = (props) => {
  const { id } = useParams();
  const generatedRoomNumber = generateRandomForRoom(1, 500);
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  // });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelId: id, // Set default values
      roomNumber: generatedRoomNumber,
      checkIn: new Date(),
      checkOut: new Date(),
      booking_price: 0
    },
  });
  const { isSignedIn } = useUser();
  // console.log(props.pricePerDay);

  
  const navigate = useNavigate();
  
  const handleBookingFormSubmit = async (values) => {
    
    
    if (!isSignedIn) {
      toast.error("Please Login or Signup to Book");
      return;
    }
    
    // const { hotelId, checkIn, checkOut, note, roomNumber, booking_price } = values; //obj deconstructing
    console.log("Booking values - ", values);
    try {
      const booking = await createBooking(values).unwrap();
      console.log("Booking response:", booking);
      toast.success("Booking created successfully");
      navigate(`/booking/payment?bookingId=${booking._id}`);
    } catch (error) {
      toast.error("Booking creation failed");
      console.log(error.message);
    }
  };

  // Get check-in and check-out dates from form and cal the no of days staying
  const checkIn = form.watch("checkIn");
  const checkOut = form.watch("checkOut");
  const numberOfDays = checkIn && checkOut ? differenceInDays(checkOut, checkIn) + 1 : 0;
  const totalPrice = numberOfDays * props.pricePerDay;
  // Update `booking_price` in form state
  form.setValue("booking_price", totalPrice);

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(handleBookingFormSubmit)}>
        <div className="grid gap-4">

          <FormField
            control={form.control}
            name="hotelId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-in & Check-out</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !form.watch("checkIn") && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch("checkIn") ? (
                        form.watch("checkOut") ? (
                          <>
                            {format(form.watch("checkIn"), "LLL dd, y")} -{" "}
                            {format(form.watch("checkOut"), "LLL dd, y")}
                          </>
                        ) : (
                          format(form.watch("checkIn"), "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={form.watch("checkIn")}
                      selected={{
                        from: form.watch("checkIn"),
                        to: form.watch("checkOut"),
                      }}
                      onSelect={(dateRange) => {
                        if (dateRange) {
                          form.setValue("checkIn", dateRange.from);
                          form.setValue("checkOut", dateRange.to || dateRange.from);
                        }
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stay Duration */}
          <div className="text-sm text-muted-foreground">
            {numberOfDays > 0 ? (
              <p>Stay duration: <strong>{numberOfDays} {numberOfDays === 1 ? "day" : "days"}</strong></p>
            ) : (
              <p>Select check-in and check-out dates</p>
            )}
          </div>

          {/* Total Price */}
          <div className="text-lg font-semibold mt-2">
            Total Price: <span className="text-green-600">${totalPrice}</span>
          </div>

          {/* Hidden booking_price field */}
          <FormField control={form.control} name="booking_price" render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} value={totalPrice} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />


          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="hidden"
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Note: (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        </div>

        <div className="mt-4">
        
          <Button type="submit">Create Booking</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateBookingForm;