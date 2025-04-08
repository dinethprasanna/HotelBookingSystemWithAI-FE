import { useEffect, useState } from "react";
import { useGetHotelsQuery, useDeleteHotelByIdMutation } from "@/lib/api";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { use } from "react";
import { toast } from "sonner";

function ManageHotelsPage() {

    const { data: hotels, error, isLoading, refetch } = useGetHotelsQuery();
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [open, setOpen] = useState(false);


    console.log(hotels);

    const handleViewSingleHotel = (hotel) => {
        setSelectedHotel(hotel);
        setOpen(true);
    }

    const  [deleteHotel] = useDeleteHotelByIdMutation();

    const handleDeleteSingleHotel = async (hotelId) => {
        try {
            alert("Are you sure you want to delete this Hotel? This action cannot be undone.");
            await deleteHotel(hotelId).unwrap();
            toast.success("Hotel deleted successfully");
            refetch();
            setOpen(false);
        } catch (error) {
            toast.error("Failed to delete hotel:", error);
        }
    }

    const navigate = useNavigate();

    const handleUpdateSingleHotel = (hotelObj) => {
        // console.log(hotelObj);
        navigate(`/hotels/update?id=${hotelObj._id}`, { state: { hotelObj } });
    }

    useEffect(() => {
        refetch();
    }, []);


    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <main className="mx-auto max-w-7xl py-8 px-2">
                    <h1 className="text-3xl font-extrabold text-center">Manage Hotels</h1>
                </main>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:justify-between">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Manage Hotels</h1>
                <Link to="/hotels/create" className="mb-4 inline-block bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 w-[180px] text-center">
                    Create New Hotel
                </Link>
            </div>


            <div className="hotels-listings overflow-x-auto mt-3">
                <table className="w-full border-collapse border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Hotel</th>
                            <th className="border p-2">Location</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Rating</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {hotels?.map((hotel) => (
                            <tr key={hotel._id} className="text-center border-b">
                                <td className="border p-2">{hotel.name}</td>
                                <td className="border p-2">{hotel.location}</td>
                                <td className="border p-2">{hotel.price}</td>
                                <td className="border p-2">{hotel.rating}</td>
                                <td className="border p-2 flex gap-2 justify-center">
                                    <Button variant="secondary" className="bg-green-500 text-white hover:bg-green-700" onClick={() => handleViewSingleHotel(hotel)}>View</Button>
                                    <Button onClick={() => handleUpdateSingleHotel(hotel)}>Update</Button>
                                    <Button variant="destructive" onClick={() => handleDeleteSingleHotel(hotel._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Hotel Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Hotel Details</DialogTitle>
                        <DialogDescription className="py-2 flex flex-row justify-between text-slate-900">
                            <div className="py-2 px-4 flex flex-row justify-between border-slate-300 border-2 text-lg rounded-lg text-white bg-slate-800 w-full">
                                <p className="text-center mx-auto">{selectedHotel?.name}</p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 text-sm mb-2">
                        <p><strong>Location:</strong> {selectedHotel?.location}</p>
                        <p><strong>Price:</strong> {selectedHotel?.price}</p>
                        <p><strong>Rating:</strong> {selectedHotel?.rating}</p>
                        <p className="max-h-[80px] overflow-auto"><strong>Description:</strong> {selectedHotel?.description}</p>
                        <img src={selectedHotel?.image} alt={selectedHotel?.name} className="w-full max-w-[120px] h-auto rounded-lg mt-8 block pt-2" />
                    </div>
                </DialogContent>
            </Dialog>

        </main>
    );
}

export default ManageHotelsPage;