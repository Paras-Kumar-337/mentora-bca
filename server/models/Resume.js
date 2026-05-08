import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        fullName: {
            type: String,
            default: "",
        },

        headline: {
            type: String,
            default: "",
        },

        summary: {
            type: String,
            default: "",
        },

        skills: {
            type: [String],
            default: [],
        },

        education: [
            {
                institution: String,
                degree: String,
                year: String,
                cgpa: String,
            },
        ],

        projects: [
            {
                title: String,
                description: String,
                techStack: [String],
                link: String,
            },
        ],

        experience: [
            {
                company: String,
                role: String,
                duration: String,
                description: String,
            },
        ],

        certifications: [
            {
                title: String,
                issuer: String,
                year: String,
            },
        ],

        achievements: {
            type: [String],
            default: [],
        },

        links: {
            github: {
                type: String,
                default: "",
            },

            linkedin: {
                type: String,
                default: "",
            },

            portfolio: {
                type: String,
                default: "",
            },
        },

        template: {
            type: String,
            default: "modern",
        },
    },

    {
        timestamps: true,
    }
);

const Resume = mongoose.model(
    "Resume",
    resumeSchema
);

export default Resume;