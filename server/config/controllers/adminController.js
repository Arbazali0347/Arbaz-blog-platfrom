import jwt from "jsonwebtoken"
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

// ______Login____________

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// All Blogs show in admin 
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// ___________Comments Show approve delete________________

// Show all comments in the admin
export const getAllComment = async (req, res) => {
    try {
        const comment = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
        res.json({ success: true, comment })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
// Delete Comment from admin
export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id)
        res.json({ success: true, message: "Commnet deleted successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// approve Comment from admin
export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true })
        res.json({ success: true, message: "Commnet approved successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// _______________Dashboard All data show_________________

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comment = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            blogs, comment, drafts, recentBlogs
        }
        res.json({ success: true, dashboardData })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}