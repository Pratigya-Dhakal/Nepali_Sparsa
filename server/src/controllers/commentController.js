import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add a new comment
export const addComment = async (req, res) => {
    try {
        const { productId, userId, content } = req.body;
        const comment = await prisma.comment.create({
            data: {
                productId,
                userId,
                content
            }
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error adding comment' });
    }
};

// Get comments for a product
export const getComments = async (req, res) => {
    try {
        const { productId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { productId },
            include: { user: true, replies: true }
        });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments' });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const comment = await prisma.comment.update({
            where: { id },
            data: { content }
        });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error updating comment' });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.comment.delete({
            where: { id }
        });
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting comment' });
    }
};

// Add a reply to a comment
export const addReply = async (req, res) => {
    try {
        const { commentId, userId, content } = req.body;
        const reply = await prisma.reply.create({
            data: {
                commentId,
                userId,
                content
            }
        });
        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ error: 'Error adding reply' });
    }
};

// Get replies for a comment
export const getReplies = async (req, res) => {
    try {
        const { commentId } = req.params;
        const replies = await prisma.reply.findMany({
            where: { commentId },
            include: { user: true }
        });
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching replies' });
    }
};

// Update a reply
export const updateReply = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const reply = await prisma.reply.update({
            where: { id },
            data: { content }
        });
        res.status(200).json(reply);
    } catch (error) {
        res.status(500).json({ error: 'Error updating reply' });
    }
};

// Delete a reply
export const deleteReply = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.reply.delete({
            where: { id }
        });
        res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting reply' });
    }
};
