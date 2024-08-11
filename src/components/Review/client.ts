import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const REVIEWS_API = `${REMOTE_SERVER}/api/reviews`

export const fetchAllReviews = async () => {
    const response = await axios.get(`${REVIEWS_API}`);
    return response.data;
}

export const fetchAllReviewsForContent = async( contentType: string, contentId: string) => {
    const response = await axios.get(`${REVIEWS_API}`, {
        params: {
            content_type: contentType,
            content_id: contentId
        }
    })
    return response.data;
}

export const deleteReview = async (reviewId: string) => {
    const response = await axios.delete(`${REVIEWS_API}/${reviewId}`);
    return response.data;
}

export const createReview = async (review: any) => {
    const response = await axios.post(`${REVIEWS_API}`, review);
    return response.data;
}

export const updateReview = async (review: any) => {
    const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
    return response.data;
}