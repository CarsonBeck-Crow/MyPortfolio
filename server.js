import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import mysql from "mysql2";
import "dotenv/config"
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: "contactFormDB",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.post("/submit-form", (req, res) => {
    const {firstname, lastname, email, message} = req.body;

    const query = `
    INSERT INTO submissions (firstname, lastname, email, message)
    VALUES (?, ?, ?, ?)
    `;
    const values = [firstname, lastname, email, message];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error inserting data to MySQL: ", err);
            res.status(500).json({message: "Something went wrong. Please try again." });
            return;
        }

        console.log("Form data successfully inserted into MySQL: ", results);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_SEND,
            subject: "New Contact Form Submission",
            text: `
            First Name: ${firstname},
            Last Name: ${lastname},
            Email: ${email},
            Message: ${message}
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
                res.status(500).json({message: "Form submitted, but email failed."});
            } else {
                console.log("Email sent: " + info.response);
                res.json({
                    message: "Form submitted successfully.",
                    data: {firstname, lastname, email, message},
                });
            }
        });
    });
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});