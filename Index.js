const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DATA_FILE = "reminders.json";
let reminders = [];

if (fs.existsSync(DATA_FILE)) {
  reminders = JSON.parse(fs.readFileSync(DATA_FILE));
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_app_password"
  }
});

function saveReminders() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(reminders, null, 2));
}

app.post("/addReminder", (req, res) => {
  const { email, subject, message, dateTime } = req.body;

  if (!email || !subject || !message || !dateTime) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const reminder = {
    id: Date.now(),
    email,
    subject,
    message,
    dateTime,
    sent: false
  };

  reminders.push(reminder);
  saveReminders();
  res.json({ success: true, message: "Reminder added successfully!" });
});

app.get("/reminders", (req, res) => {
  res.json(reminders);
});

cron.schedule("* * * * *", () => {
  const now = new Date();
  reminders.forEach((reminder) => {
    const reminderTime = new Date(reminder.dateTime);

    if (!reminder.sent && reminderTime <= now) {
      const mailOptions = {
        from: "your_email@gmail.com",
        to: reminder.email,
        subject: reminder.subject,
        text: reminder.message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
          reminder.sent = true;
          saveReminders();
        }
      });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
