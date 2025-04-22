const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db'); 
const authRoutes = require('./routes/auth');
const authenticate = require('./middleware/autho');
const app = express();
const PORT =  3000;
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.get('/api/protected', authenticate, (req, res) => {
    res.json({ message: `Hello user with Name: ${req.name}` });
});
sequelize.authenticate()
    .then(() => {
        console.log(' Database connection established successfully.');
        return sequelize.sync(); 
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(' Unable to connect to the database:', err);
    });
