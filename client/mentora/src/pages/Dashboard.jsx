import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FiSearch, FiBell } from "react-icons/fi";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTasks, updateTask, createTask, clearCompletedTasks, } from "../services/taskService";
import { getAttendance, markAttendance } from "../services/attendanceService";
import { semesterSubjects } from "../../../../shared/constants/subjects.js";
import { recommendedVideos } from "../constants/recommendedVideos";
import {
    getNotes,
    createNote,
} from "../services/notesService";

import {
    getDatesheet,
    createDatesheet,
} from "../services/datesheetService";


function Donut({ percent = 78, size = 140, stroke = 12, color = "#00E5FF" }) {
    const radius = (size - stroke) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <svg width={size} height={size} className="block mx-auto">
            <defs>
                <linearGradient id="donutGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor={color === "#EF4444" ? "#DC2626" : "#006AFF"} />
                    <stop offset="100%" stopColor={color} />
                </linearGradient>
            </defs>

            {/* background circle */}
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#E6EEF9" strokeWidth={stroke} />

            {/* progress */}
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="url(#donutGrad)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${center} ${center})`}
            />

            {/* center text */}
            <text x="50%" y="50%" dy="0.125em" textAnchor="middle" className="text-xl font-semibold" fill="#0F172A">
                {Number(percent).toFixed(2)}%
            </text>
        </svg>
    );
}

function ArcCGPA({ cgpa = 8.5, max = 10, size = 160, stroke = 14 }) {
    // show as arc filling proportional to cgpa/max
    const percent = (cgpa / max) * 100;
    const radius = (size - stroke) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <svg width={size} height={size}>
            <defs>
                <linearGradient id="arcGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#006AFF" />
                    <stop offset="100%" stopColor="#00E5FF" />
                </linearGradient>
            </defs>

            {/* semi background (light) */}
            <path
                d={describeArcPath(size / 2, size / 2, radius, -160, -20)}
                fill="none"
                stroke="#EEF7FF"
                strokeWidth={stroke}
                strokeLinecap="round"
            />

            {/* arc progress */}
            <path
                d={describeArcPath(size / 2, size / 2, radius, -160, -160 + (140 * percent) / 100)}
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth={stroke}
                strokeLinecap="round"
            />

            <text x="50%" y="50%" dy="0.125em" textAnchor="middle" className="text-xl font-semibold" fill="#0F172A">
                {cgpa}
            </text>
            <text x="50%" y="50%" dy="1.6em" textAnchor="middle" className="text-sm text-gray-500">
                CGPA
            </text>
        </svg>
    );
}

