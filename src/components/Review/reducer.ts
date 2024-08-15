import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    reviews: [],
    currentReview: null
};
const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },

        setCurrentReview: (state, action) => {
            state.currentReview = action.payload;
        },

        addReview: (state, {payload: review }) => {
            const newReview: any = {
                _id: new Date().getTime().toString(),
                content_type: review.content_type,
                content_id: review.content_id,
                reviewer_id: review.reviewer_id,
                reviewer_name: review.reviewer_name,
                review_text: review.review_text,
                rating: review.rating,
                date: review.date,
                comment: review.replys 
            };
            state.reviews = [...state.reviews, newReview] as any;
        },

        deleteReview: (state, {payload: reviewId}) => {
            state.reviews = state.reviews.filter(
                (r: any) => r._id !== reviewId
            ); 
        },

        updateReview: (state, { payload: review }) => {
            state.reviews = state.reviews.map((r:any) => 
                r._id === review._id ? review : r
            ) as any;
        },

        editReview: (state, { payload: reviewId }) => {
            state.reviews = state.reviews.map((r: any) => 
                r._id = reviewId ? { ...r, editing: true} : r
            ) as any;
        },
    },
});

export const { addReview, deleteReview, updateReview, editReview, setReviews, setCurrentReview } =
    reviewsSlice.actions;
export default reviewsSlice.reducer;