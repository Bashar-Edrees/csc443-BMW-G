// src/data/mockData.js
export const initialNotices = [
  {
    id: "MF-0412",
    kind: "found",
    title: "Set of keys, red lanyard",
    category: "Keys",
    location: "Science block stairwell",
    date: "2026-10-21",
    description: "Four keys and a green plastic fob, one of them looks like a car key. Left at the security desk in block B.",
    status: "Open",
    authorEmail: "miguel.saade@lau.edu",
    authorName: "Miguel Saade",
    claimsCount: 2,
    claims: [
      { id: "cl-1", userInitials: "BI", userName: "Bashar Idris", text: "Green fob with a chip in the corner, and the car key is a Kia.", date: "2026-10-22", status: "pending" },
      { id: "cl-2", userInitials: "GF", userName: "George Fayyad", text: "Red lanyard, I think it says the name of a gym on it.", date: "2026-10-23", status: "pending" }
    ]
  },
  {
    id: "MF-0411",
    kind: "lost",
    title: "Black JanSport backpack",
    category: "Bags",
    location: "Library, 2nd floor",
    date: "2026-10-20",
    description: "Grey laptop sleeve inside, a blue calculator and a lot of CSC443 notes. Keyring with a small brass bell.",
    status: "Open",
    authorEmail: "bashar.idris@lau.edu",
    authorName: "Bashar Idris",
    claimsCount: 0,
    claims: []
  },
  {
    id: "MF-0405",
    kind: "lost",
    title: "Blue hoodie, LAU print",
    category: "Clothing",
    location: "Gym",
    date: "2026-10-14",
    description: "Size L, dark blue with white lettering across the chest.",
    status: "Open",
    authorEmail: "bashar.idris@lau.edu",
    authorName: "Bashar Idris",
    claimsCount: 0,
    claims: []
  },
  {
    id: "MF-0390",
    kind: "found",
    title: "Calculator, Casio fx-991",
    category: "Electronics",
    location: "Room C-204",
    date: "2026-10-02",
    description: "Casio scientific calculator with name sticker peeled off the back.",
    status: "Returned",
    authorEmail: "bashar.idris@lau.edu",
    authorName: "Bashar Idris",
    claimsCount: 1,
    claims: []
  }
];