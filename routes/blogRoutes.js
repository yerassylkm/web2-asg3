const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.post('/blogs', async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body || title.trim() === "" || body.trim() === "") {
            return res.status(400).json({ error: "Title and Body are required!" });
        }
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/blogs', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id); 
        if (!blog) {
            return res.status(404).json({ error: "Пост с таким ID не найден" });
        }
        res.json(blog); 
    } catch (err) {
        res.status(500).json({ error: "Ошибка сервера или неверный формат ID" });
    }
});

router.put('/blogs/:id', async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({ error: "Fields cannot be empty" });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});

router.delete('/blogs/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});

module.exports = router;