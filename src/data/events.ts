export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  {
    id: 1,
    title: "React study night",
    date: "2026-10-22",
    place: "Room 302",
    seats: 20,
  },
  {
    id: 2,
    title: "TypeScript live coding",
    date: "2026-10-25",
    place: "Lab 214",
    seats: 2,
  },
  {
    id: 3,
    title: "Applied Data seminar",
    date: "2026-10-28",
    place: "Auditorium 401",
    seats: 30,
  },
  {
    id: 4,
    title: "SIS 2 project clinic",
    date: "2026-10-30",
    place: "Coworking Hall",
    seats: 15,
  },
];
