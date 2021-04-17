const express = require("express");
const app = express();
const notesRouter = require('./Router/notesRouter')
const userRouter = require("./Router/userRouter");
const classRouter = require("./Router/classRouter");


app.use(express.json());

app.use("/api/class", classRouter);
app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
