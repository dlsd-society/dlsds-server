const express = require('express');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require("./routes/reportRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const partnershipRoutes = require('./routes/partnershipRoutes');
const firstHackRegistrationRoutes = require('./routes/firstHackRegistrationRoutes');
const hackathonParticipantRoutes = require('./routes/hackathonParticipantRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const internshipRoutes = require("./routes/internshipRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const passport = require("passport");
require("./config/passport"); // load strategies

app.use(passport.initialize());
// app.use(passport.session()); // if using sessions

app.get('/', (req, res) => res.send('API is running'));

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/partnerships", partnershipRoutes);
app.use("/api/firsthack", firstHackRegistrationRoutes);
app.use("/api/hackathon-participants", hackathonParticipantRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/internships", internshipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
