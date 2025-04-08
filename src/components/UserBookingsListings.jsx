import { useState } from "react";
import { useGetUserBookingsQuery } from "@/lib/api";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function UserBookingsListings(props) {
  const { data: bookings, error, isLoading } = useGetUserBookingsQuery();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [open, setOpen] = useState(false);

  // Sort bookings: Ongoing → Upcoming (nearest) → Completed
  const sortedBookings = bookings
    ? [...bookings].sort((a, b) => {
      const statusOrder = {
        Ongoing: 0,
        Upcoming: 1,
        Completed: 2,
      };

      const statusCompare = statusOrder[a.booking_status] - statusOrder[b.booking_status];
      if (statusCompare !== 0) return statusCompare;

      // For Upcoming, sort by nearest check-in date
      if (a.booking_status === "Upcoming") {
        return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
      }

      // Optional: For Completed, sort by latest check-out (most recent first)
      if (a.booking_status === "Completed") {
        return new Date(b.checkOut).getTime() - new Date(a.checkOut).getTime();
      }

      return 0;
    })
    : [];

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  return (
    <div className="mt-8 p-2 rounded-xl bg-slate-300">
      <h3>My Bookings List</h3>

      <div className="overflow-x-auto mt-3">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Room No</th>
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
            {sortedBookings?.map((booking) => (
              <tr key={booking._id} className="text-center border-b">
                <td className="border p-2">{booking.roomNumber}</td>
                <td className="border p-2">{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(booking.checkOut).toLocaleDateString()}</td>
                {/* <td className="border p-2 text-left">{booking.note}</td> */}
                <td className="border p-2">{new Date(booking.bookedDateTime).toLocaleDateString()}</td>
                {/* <td className="border p-2">{booking.booking_price} USD</td> */}
                <td className="border p-2">{booking.booking_status}</td>
                <td className="border p-2"><Button onClick={() => handleViewBooking(booking)}>View</Button></td>
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
            <DialogDescription>
              Details for Room #{selectedBooking?.roomNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4 text-sm">
            <p><strong>Check-in:</strong> {selectedBooking && new Date(selectedBooking.checkIn).toLocaleString()}</p>
            <p><strong>Check-out:</strong> {selectedBooking && new Date(selectedBooking.checkOut).toLocaleString()}</p>
            <p><strong>Booked On:</strong> {selectedBooking && new Date(selectedBooking.bookedDateTime).toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedBooking?.booking_status}</p>
            <p><strong>Note:</strong> {selectedBooking?.note || 'N/A'}</p>
            <p><strong>Total Price:</strong> {selectedBooking?.booking_price} USD</p>
          </div>          
          {selectedBooking?.booking_status !== "Completed" && (
            <div className="hotel-review-container">
              <span className="text-center text-sm text-orange-500">*You can give a review Once the booking staus is competed</span>
            </div>
          )}

          {/* User reviews to hotel */}
          {selectedBooking?.booking_status === "Completed" && (
            <div className="hotel-review-container">
              <h3 className="text-lg font-semibold mt-4">Your Review:</h3>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );

}

export default UserBookingsListings;