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
    { label: "About Us", href: "/about" },
    { label: "Departments", href: "/staff" },
    { label: "Programs", href: "/programs" },
    { label: "Documents", href: "/documents" },
  ];

  return (
    <header className="bg-[#DD4814] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-2 border-b border-white/10">
          <div className="flex justify-end space-x-4 text-white/90 text-sm">
            <a href="/documents" className="hover:text-white">RTI</a>
            <a href="https://pgrs.ap.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Grievance</a>
          </div>
        </div>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center justify-center flex-grow">
            <div className="text-white text-center">
              <p className="text-xl font-bold">MPDO Office Kuppam Mandal</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/90 hover:text-white transition-colors"
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
              <DropdownMenuContent align="end" className="w-48 bg-[#DD4814] border-white/10">
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.label} className="text-white/90 hover:text-white focus:text-white focus:bg-white/10">
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