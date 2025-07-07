const express = require('express');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is running'));

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
