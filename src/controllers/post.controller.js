const postModel = require('../models/post.model');
const generateCaption = require('../services/ai.service');

async function createPostController(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("file:", file);

        const base64Image = Buffer.from(file.buffer).toString("base64");

        const caption = await generateCaption(base64Image);

        console.log("generate caption:", caption);

        const newPost = await postModel.create({
            image: file.originalname,
            caption: caption,
            user: req.user._id, 
        });

        return res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    } catch (err) {
        console.error("Error in createPostController:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports = createPostController;
