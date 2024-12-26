import React from "react";
import { Link } from "react-router-dom";
import { NotificationTicker } from "./NotificationTicker";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Programs", href: "/programs" },
    { name: "Staff Directory", href: "/staff-directory" }
  ];

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:hidden">
        <div className="flex flex-col space-y-3 mt-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200 text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0 flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-4">
                  <img 
                    src="/lovable-uploads/d0c92275-850f-4083-9679-58000b7ba9e0.png" 
                    alt="Government of Andhra Pradesh and Panchayati Raj" 
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
              <nav className="hidden sm:flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
      <NotificationTicker />
    </>
  );
};