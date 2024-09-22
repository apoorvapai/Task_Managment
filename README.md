# 📝 Task Management Application

A Task Management application built using React.js for the frontend, MongoDB for the database, and Cloudinary for image storage. This app allows users to keep track of their tasks, set due dates, monitor the progress of each task, and attach images to tasks for better visualization.

## 🌟 Features

- 📋 **Task Management**: Create, update, and delete tasks.
- 🗓️ **Due Dates**: Set and view due dates for each task.
- 📊 **Progress Tracking**: Track the progress of each task (e.g., Not Started, In Progress, Completed).
- 🔍 **Task Filtering**: Filter tasks based on status, due dates, and keywords.
- 🚥 **Task Progress**: Track the progress of each task (e.g., Not Started, In Progress, Completed).
- ✏️ **Edit Tasks**: Modify task details, including status updates.
- ❌ **Delete Tasks**: Remove tasks that are no longer needed.
- 🔍 **Filter and Sort**: Filter tasks based on their status or due dates.
- 💻 **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## 💻 Technologies Used

- **Frontend**: React.js,Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **UI Library**: Tailwind Css
- **API Communication**: Axios
## Screenshots
![image](https://github.com/user-attachments/assets/5061389b-72e2-41f9-be08-6ecd89d35116)
![image](https://github.com/user-attachments/assets/e675c101-0197-4161-a074-e012420c90d7)
![image](https://github.com/user-attachments/assets/05ef23e7-606b-4626-a7ea-2c1b3823790b)
![image](https://github.com/user-attachments/assets/adec5aa4-381f-4d44-a4e1-d4b597296570)
![image](https://github.com/user-attachments/assets/f64f74b4-28c9-473d-baca-3c9d2abc7ca6)
![image](https://github.com/user-attachments/assets/79abf1d5-e31b-415c-a029-1debcf5bea5e)
![image](https://github.com/user-attachments/assets/02607e85-d4ea-49a5-870b-bce84b568aa1)
![image](https://github.com/user-attachments/assets/9c20f935-6293-481c-b458-5263f8ed0c3f)
![image](https://github.com/user-attachments/assets/0b34c343-faf4-435b-b27a-f2f01dc5e805)

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Cloudinary account

###   Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/apoorvapai/task-management.git
   cd task-management
2. **Install the requirments in both the frontend and backend**
   ```bash
   npm i
3. **Setup you MongoDB** <br>
   Create a New project in MongoDB
   <br>
   
4. **Create a .env file in backend directory**
   ```bash
   MONGODB_URI=Your_MONGODB_LINK
   PORT=5000
   CLOUDINARY_SECRET=Your_Cloudinary_Secret_Key
   CLOUDINARY_API=Your_Cloudinary_API
   CLOUDINARY_EXPIRE=7D
   COOKIE_EXPIRES=5
5. **Start the backend server**
   ```bash
   node index.js
6. **Start the frontend server**
   ```bash
   npm run dev
Open your browser and go to http://localhost:5173 to see the application in action.

   
