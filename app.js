const express = require("express");
const app = express();
const cors = require('cors')
const notesRouter = require("./Router/notesRouter");
const classRouter = require("./Router/classRouter");
// const userRouter = require("./Router/userRouter");

app.use(express.json());
app.use(cors());

app.use("/api/class", classRouter);
app.use("/api/notes", notesRouter);
// app.use("/api/user", userRouter);

// app.get("auth/google", (req, res) => {
//   console.log("user logged in ");
// });

// // http://localhost:4000/auth/callback
// app.get("auth/callback", (req, res) => {
//   console.log("user received");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
