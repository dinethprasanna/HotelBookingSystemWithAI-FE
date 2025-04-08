import { useState } from "react";
import { useGetAllBookingsQuery, useDeleteBookingByIdMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";



function ManageBookingsPage() {
  const { data: bookings, error, isLoading, refetch  } = useGetAllBookingsQuery();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [open, setOpen] = useState(false);

  console.log(bookings);

  const [deleteBooking] = useDeleteBookingByIdMutation();

  const handleDeleteBooking = async (bookingId) => {
    try {
      alert("Are you sure you want to delete this booking? This action cannot be undone.");
      await deleteBooking(bookingId).unwrap();
      toast.success("Booking deleted successfully");
      refetch();
      setOpen(false);      
    } catch (error) {
      toast.error("Failed to delete booking:", error);
    }
  }

  const handleViewSingleBooking = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };


  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <main className="mx-auto max-w-7xl py-8 px-2">
          <h1 className="text-3xl font-extrabold text-center">Manage Bookings</h1>
        </main>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }


  return (
    <main className="mx-auto max-w-7xl py-8 px-2">
      <h1 className="text-3xl font-extrabold text-center">Manage Bookings</h1>
      <div className="mt-8 p-2 rounded-xl bg-slate-300">

        <div className="overflow-x-auto mt-3">
          <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Hotel</th>
                <th className="border p-2">Client</th>
                <th className="border p-2">Check-in</th>
                <th className="border p-2">Check-out</th>
                {/* <th className="border p-2">Note</th> */}
                <th className="border p-2">Booked On</th>
                {/* <th className="border p-2">Total Price</th> */}
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>

              {bookings?.map((booking) => (
                <tr key={booking._id} className="text-center border-b">
                  <td className="border p-2">{booking?.hotelId?.name}</td>
                  <td className="border p-2">{booking.user.fullName}</td>
                  <td className="border p-2">{new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(booking.checkOut).toLocaleDateString()}</td>
                  {/* <td className="border p-2">{booking.note}</td> */}
                  <td className="border p-2">{new Date(booking.bookedDateTime).toLocaleDateString()}</td>
                  {/* <td className="border p-2">{booking.totalPrice}</td> */}
                  <td className="border p-2">{booking.booking_status}</td>
                  <td className="border p-2">
                    <Button onClick={() => handleViewSingleBooking(booking)}>Action</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Booking Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription className="py-2 flex flex-row justify-between text-slate-900">
                <p className="text-left">{selectedBooking?.hotelId?.name} in {selectedBooking?.hotelId?.location}.</p>
                <p className="text-right">Room #{selectedBooking?.roomNumber}</p>
              </DialogDescription>
            </DialogHeader>
            <div className="py-2 px-4 flex flex-row justify-between border-slate-300 border-2 text-sm rounded-lg text-white bg-slate-800">
              <p className="text-left">{selectedBooking?.user?.fullName}</p>
              <p className="text-right">{selectedBooking?.user?.email}</p>
            </div>
            <div className="space-y-2 mt-4 text-sm">

              <p><strong>Check-in:</strong> {selectedBooking && new Date(selectedBooking.checkIn).toLocaleString()}</p>
              <p><strong>Check-out:</strong> {selectedBooking && new Date(selectedBooking.checkOut).toLocaleString()}</p>
              <p><strong>Booked On:</strong> {selectedBooking && new Date(selectedBooking.bookedDateTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedBooking?.booking_status}</p>
              <p><strong>Total Price:</strong> {selectedBooking?.booking_price} USD</p>
              <p><strong>Note:</strong> {selectedBooking?.note || 'N/A'}</p>
            </div>

            {selectedBooking?.booking_status === "Ongoing" && (
              <div className="hotel-review-container">
                <span className="text-center text-sm text-orange-500">This booking is ongoing.</span>
              </div>
            )}

            {selectedBooking?.booking_status === "Completed" && (
              <div className="hotel-review-container">
                <span className="text-center text-sm text-green-500">This booking is Competed.</span>
              </div>
            )}

            <Button variant="destructive" onClick={() => handleDeleteBooking(selectedBooking._id)}>Delete Booking</Button>


          </DialogContent>
        </Dialog>

      </div>
    </main>
  );
}

export default ManageBookingsPage;