const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (err) { res.status(400).json({ error: err.message }); } 
});

router.get('/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: "Не найден" });
        res.json(blog);
    } catch (err) { res.status(500).json({ error: "Ошибка БД" }); }
});

router.put('/blogs/:id', async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
});

router.delete('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Удалено" });
});

module.exports = router;