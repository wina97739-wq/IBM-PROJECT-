📧 Email Reminder System — IBM-NJ Project

📝 Project Overview

The Email Reminder System is a Node.js-based application designed to automatically send reminder emails to users at scheduled times. It allows users to set reminders with details like recipient email, subject, message, and date/time. Once the scheduled time arrives, the system sends the email automatically using Nodemailer and Cron jobs.

🧩 Features

✅ Add reminders with email, subject, message, and scheduled time

📅 Automated scheduling using node-cron

✉️ Email sending via Gmail SMTP using nodemailer

🗃️ Local JSON file for storing reminders

🌐 Simple frontend interface (HTML + JS)

🔁 Automatic marking of sent reminders

⚙️ Technologies Used

Technology Purpose

Node.js Backend runtime environment Express.js Web framework for creating REST APIs Nodemailer Email sending library Node-Cron Task scheduling for reminders HTML, JavaScript Frontend user interface JSON File Storage Persistent local data storage

📁 Folder Structure

email-reminder-system/ │ ├── server.js # Main backend file ├── reminders.json # Local data storage for reminders ├── index.html # Frontend UI └── README.md # Documentation

🚀 How It Works

User adds a new reminder through the HTML form or API endpoint /addReminder.

The reminder details are saved in reminders.json.

A background cron job checks every minute if any reminders are due.

When the scheduled time is reached, the system sends an email to the target user.

Once sent, the reminder is marked as sent: true to avoid duplication.

🔑 API Endpoints

POST /addReminder

Add a new reminder.

Request Body:

{ "email": "user@example.com", "subject": "Meeting Reminder", "message": "Don't forget the 5 PM meeting!", "dateTime": "2025-10-14T17:00:00" }

Response:

{ "success": true, "message": "Reminder added successfully!" }

GET /reminders

Fetch all reminders (both pending and sent).

Response Example:

[ { "id": 1732567283493, "email": "user@example.com", "subject": "Project Meeting", "message": "Zoom call at 5 PM", "dateTime": "2025-10-14T17:00:00", "sent": false } ]

💡 Cron Job Logic

The following line runs a cron job every minute:

cron.schedule("* * * * *", () => { ... });

It checks whether any reminder’s scheduled time matches or has passed the current time, and if not yet sent, triggers the email.

✉️ Email Configuration

The project uses Gmail SMTP via Nodemailer. Before running the system, update the following part in server.js with your credentials:

const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: "your_email@gmail.com", pass: "your_app_password" } });

💡 Tip: Generate a Google “App Password” for better security instead of using your main account password.

🧠 Future Enhancements

🔐 User authentication (Login & Register)

🗓️ Recurring reminders (Daily, Weekly, Monthly)

📨 Email templates with HTML formatting

📊 Dashboard to manage reminders

☁️ Cloud database integration (MongoDB / Firebase)

🧪 Example Reminder Data

[ { "id": 101, "email": "test@example.com", "subject": "Doctor Appointment", "message": "Appointment at 4 PM tomorrow.", "dateTime": "2025-10-15T16:00:00", "sent": false } ]

📜 License

This project is developed as part of the IBM-NJ Project Series for educational purposes. Feel free to modify and enhance it for learning or demonstration.

👨‍💻 Author

Name: Allwin Project Title: IBM-NJ Email Reminder System Technologies: JavaScript | Node.js | Express | Nodemailer | Cron
