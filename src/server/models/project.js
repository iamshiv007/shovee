import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    projects: [
        {
            projectName: {
                type: String,
                required: true
            },
            liveUrl: {
                type: String,
            },
            githubUrl: {
                type: String,
            },
            techs: {
                type: Array,
            },
            projectImage: {
                imageUrl: {
                    type: String
                },
                publicId: {
                    type: String
                }
            }
        }
    ],

}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
