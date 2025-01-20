## <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Usage](#usage)

## <a name="introduction">Introduction</a>

A healthcare image management application designed to empower radiologists and doctors with seamless capabilities to upload, store, view, and organise medical imaging data efficiently.

Hosted on Render cloud platform - https://abchealthcare.onrender.com

## <a name="tech-stack">Tech Stack</a>

- React.js
- Node.js
- Express.js
- Mongo DB
- TailwindCSS
- Firebase

## <a name="features">Features</a>

**User Account Management**: Users can create, read, update, and delete their personal accounts. Google Authentication is also supported for seamless sign-in or sign-up.

**Medical Image Management**: Users can create, read, update, and delete medical images they have uploaded. Bulk image upload functionality allows users to upload multiple images simultaneously.

**Diagnostic Imaging Reports**: Users can write detailed diagnostic imaging reports to accompany uploaded images. These reports enhance the context and usability of the uploaded files.

**Advanced Search and Sorting**: Search for imaging reports using keywords, report type (e.g., X-RAY, CT, MRI), or sort reports by the latest or oldest uploads.

**Doctor-Radiologist Communication**: Doctors can directly contact radiologists who have uploaded reports, enabling seamless collaboration.

**Secure File Storage**: Users can securely upload and store files within the app using Firebase storage services, ensuring data privacy and reliability.

**Responsive Design**: The application is designed to work flawlessly across all device types and screen sizes for a smooth user experience.

## <a name="usage"> Usage </a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
MONGO_URI =
JWT_SECRET =
```

Create a new file named `.env` in the client directory your project and add the following content:

```env
VITE_FIREBASE_API_KEY =
```

**Running the Project**

### Run Node Server

The server will run on http://localhost:3000

```bash
npm run dev
```

### Run React + Vite Frontend

```bash
npm run dev
```