// helper to create arc path (SVG arc)
function polarToCartesian(cx, cy, r, angleDeg) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
    return {
        x: cx + r * Math.cos(angleRad),
        y: cy + r * Math.sin(angleRad),
    };
}
function describeArcPath(cx, cy, r, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

export default function Dashboard() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    const [search, setSearch] = useState("");
    const [showTaskInput, setShowTaskInput] =
        useState(false);

    const [newTask, setNewTask] =
        useState("");
    const [attendanceList, setAttendanceList] =
        useState([]);

    const [selectedSubject, setSelectedSubject] =
        useState("");

    const availableSubjects =
        semesterSubjects[user?.year] || [];

    const [notes, setNotes] =
        useState([]);

    const [datesheet, setDatesheet] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [taskLoading, setTaskLoading] =
        useState(false);

    const [noteLoading, setNoteLoading] =
        useState(false);

    const [examLoading, setExamLoading] =
        useState(false);

    const [attendanceLoading, setAttendanceLoading] =
        useState(false);
    const [attendanceLocked, setAttendanceLocked] =
        useState(true);

    const [showExamInput, setShowExamInput] =
        useState(false);

    const [examSubject, setExamSubject] =
        useState("");

    const [examType, setExamType] =
        useState("Minor Test");

    const [examDate, setExamDate] =
        useState("");

    const [examTime, setExamTime] =
        useState("");

    const [examRoom, setExamRoom] =
        useState("");

    const [showNoteInput, setShowNoteInput] =
        useState(false);

    const [newNoteTitle, setNewNoteTitle] =
        useState("");

    const [newNoteSubject, setNewNoteSubject] =
        useState("");

    const [newNoteContent, setNewNoteContent] =
        useState("");

    useEffect(() => {
        setLoading(true);

        const fetchTasks = async () => {

            try {

                const data = await getTasks();

                setTasks(data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchTasks();

        const fetchAttendance =
            async () => {

                try {

                    const data =
                        await getAttendance();

                    setAttendanceList(data);

                    if (availableSubjects.length > 0) {
                        setSelectedSubject(
                            availableSubjects[0]
                        );
                    }

                } catch (error) {

                    console.log(error);
                }
            };

        fetchAttendance();

        const fetchNotes =
            async () => {

                try {

                    const data =
                        await getNotes();

                    setNotes(data);

                } catch (error) {

                    console.log(error);
                }
            };

        fetchNotes();

        const fetchDatesheet =
            async () => {

                try {

                    const data =
                        await getDatesheet();

                    setDatesheet(data);

                } catch (error) {

                    console.log(error);
                }
            };

        fetchDatesheet();
        setTimeout(() => {
            setLoading(false);
        }, 700);

    }, []);

    const attendance = attendanceList.find(
        (item) => item.subject === selectedSubject
    );

    // --- Global dashboard search filtering ---
    const searchQuery =
        search.toLowerCase();

    const filteredTasks =
        tasks.filter((task) =>
            task.title
                ?.toLowerCase()
                .includes(searchQuery)
        );

    const filteredNotes =
        notes.filter((note) =>
            (
                note.title
                    ?.toLowerCase()
                    .includes(searchQuery)
            )
            ||
            (
                note.subject
                    ?.toLowerCase()
                    .includes(searchQuery)
            )
        );

    const filteredVideos =
        (recommendedVideos[user?.year] || [])
            .filter((video) =>
                (
                    video.title
                        ?.toLowerCase()
                        .includes(searchQuery)
                )
                ||
                (
                    video.subject
                        ?.toLowerCase()
                        .includes(searchQuery)
                )
            );

    const filteredDatesheet =
        datesheet
            .filter((exam) =>
                (
                    exam.subject
                        ?.toLowerCase()
                        .includes(searchQuery)
                )
                ||
                (
                    exam.examType
                        ?.toLowerCase()
                        .includes(searchQuery)
                )
            );

    async function toggleTask(id, completed) {

        try {

            const updatedTask =
                await updateTask(id, {
                    completed: !completed,
                });

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === id
                        ? updatedTask
                        : task
                )
            );

        } catch (error) {

            console.log(error);
        }
    }

    async function handleAddTask() {

        if (!newTask.trim()) return;

        try {
            setTaskLoading(true);
            const createdTask =
                await createTask({
                    title: newTask,
                });

            setTasks((prev) => [
                createdTask,
                ...prev,
            ]);

            setNewTask("");

            setShowTaskInput(false);
            setTaskLoading(false);
        } catch (error) {
            setTaskLoading(false);
            console.log(error);
        }
    }

    async function handleClearCompleted() {

        try {

            await clearCompletedTasks();

            setTasks((prev) =>
                prev.filter(
                    (task) =>
                        !task.completed
                )
            );

        } catch (error) {

            console.log(error);
        }
    }

    async function handleMarkAttendance(
        status
    ) {
        try {
            setAttendanceLoading(true);
            const updatedAttendance =
                await markAttendance({
                    subject: selectedSubject,
                    semester: user?.year,
                    status,
                });

            setAttendanceList((prev) =>
                prev.map((item) =>
                    item._id === updatedAttendance._id
                        ? updatedAttendance
                        : item
                )
            );
            setAttendanceLoading(false);
        } catch (error) {
            setAttendanceLoading(false);
            console.log(error);
        }
    }

    async function handleAddExam() {

        if (
            !examSubject ||
            !examDate ||
            !examTime ||
            !examRoom
        ) return;

        try {
            setExamLoading(true);
            const createdExam =
                await createDatesheet({
                    subject: examSubject,
                    semester: user?.year,
                    examType,
                    date: examDate,
                    time: examTime,
                    room: examRoom,
                });

            setDatesheet((prev) => [
                createdExam,
                ...prev,
            ]);

            setExamSubject("");
            setExamType("Minor Test");
            setExamDate("");
            setExamTime("");
            setExamRoom("");

            setShowExamInput(false);
            setExamLoading(false);
        } catch (error) {
            setExamLoading(false);
            console.log(error);
        }
    }

    async function handleAddNote() {
        if (
            !newNoteTitle.trim() ||
            !newNoteSubject.trim()
        ) return;

        try {
            setNoteLoading(true);
            const createdNote =
                await createNote({
                    title: newNoteTitle,
                    subject: newNoteSubject,
                    semester: user?.year,
                    content: newNoteContent,
                });

            setNotes((prev) => [
                createdNote,
                ...prev,
            ]);

            setNewNoteTitle("");
            setNewNoteSubject("");
            setNewNoteContent("");
            setShowNoteInput(false);
            setNoteLoading(false);
        } catch (error) {
            setNoteLoading(false);
            console.log(error);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-8">
                <div className="animate-pulse space-y-6 max-w-screen-xl mx-auto">

                    <div className="h-12 bg-gray-200 rounded-2xl w-1/3" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="h-64 bg-gray-200 rounded-2xl" />
                        <div className="h-64 bg-gray-200 rounded-2xl" />
                        <div className="h-64 bg-gray-200 rounded-2xl" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="h-64 bg-gray-200 rounded-2xl" />
                        <div className="h-64 bg-gray-200 rounded-2xl" />
                        <div className="h-64 bg-gray-200 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 animate-fadeIn">

                {/* Dashboard header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">

                        {
                            user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-md"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-md">
                                    {user?.name?.charAt(0)?.toUpperCase() || "S"}
                                </div>
                            )
                        }

                        <div>
                            <h1 className="text-2xl font-heading text-textMain font-semibold">
                                Welcome back, {" "}
                                <span className="text-primary">
                                    {user?.name || "Student"}
                                </span>
                                !
                            </h1>

                            <p className="text-sm text-textMuted">
                                Your Dashboard
                            </p>
                        </div>

                    </div>

                    {/* search + notifications */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search classes, notes, videos..."
                                className="border-2 border-gray-200 rounded-full px-4 py-2 w-full md:w-80 outline-none pr-10 focus:border-primary shadow-sm"
                            />
                            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 w-full animate-fadeIn">
                    <Link to="/career" className="flex-1 text-center bg-transparent text-primary border-2 border-primary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">Career Support</Link>
                    <Link to="/community" className="flex-1 text-center bg-transparent text-primary border-2 border-primary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">Community Section</Link>
                    <Link to="/profile" className="flex-1 text-center bg-transparent text-primary border-2 border-primary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">Your Profile</Link>
                    <Link
                        to="/ai"
                        className="flex-1 text-center px-4 py-2 rounded-full text-sm text-purple-600 border-2 border-purple-600 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] transition relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Ask ARIA
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0,0,256,256" className="fill-current">
                                <g transform="scale(8.53333,8.53333)">
                                    <path d="M14.217,19.707l-1.112,2.547c-0.427,0.979 -1.782,0.979 -2.21,0l-1.112,-2.547c-0.99,-2.267 -2.771,-4.071 -4.993,-5.057l-3.06,-1.358c-0.973,-0.432 -0.973,-1.848 0,-2.28l2.965,-1.316c2.279,-1.012 4.092,-2.883 5.065,-5.226l1.126,-2.714c0.418,-1.007 1.81,-1.007 2.228,0l1.126,2.714c0.973,2.344 2.786,4.215 5.065,5.226l2.965,1.316c0.973,0.432 0.973,1.848 0,2.28l-3.061,1.359c-2.221,0.986 -4.003,2.79 -4.992,5.056z"></path>
                                    <path d="M24.481,27.796l-0.339,0.777c-0.248,0.569 -1.036,0.569 -1.284,0l-0.339,-0.777c-0.604,-1.385 -1.693,-2.488 -3.051,-3.092l-1.044,-0.464c-0.565,-0.251 -0.565,-1.072 0,-1.323l0.986,-0.438c1.393,-0.619 2.501,-1.763 3.095,-3.195l0.348,-0.84c0.243,-0.585 1.052,-0.585 1.294,0l0.348,0.84c0.594,1.432 1.702,2.576 3.095,3.195l0.986,0.438c0.565,0.251 0.565,1.072 0,1.323l-1.044,0.464c-1.358,0.604 -2.447,1.707 -3.051,3.092z"></path>
                                </g>
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 animate-fadeIn">
                    {/* Attendance */}
                    <div className="bg-white rounded-2xl shadow p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                        <div className="w-full flex justify-between items-start gap-3">
                            <h3 className="font-semibold text-textMain">
                                Attendance
                            </h3>

                            <div className="flex items-center gap-2 flex-wrap justify-end">

                                <button
                                    onClick={() =>
                                        setAttendanceLocked(
                                            !attendanceLocked
                                        )
                                    }
                                    className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 font-medium shadow-sm ${attendanceLocked
                                            ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100"
                                            : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                        }`}
                                >
                                    {
                                        attendanceLocked
                                            ? "🔒 Locked"
                                            : "🔓 Unlocked"
                                    }
                                </button>

                                <select
                                    value={selectedSubject}
                                    onChange={(e) =>
                                        setSelectedSubject(e.target.value)
                                    }
                                    className="text-sm text-primary font-medium border border-primary rounded-2xl px-2 py-1 outline-none"
                                >
                                    {
                                        availableSubjects.map((subject) => (
                                            <option
                                                key={subject}
                                                value={subject}
                                            >
                                                {subject}
                                            </option>
                                        ))
                                    }
                                </select>

                            </div>
                        </div>
                        <div className="mt-4 flex items-start gap-5">
                            <Donut
                                percent={attendance?.percentage || 0}
                                color={
                                    (attendance?.percentage || 0) < 70
                                        ? "#EF4444"
                                        : "#00E5FF"
                                }
                            />
                            <div className="flex-1 pt-1">
                                <div className="text-sm">
                                    Total Classes
                                </div>
                                <div className="text-2xl font-semibold text-textMain mt-2">{attendance?.totalClasses || 0}</div>
                                <div className="text-sm text-textMuted mt-1">Present: {attendance?.attendedClasses || 0}</div>
                                <div className="text-sm text-red-400 mt-1">
                                    Absent: {
                                        (attendance?.totalClasses || 0)
                                        -
                                        (attendance?.attendedClasses || 0)
                                    }
                                </div>
                                {
                                    (attendance?.percentage || 0) < 70 && (
                                        <div className="mt-2 inline-flex items-center bg-red-50 border border-red-200 text-red-600 text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                                            ⚠ Low Attendance
                                        </div>
                                    )
                                }
                                <div className="flex gap-2 mt-3 flex-wrap">

                                    <button
                                        disabled={attendanceLocked}
                                        onClick={() =>
                                            handleMarkAttendance(
                                                "present"
                                            )
                                        }
                                        className="bg-primary text-white px-4 py-2 border-2 border-primary rounded-full hover:bg-transparent hover:text-primary hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:text-white disabled:hover:scale-100"
                                    >
                                        {attendanceLoading ? "Updating..." : "Present"}
                                    </button>

                                    <button
                                        disabled={attendanceLocked}
                                        onClick={() =>
                                            handleMarkAttendance(
                                                "absent"
                                            )
                                        }
                                        className="bg-red-500 text-white px-4 py-2 border-2 border-red-500 rounded-full hover:bg-transparent hover:text-red-500 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500 disabled:hover:text-white disabled:hover:scale-100"
                                    >
                                        {attendanceLoading ? "Updating..." : "Absent"}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* My Performance */}
                    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                        <div className="w-full flex justify-between items-start">
                            <h3 className="font-semibold text-textMain">
                                My Performance
                            </h3>

                            <div className="text-right">
                                <div className="text-sm text-primary border border-primary px-3 py-1 rounded-full font-medium">
                                    SGPA: {user?.sgpa || 0}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <ArcCGPA cgpa={user?.cgpa || 0} />
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-textMain">My Tasks</h3>
                            <button
                                onClick={handleClearCompleted}
                                className="text-sm text-red-500 border border-red-500 hover:bg-red-100 px-3 py-1 rounded-full cursor-pointer transition-all duration-200 font-medium hover:scale-[1.03]"
                            >
                                Clear Done
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            {filteredTasks.map((t) => (
                                <label key={t._id} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() =>
                                            toggleTask(
                                                t._id,
                                                t.completed
                                            )
                                        }
                                        className="w-4 h-4"
                                    />
                                    <span className={`text-sm ${t.completed ? "line-through text-gray-400" : "text-textMain"}`}>{t.title}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mt-4">

                            {
                                showTaskInput && (

                                    <div className="flex gap-2 mb-4">

                                        <input
                                            type="text"
                                            value={newTask}
                                            onChange={(e) =>
                                                setNewTask(e.target.value)
                                            }
                                            placeholder="Enter task..."
                                            className="flex-1 border-2 border-gray-200 rounded-full px-4 py-2 outline-none"
                                        />

                                        <button
                                            onClick={handleAddTask}
                                            className="bg-primary text-white px-4 py-2 rounded-full"
                                        >
                                            {taskLoading ? "Adding..." : "Add"}
                                        </button>

                                    </div>
                                )
                            }

                            <button
                                onClick={() =>
                                    setShowTaskInput(
                                        !showTaskInput
                                    )
                                }
                                className="mt-2 bg-primary text-white px-4 py-2 border-2 border-primary rounded-full hover:bg-transparent hover:text-primary hover:scale-[1.02] transition-all duration-200"
                            >
                                {showTaskInput
                                    ? "Cancel"
                                    : "Add New +"}
                            </button>

                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 animate-fadeIn w-full">

                    {/* Notes */}
                    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-textMain">Notes</h3>
                            <button
                                onClick={() =>
                                    setShowNoteInput(
                                        !showNoteInput
                                    )
                                }
                                className={`text-sm px-3 py-1 rounded-full cursor-pointer transition-all duration-200 font-medium hover:scale-[1.03] ${showNoteInput
                                        ? "text-red-500 border border-red-500 hover:bg-red-100"
                                        : "text-primary border border-primary hover:bg-blue-100"
                                    }`}
                            >
                                {
                                    showNoteInput
                                        ? "Cancel"
                                        : "Add New"
                                }
                            </button>
                        </div>

                        {
                            showNoteInput && (

                                <div className="mt-4 space-y-3">

                                    <input
                                        type="text"
                                        value={newNoteTitle}
                                        onChange={(e) =>
                                            setNewNoteTitle(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Note title"
                                        className="w-full border border-primary text-primary rounded-full px-4 py-2 outline-none"
                                    />

                                    <select
                                        value={newNoteSubject}
                                        onChange={(e) =>
                                            setNewNoteSubject(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-primary text-primary rounded-full px-4 py-2 outline-none"
                                    >
                                        <option value="">
                                            Select Subject
                                        </option>

                                        {
                                            availableSubjects.map(
                                                (subject) => (
                                                    <option
                                                        key={subject}
                                                        value={subject}
                                                    >
                                                        {subject}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>

                                    <textarea
                                        value={newNoteContent}
                                        onChange={(e) =>
                                            setNewNoteContent(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Write your note..."
                                        rows={4}
                                        className="w-full border border-primary text-primary rounded-2xl px-4 py-3 outline-none resize-none"
                                    />

                                    <button
                                        onClick={handleAddNote} className="mt-2 bg-primary text-white px-4 py-2 border-2 border-primary rounded-full hover:bg-transparent hover:text-primary hover:scale-[1.02] transition-all duration-200"
                                    >
                                        {noteLoading ? "Saving..." : "Save Note"}
                                    </button>

                                </div>
                            )
                        }

                        <div className="mt-4 space-y-4">
                            {
                                filteredNotes.length > 0 ? (
                                    filteredNotes.slice(0, 4).map((note) => (
                                        <div key={note._id}>
                                            <div className="text-sm text-textMain font-medium">
                                                {note.title}
                                            </div>
                                            <div className="text-sm text-textMuted">
                                                {note.subject}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-textMuted">
                                        No notes added yet.
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    {/* Videos */}
                    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-textMain">Videos</h3>
                            <button className="text-sm text-primary border border-primary px-3 py-1 rounded-full font-medium">
                                Recommended
                            </button>
                        </div>

                        <div className="mt-4 space-y-4">
                            {
                                filteredVideos.length > 0 ? (
                                    filteredVideos
                                        .slice(0, 4)
                                        .map((video, index) => (
                                            <div key={index}>
                                                <div className="text-sm text-textMain font-medium">
                                                    {video.title}
                                                </div>
                                                <div className="text-sm text-textMuted mt-1">
                                                    {video.subject}
                                                </div>
                                                <a
                                                    href={video.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-primary hover:underline mt-1 inline-block"
                                                >
                                                    Watch Video
                                                </a>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-sm text-textMuted">
                                        No recommended videos available.
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    {/* Datesheet Widget */}
                    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-textMain">Datesheet</h3>
                            <button
                                onClick={() =>
                                    setShowExamInput(
                                        !showExamInput
                                    )
                                }
                                className={`text-sm px-3 py-1 rounded-full cursor-pointer transition-all duration-200 font-medium hover:scale-[1.03] ${showExamInput
                                        ? "text-red-500 border border-red-500 hover:bg-red-100"
                                        : "text-primary border border-primary hover:bg-blue-100"
                                    }`}
                            >
                                {
                                    showExamInput
                                        ? "Cancel"
                                        : "Add Exam"
                                }
                            </button>
                        </div>

                        {
                            showExamInput && (

                                <div className="mt-4 space-y-3">

                                    <select
                                        value={examSubject}
                                        onChange={(e) =>
                                            setExamSubject(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-primary text-primary rounded-full px-4 py-2 outline-none"
                                    >
                                        <option value="">
                                            Select Subject
                                        </option>

                                        {
                                            availableSubjects.map(
                                                (subject) => (
                                                    <option
                                                        key={subject}
                                                        value={subject}
                                                    >
                                                        {subject}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>

                                    <select
                                        value={examType}
                                        onChange={(e) =>
                                            setExamType(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-primary text-primary rounded-full px-4 py-2 outline-none"
                                    >
                                        <option>
                                            Minor Test
                                        </option>
                                        <option>
                                            Major Test
                                        </option>
                                        <option>
                                            Mid Term Practical
                                        </option>
                                        <option>
                                            End Term Practical
                                        </option>
                                    </select>

                                    <input
                                        type="date"
                                        value={examDate}
                                        onChange={(e) =>
                                            setExamDate(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-primary text-primary rounded-full px-4 py-2 outline-none"
                                    />

                                    <input
                                        type="text"
                                        value={examTime}
                                        onChange={(e) =>
                                            setExamTime(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Exam Time"
                                        className="w-full border border-primary text-primary rounded-full px-4 py-2 outline-none"
                                    />

                                    <input
                                        type="text"
                                        value={examRoom}
                                        onChange={(e) =>
                                            setExamRoom(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Room Number"
                                        className="w-full border border-primary text-primary rounded-full px-4 py-2 outline-none"
                                    />

                                    <button
                                        onClick={handleAddExam}
                                        className="mt-2 bg-primary text-white px-4 py-2 border-2 border-primary rounded-full hover:bg-transparent hover:text-primary hover:scale-[1.02] transition-all duration-200"
                                    >
                                        {examLoading ? "Saving..." : "Save Exam"}
                                    </button>

                                </div>
                            )
                        }

                        <div className="mt-4 space-y-4">
                            {
                                filteredDatesheet.length > 0 ? (
                                    filteredDatesheet
                                        .slice(0, 4)
                                        .map((exam) => (
                                            <div key={exam._id}>
                                                <div className="text-sm font-medium text-textMain">
                                                    {exam.subject}
                                                </div>
                                                <div className="text-xs text-textMuted">
                                                    {
                                                        new Date(
                                                            exam.date
                                                        ).toLocaleDateString()
                                                    }
                                                    {" · "}
                                                    {exam.time}
                                                    {" · "}
                                                    {exam.room}
                                                </div>
                                                <div className="text-xs text-primary mt-1">
                                                    {exam.examType}
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-sm text-textMuted">
                                        No upcoming exams.
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}