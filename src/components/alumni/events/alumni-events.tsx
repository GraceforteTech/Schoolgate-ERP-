import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Ticket, 
  Camera, 
  Star,
  Plus,
  Search
} from "lucide-react";

export function AlumniEvents() {
  const events = [
    {
      id: 1,
      title: "Class of 2006: 20-Year Anniversary Reunion",
      date: "August 15, 2026",
      time: "6:00 PM - 11:00 PM",
      location: "Schoolgate Grand Hall & Gardens",
      attendees: 156,
      capacity: 250,
      type: "Reunion",
      status: "Open",
      price: "₦15,000",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Annual Alumni Career Fair & Networking Night",
      date: "September 02, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      attendees: 420,
      capacity: 500,
      type: "Career",
      status: "Trending",
      price: "Free",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Founders Day Gala Dinner & Award Night",
      date: "October 12, 2026",
      time: "7:00 PM - Late",
      location: "Eko Hotels & Suites, Lagos",
      attendees: 85,
      capacity: 200,
      type: "Gala",
      status: "Selling Fast",
      price: "₦50,000",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Alumni Events & Reunions</h2>
          <p className="text-sm text-slate-500">Stay connected through our diverse range of physical and virtual gatherings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10 rounded-xl bg-white border-slate-200 text-slate-600 font-bold gap-2">
            <Calendar size={18} /> My Calendar
          </Button>
          <Button className="h-10 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
            <Plus size={18} /> Create Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="group overflow-hidden border-none shadow-sm bg-white rounded-[24px] hover:shadow-xl transition-all duration-500">
            <div className="h-48 w-full relative overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none font-black text-[10px] px-3 py-1 rounded-full shadow-lg">
                  {event.type.toUpperCase()}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-schoolgate-green text-white border-none font-black text-[10px] px-3 py-1 rounded-full shadow-lg">
                  {event.status}
                </Badge>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-schoolgate-green font-bold text-xs mb-1">
                  <Calendar size={14} /> {event.date}
                </div>
                <h3 className="font-bold text-slate-900 leading-tight group-hover:text-schoolgate-green transition-colors">{event.title}</h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <MapPin size={14} className="text-slate-400" /> {event.location}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <Users size={14} className="text-slate-400" /> {event.attendees} / {event.capacity} Registered
                </div>
              </div>

              <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-schoolgate-green rounded-full" 
                  style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="text-lg font-black text-slate-900">{event.price}</div>
                <Button className="rounded-xl bg-schoolgate-green-light text-schoolgate-green hover:bg-schoolgate-green hover:text-white font-bold h-9 px-6 transition-all">
                  Register Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
