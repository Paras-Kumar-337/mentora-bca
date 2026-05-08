import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mentora API Running...");
});

/* ROUTES */
import authRoutes from "./routes/authRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import datesheetRoutes from "./routes/datesheetRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import careerChatRoutes from "./routes/careerChatRoutes.js";
import studyChatRoutes from "./routes/studyChatRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/datesheet", datesheetRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/career-chat", careerChatRoutes);
app.use("/api/study-chat", studyChatRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/career", careerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});