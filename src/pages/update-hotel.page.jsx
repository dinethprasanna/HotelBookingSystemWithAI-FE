import CreateHotelForm from "@/components/CreateHotelForm";
import UpdateHotelForm from "@/components/UpdateHotelForm";
import { useLocation } from "react-router";


export default function UpdateHotelPage() {

    const hoteObj = useLocation().state.hotelObj;

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Update Hotel Details</h2>
            <UpdateHotelForm hotel={hoteObj} />
        </main>
    )
}