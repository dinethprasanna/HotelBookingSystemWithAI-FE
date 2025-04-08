import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import MainLayout from "./layouts/main.layout";
import RootLayout from "./layouts/root-layout.layout";
import HomePage from "./pages/home.page";
import HotelsPage from "./pages/hotels.page";
import AboutUsPage from "./pages/about-us.page";
import HotelPage from "./pages/hotel.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import CreateHotelPage from "./pages/create-hotel.page";

import { store } from "./lib/store";
import { Provider } from "react-redux";

import { ClerkProvider } from "@clerk/clerk-react";

import UserAccountPage from "./pages/user-account.page";
import AuthUserOnlyLayout from "./layouts/auth-user-only.layout";
import AuthAdminOnlyLayout from "./layouts/auth-admin-only.layout";
import GalleryPage from "./pages/gallery.page";
import PaymentPage from "./pages/payment.page";
import CompletePage from "./pages/complete.page";
import ManageBookingsPage from "./pages/manage-bookings.page";
import ManageHotelsPage from "./pages/manage-hotels.page";
import UpdateHotelPage from "./pages/update-hotel.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/hotels/:id" element={<HotelPage />} />
                <Route element={<AuthUserOnlyLayout />} >
                  <Route path="/account" element={<UserAccountPage />} />
                  <Route path="/booking/payment" element={<PaymentPage />} />
                  <Route path="/booking/complete" element={<CompletePage />} />
                  <Route element={<AuthAdminOnlyLayout />} >
                    <Route path="/hotels-manage" element={<ManageHotelsPage />} />
                    <Route path="/hotels/create" element={<CreateHotelPage />} />
                    <Route path="/hotels/update" element={<UpdateHotelPage />} />
                    <Route path="/bookings-manage" element={<ManageBookingsPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);