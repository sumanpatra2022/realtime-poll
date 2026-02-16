## Real-Time Poll Rooms

A full-stack real-time polling application that allows users to create a poll, share it via a unique link, and collect votes with live result updates.

---

## Features

- Create a poll with a question and multiple options (minimum 2 required)
- Generate a unique shareable link for each poll
- Join a poll via link and vote (single choice)
- Real-time vote updates for all connected users
- Persistent storage using MongoDB
- Anti-abuse mechanisms to prevent repeated voting

---

## How It Works

1. A user creates a poll.
2. The system generates a unique poll ID.
3. The poll is accessible via:
   /poll/:id
4. Users can vote once.
5. When someone votes, all connected users see results update instantly via Socket.io.

---

## Real-Time Implementation

- Implemented using Socket.io
- Each poll is treated as a separate room.
- When a vote is cast:
  io.to(pollId).emit("pollUpdated", updatedPoll);
- All clients in that room receive the updated poll instantly.

---

## Fairness / Anti-Abuse Mechanisms

### 1️. Browser UUID Restriction

- Each browser is assigned a unique ID stored in localStorage.
- Prevents the same browser from voting multiple times.
- Limitation: Clearing browser storage bypasses this protection.

### 2️. IP Address Restriction

- Backend checks the user's IP before allowing a vote.
- Prevents repeated voting from the same network.
- Limitation: VPN usage or shared networks may affect behavior.

These two mechanisms significantly reduce repeat or abusive voting.

---

## Persistence

- Polls and votes are stored in MongoDB.
- Refreshing the page does not remove votes.
- Poll links remain valid after server restart.

---

## Edge Cases Handled

- Poll not found (invalid ID)
- Minimum 2 options validation
- Empty options filtered before saving
- Duplicate vote blocked
- Double-click vote protection
- Simultaneous voting handled
- Server restart persistence verified

---

## Tech Stack

Frontend:

- React (Vite)
- Axios
- Socket.io Client

Backend:

- Node.js
- Express
- Socket.io
- MongoDB (Atlas)
- Mongoose

---

## Known Limitations

- No authentication system
- IP-based restriction is not fully secure (VPN bypass possible)
- Browser UUID can be reset by clearing local storage
- Single server instance (no horizontal scaling implemented)

---

## Deployment

Frontend: (Add your Vercel URL here)
Backend: (Add your Render URL here)

---

## Repository

GitHub: (Add your GitHub repo link here)
