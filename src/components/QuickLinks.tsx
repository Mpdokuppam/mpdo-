import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Building, Users, Info, Phone, FileText, Calendar, BookOpen, HelpCircle } from "lucide-react";

export const QuickLinks = () => {
  const links = [
    {
      title: "About MPDO",
      description: "Learn about our roles and responsibilities",
      icon: Building,
      href: "#about",
    },
    {
      title: "Staff Directory",
      description: "Find contact information for our staff",
      icon: Users,
      href: "#staff",
    },
    {
      title: "Programs & Schemes",
      description: "View our ongoing and upcoming programs",
      icon: Calendar,
      href: "#programs",
    },
    {
      title: "Documents",
      description: "Access important forms and documents",
      icon: FileText,
      href: "#documents",
    },
    {
      title: "News & Updates",
      description: "Stay informed about latest developments",
      icon: Info,
      href: "#news",
    },
    {
      title: "RTI",
      description: "Right to Information Act portal",
      icon: BookOpen,
      href: "#rti",
    },
    {
      title: "Grievance",
      description: "Submit and track your grievances",
      icon: HelpCircle,
      href: "https://meekosam.ap.gov.in/",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our office",
      icon: Phone,
      href: "#contact",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#1a4894]">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="transform transition-transform hover:scale-105"
            >
              <Card className="h-full border-t-4 border-t-[#1a4894]">
                <CardHeader>
                  <link.icon className="h-8 w-8 text-[#1a4894] mb-2" />
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};