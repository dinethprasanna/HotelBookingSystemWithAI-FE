import NavLogo from '@/assets/booking-logo.png'
import { Link } from "react-router";

function Footer() {
    return (
        <footer className="">
            <div className="w-full flex-col px-6 pt-20 lg:flex lg:px-10 xl:px-24 bg-black">
                <div className="text-white cursor-default flex-col lg:flex lg:flex-row lg:gap-x-16 justify-between ">
                    <div>
                        <Link to="/" className="text-2xl font-bold mb-4 block">
                            <img src={NavLogo} alt="Logo" width="180px" height="auto" />
                        </Link>
                        <ul className="mt-4 text-sm flex flex-col items-start justify-start gap-2">
                            <li className="flex flex-row items-start">
                                <p className="font-inter text-white">AI Hotel Booking System</p>
                            </li>
                            <li className="flex flex-row items-start">
                                
                                <p className="font-inter text-white">No.39, Abc Road , Sri Lanka.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 md:mt-0 lg:mt-0 flex flex-row flex-wrap lg:flex-nowrap lg:justify-center gap-4 lg:gap-x-24">
                        <div className="flex flex-col">
                            <h2 className="font-mono font-bold text-white text-lg">Contact</h2>
                            <ul className="mt-4 grid gap-2 ">
                                <li className="flex items-start text-sm">
                                    <Link
                                        className="text-left text-white break-words hover:underline hover:text-zinc-800"
                                        href="#">dinethprasanna58@gmail.com</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-mono font-bold text-white text-lg">Company</h2>
                            <ul className="mt-4 grid gap-2 grid-cols-1 md:grid-cols-3">
                            <li className="flex items-start text-sm"><span></span><Link
                                    className="text-left text-white break-words hover:underline hover:text-zinc-800"
                                    href="/">Home</Link></li>
                                <li className="flex items-start text-sm"><span></span><Link
                                    className="text-left text-white break-words hover:underline hover:text-zinc-800"
                                    href="/gallery">Gallery</Link></li>
                                <li className="flex items-start text-sm"><span></span><Link
                                    className="text-left text-white break-words hover:underline hover:text-zinc-800"
                                    href="/about-us">About Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10 py-10 border-t border-zinc-200 font-inter text-center text-xs text-zinc-400">Copyright ©
                    2025
                    Din's Company. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;