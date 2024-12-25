require('dotenv').config();
const express =  require('express');
const googleRout = require('./routes/auth');
require('./config/passport-google');
require('./config/passport-facebook');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', {
        googleAuthUrl: '/auth/google',
        facebookAuthUrl: '/auth/facebook'
    });
})

app.use('/auth',googleRout);
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));