export interface Ticket {
  id: string;
  name: string;
  submitterName: string;
  ticketDate: string;
  dateNotice: string;
  incidentLocation: string;
  details: string;
  imageCapture: string;
  imageUrl: string;
  status: "open" | "in_progress" | "completed";
}

export const mockTickets: Ticket[] = [
  {
    id: "1",
    name: "Broken AC Unit",
    submitterName: "John Smith",
    ticketDate: "2024-03-20",
    dateNotice: "Urgent",
    incidentLocation: "Building A, Room 101",
    details: "AC unit is not cooling properly and making loud noises",
    imageCapture: "ac-unit.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop",
    status: "open",
  },
  {
    id: "2",
    name: "Leaking Roof",
    submitterName: "Sarah Johnson",
    ticketDate: "2024-03-19",
    dateNotice: "High",
    incidentLocation: "Building B, Room 205",
    details: "Water dripping from ceiling during rain",
    imageCapture: "roof-leak.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1517490232338-06b912a786b5?w=800&auto=format&fit=crop",
    status: "in_progress",
  },
  {
    id: "3",
    name: "Faulty Elevator",
    submitterName: "Mike Wilson",
    ticketDate: "2024-03-18",
    dateNotice: "Medium",
    incidentLocation: "Main Building",
    details: "Elevator making strange noises between 2nd and 3rd floor",
    imageCapture: "elevator.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
    status: "open",
  },
  {
    id: "4",
    name: "Power Outage",
    submitterName: "Emily Brown",
    ticketDate: "2024-03-17",
    dateNotice: "High",
    incidentLocation: "Building C",
    details: "Complete power loss in Building C",
    imageCapture: "power-outage.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop",
    status: "completed",
  },
  {
    id: "5",
    name: "Broken Window",
    submitterName: "David Lee",
    ticketDate: "2024-03-16",
    dateNotice: "Low",
    incidentLocation: "Building A, Room 303",
    details: "Window cracked and needs replacement",
    imageCapture: "broken-window.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&auto=format&fit=crop",
    status: "open",
  },
  {
    id: "6",
    name: "Parking Gate Error",
    submitterName: "Lisa Anderson",
    ticketDate: "2024-03-15",
    dateNotice: "Medium",
    incidentLocation: "Main Parking Lot",
    details: "Parking gate not opening properly",
    imageCapture: "parking-gate.jpg",
    imageUrl:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop",
    status: "in_progress",
  },
];
