Docs.flow({
  id: "staff-task-proof", icon: "📸", title: "A staff task, done with proof",
  summary: "The owner gives a task to a staff member. They do it and send a photo, a video or a voice note back.",
  lanes: [
    { id: "owner", label: "Owner" },
    { id: "staff", label: "Staff" },
    { id: "system", label: "System" },
  ],
  steps: [
    { id: "create", lane: "owner", kind: "start", title: "Creates a task", short: "Assign, due date, priority", text: "From scratch, or from a chat, an order or a request. The owner picks who does it and when.", screen: "mobile-tasks", mark: "new" },
    { id: "notify", lane: "system", title: "Staff are told", short: "Push to the assignee", text: "The assignee gets a phone notification." },
    { id: "mine", lane: "staff", title: "Staff open My tasks", short: "Late ones stand out", text: "A field login sees its own tasks, with late ones marked.", screen: "mobile-field-tasks", mark: "late" },
    { id: "start", lane: "staff", title: "Starts the task", text: "Tapping Start tells the owner it is being worked on.", screen: "mobile-task", mark: "start" },
    { id: "proof", lane: "staff", title: "Sends proof", short: "Photo, video, voice or document", text: "Staff add what they saw: a photo, a short video, a voice note or a document. The camera opens first.", screen: "mobile-task", mark: "update" },
    { id: "problem", lane: "staff", kind: "decision", title: "Something wrong?", text: "A problem stays in Needs you until someone resolves it.", next: [{ to: "done", label: "no" }, { to: "raise", label: "yes" }] },
    { id: "raise", lane: "staff", kind: "end", title: "Raises a problem", text: "For example “2 units missing”. The owner is told.", screen: "mobile-task", mark: "problem" },
    { id: "done", lane: "staff", kind: "end", title: "Marks it Done", text: "The owner sees the proof and the history of who did what.", screen: "mobile-task", mark: "done" },
  ],
});
