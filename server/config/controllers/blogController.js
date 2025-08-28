import fs from "fs"
import imagekit from "../imagekit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../Gemini.js";


export const addBlog = async (req, res) =>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }
        // Upload the Image to Imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })
        // optimimization through imagekit URL transfromation
        const optimimizedUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality: "auto"},
                {format: "webp"},
                {width: "1280"}
            ]
        })

        const image = optimimizedUrl;

        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({success: true, message: "Blog added successfully"})
    } catch (error) {
        res.json({success: false, message: error.message  + "This line2"})
    }
}

export const getAllBlogs = async (req, res)=>{
    try {
        const blogs =  await Blog.find({isPublished: true})
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogsById = async (req, res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message: "Blog not found"})
        }
        res.json({success: true, blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
export const deleteBlogsById = async (req, res)=>{
    try {
        const {Id} = req.body;
        const blog = await Blog.findByIdAndDelete(Id)

        // Delete all commnets associated with the blog
        await Comment.deleteMany({blog: Id});

        res.json({success: true, message: "Blog deleted succussfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const togglePublish = async (req, res)=>{
    try {
        const {Id} = req.body;
        const blog = await Blog.findById(Id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog status updated"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async (req, res)=>{
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: "Comment added for review"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
export const getBlogComment = async (req, res)=>{
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async (req, res)=>{
    try {
        const {prompt} = req.body;
        const content = await main(prompt + " Generate a blog content for this topic in simple text format");
        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}