require('dotenv').config();
const express =  require('express');
const googleRout = require('./routes/auth');
require('./config/passport-google');
require('./config/passport-facebook');

const app = express();
const port = 3000;



app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome</h1>
        <a href="/auth/google">Login with Google</a>
        <br>
        <br>
        <a href="/auth/facebook">Login with facebook</a>
    `);
});
app.use('/auth',googleRout);
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));