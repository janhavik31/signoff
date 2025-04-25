# SignOff Page - React + Vite Application

This project is a React-based application built with Vite. It is designed to streamline the process of managing and tracking feature sign-offs for development teams. The application includes features like user authentication, team selection, sign-off tracking, and a responsive UI built with modern tools and frameworks.

---

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)
  - [Previewing the Production Build](#previewing-the-production-build)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Scripts](#scripts)
- [Contributing](#contributing)

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone the repository:
   git clone https://github.com/janhavik31/signoff.git
   cd signoff

### Install dependencies
npm install

### Running the application
npm run dev
-- The application will be available at http://localhost:5173 by default.

--

## Features

### Core Features
- **User Authentication**:
  - Sign-up and sign-in functionality using Firebase.
  - Local storage for session management.
- **Team Selection**:
  - Users can select their team to view and manage sign-offs.
- **Sign-Off Management**:
  - Create, edit, and delete sign-offs for features.
  - Track approvals from QA, Dev, Architect, Performance, Security, and Product teams.
- **Search and Filter**:
  - Search for sign-offs by feature name, summary, or issue ID.
  - Filter sign-offs by status (e.g., In Progress, Completed, Blocked).
- **Responsive Design**:
  - Fully responsive UI for desktop and mobile devices.
- **Real-Time Updates**:
  - Firebase Firestore integration for real-time data updates.

  ### Additional Features
- **Dynamic Routing**:
  - React Router for seamless navigation between pages.
- **Customizable UI**:
  - Tailwind CSS for styling with utility-first classes.
- **Delete Confirmation**:
  - Modal confirmation for deleting sign-offs.
- **User Avatars**:
  - Dynamic user avatars based on initials.

  -- 

  ## Project Structure

signoff/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable React components (e.g., UserAvatar, LogoutButton)
│   ├── pages/              # Page-level components (e.g., SignIn, SignUp, Dashboard)
│   ├── styles/             # CSS or Tailwind styles
│   ├── App.jsx             # Main application component
│   ├── firebase.js         # Firebase configuration
│   └── main.jsx            # Entry point for the application
├── README.md               # Project documentation
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
└── .gitignore              # Ignored files and directories

---

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For client-side routing and navigation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide React**: Icon library for modern and customizable icons.

### Backend
- **Firebase Firestore**: NoSQL database for real-time data storage and retrieval.
- **Firebase Authentication**: For user authentication and session management.

### Build Tools
- **Vite**: A fast build tool with hot module replacement (HMR).
- **PostCSS**: For processing CSS with plugins like Tailwind CSS.

### Linting and Code Quality
- **ESLint**: Linting tool to enforce code quality and consistency.
- **eslint-plugin-react-hooks**: Ensures proper usage of React hooks.
- **eslint-plugin-react-refresh**: Ensures compatibility with React Fast Refresh.

--

