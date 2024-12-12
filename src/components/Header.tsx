import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Staff Directory", href: "#staff" },
    { label: "Programs", href: "#programs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-[#1a4894] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-2 border-b border-white/10">
          <div className="flex justify-end space-x-4 text-white/80 text-sm">
            <a href="#contact" className="hover:text-white">Contact Us</a>
            <a href="#rti" className="hover:text-white">RTI</a>
            <a href="https://meekosam.ap.gov.in/" className="hover:text-white">Grievance</a>
          </div>
        </div>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg" alt="Logo" className="h-16 w-16" />
            <div className="text-white">
              <h1 className="text-xl font-bold">MPDO Office</h1>
              <p className="text-sm text-white/80">Kuppam Mandal</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-white/80 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.label}>
                    <a href={item.href} className="w-full">
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
};