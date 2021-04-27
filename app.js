const express = require("express");
const app = express();
const cors = require('cors')
const notesRouter = require("./Router/notesRouter");
const classRouter = require("./Router/classRouter");
const userRouter = require("./Router/userRouter");

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
  res.send("<h1> Welcome to Class Notes backend </h1>")
})

app.use("/api/class", classRouter);
app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
