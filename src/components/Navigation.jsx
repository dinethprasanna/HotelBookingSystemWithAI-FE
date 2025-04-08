import { Button } from "@/components/ui/button";
import NavLogo from '@/assets/booking-logo.png'
import { Globe } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
// import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

function Navigation(p) {

  // const userSlice = useSelector((state) => state.user);
  // console.log(userSlice.user.name);

  const { user } = useUser();

  return (
    <nav className="z-10 bg-black flex  items-center justify-between px-8 text-white py-4">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold ">
          <img src={NavLogo} alt="Logo" width="120px" height="auto" />
        </Link>
        <div className="hidden md:flex space-x-6">
          {user?.publicMetadata?.role !== "admin" && (
            <Link to={`/about-us`} className="transition-colors">
              About Us
            </Link>
          )}
          {user?.publicMetadata?.role !== "admin" && (
            <Link to={`/gallery`} className="transition-colors">
              Gallery
            </Link>
          )}
          {user?.publicMetadata?.role === "admin" && (
            <Link to={`/hotels-manage`} className="transition-colors">
              Manage Hotels
            </Link>
          )}
          {user?.publicMetadata?.role === "admin" && (
            <Link to={`/bookings-manage`} className="transition-colors">
              Manage Bookings
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <SignedOut>
          <Button variant="ghost" asChild>
            <Link to="/sign-in">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Button asChild>
            <Link to="/account">My Dashboard</Link>
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;