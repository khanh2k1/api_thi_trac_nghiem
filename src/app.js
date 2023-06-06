const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const UserRoutes = require('./routes/User.routes')
const ExamRoutes = require('./routes/Exam.routes')
const AuthRoutes = require('./routes/Auth.routes')
const RoomRoutes = require('./routes/Room.routes')
const cors = require('cors')

// middlewares
const bodyParser = require('body-parser');

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());


// Sử dụng body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
// init routes
app.use('/v1/exam/', ExamRoutes)
app.use('/v1/', AuthRoutes)
app.use('/v1/user/', UserRoutes)
app.use('/v1/room', RoomRoutes)

app.get('/',(req,res)=>{
res.send('HELLO WORLD')
})


module.exports = app;
