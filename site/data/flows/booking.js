Docs.flow({
  id: "booking", icon: "📅", title: "Booking an appointment",
  summary: "Clinics, salons, workshops. The agent only ever sees free slots, per staff member, and the system re-checks the slot as it books.",
  lanes: [
    { id: "customer", label: "Customer" },
    { id: "ai", label: "AI agent" },
    { id: "system", label: "System" },
    { id: "team", label: "Your team" },
  ],
  steps: [
    { id: "ask", lane: "customer", kind: "start", title: "“Kal doctor sahab free hain?”", text: "The customer asks for a time, maybe with a particular person." },
    { id: "who", lane: "ai", title: "Asks who, offers slots", short: "Free slots per person", text: "If the Item has several staff, the agent asks who (or offers the soonest). It sees only free slots, within opening hours and notice time.", screen: "web-appointments", mark: "who" },
    { id: "pick", lane: "customer", title: "Picks a slot", text: "The customer chooses one of the offered times." },
    { id: "book", lane: "system", kind: "decision", title: "Still free?", text: "The booking re-checks capacity inside the write, so two customers can't take the last place.", next: [{ to: "confirm", label: "yes" }, { to: "who", label: "taken" }] },
    { id: "confirm", lane: "system", title: "Confirmation sent", short: "Written by the system", text: "The system writes the confirmation with the person's name and time; it also appears in Appointments." },
    { id: "remind", lane: "system", title: "Reminder", short: "Before the appointment", text: "A reminder goes out: free text inside 24 hours of the last message, otherwise the Item's reminder template." },
    { id: "see", lane: "team", kind: "end", title: "On the calendar", text: "Staff see bookings by person in Appointments and can book by hand.", screen: "web-appointments", mark: "week" },
  ],
});
