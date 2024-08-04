import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new review
export const createReview = async (req, res) => {
const { rating, comment, productId, userId } = req.body;

try {
    const review = await prisma.review.create({
    data: {
        rating,
        comment,
        product: { connect: { id: productId } },
        user: { connect: { id: userId } },
    },
    });
    res.status(201).json(review);
} catch (error) {
    res.status(500).json({ error: 'Error creating review' });
}
};

// Get all reviews for a product
export const getReviewsByProduct = async (req, res) => {
const { productId } = req.params;

try {
    const reviews = await prisma.review.findMany({
    where: { productId },
    include: { user: true },
    });
    res.status(200).json(reviews);
} catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
}
};

// Update a review
export const updateReview = async (req, res) => {
const { id } = req.params;
const { rating, comment } = req.body;

try {
    const review = await prisma.review.update({
    where: { id },
    data: { rating, comment },
    });
    res.status(200).json(review);
} catch (error) {
    res.status(500).json({ error: 'Error updating review' });
}
};

// Delete a review
export const deleteReview = async (req, res) => {
const { id } = req.params;

try {
    await prisma.review.delete({
    where: { id },
    });
    res.status(200).json({ message: 'Review deleted' });
} catch (error) {
    res.status(500).json({ error: 'Error deleting review' });
}
};
