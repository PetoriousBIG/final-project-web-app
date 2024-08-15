import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeDetails, getComments, addComment, addReply, getCurrentUser } from '../client';
import './style.css';

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [recipeData, commentsData, userData] = await Promise.all([
          getRecipeDetails(id),
          getComments(id),
          getCurrentUser()
        ]);
        setRecipe(recipeData);
        setComments(commentsData);
        setCurrentUser(userData);
      } catch (err) {
        setError(err.message || 'An error occurred while loading data');
        console.error('Error in fetchData:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError(null);
    if (!currentUser || currentUser.role.toLowerCase().trim() !== 'user') {      
      setCommentError('Only logged-in users can post comments');
      return;
    }
    if (!newComment.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }
    try {
      let newCommentData;
      if (replyingTo) {
        newCommentData = await addReply(id, replyingTo, newComment);
      } else {
        newCommentData = await addComment(id, newComment);
      }
      if (newCommentData) {
        setComments(prevComments => {
          if (replyingTo) {
            return prevComments.map(comment => 
              comment._id === replyingTo 
                ? { ...comment, replies: [...(comment.replies || []), newCommentData] }
                : comment
            );
          } else {
            return [newCommentData, ...prevComments];
          }
        });
        setNewComment('');
        setReplyingTo(null);
      } else {
        setCommentError('Failed to post comment: No data returned');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
      setCommentError(`Failed to post comment: ${err.message || 'Unknown error'}`);
    }
  };

  const renderComment = (comment, isReply = false) => (
    <div key={comment._id} className={`comment mb-3 p-3 border rounded bg-dark text-white ${isReply ? 'ml-3 smaller-reply-box' : ''}`}>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-start">
        <div className="mr-2 flex-shrink-0">
            <Link to={`/profile/${comment.userId}`} className="text-decoration-none">
              <div className="profile-picture mb-2">
                <div className="bg-secondary rounded-circle text-white" style={{width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  {comment.userName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="username font-weight-bold text-center text-white">{comment.userName}</div>
            </Link>
          </div>
          <div className="flex-grow-1">
            <div className="p-4 text-white comment-box" style={{wordWrap: 'break-word'}}>
              <p className="comment-text mb-1">{comment.comment}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-white-50">
            {new Date(comment.createdAt).toLocaleString()}
          </small>
          {!isReply && (
            <button 
              onClick={() => setReplyingTo(comment._id)} 
              className="btn btn-sm btn-light text-dark mb-2"
            >
              Reply
            </button>
          )}
        </div>
      </div>
      {replyingTo === comment._id && (
        <div className="mt-3">
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <textarea
                className="form-control bg-dark text-white"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a reply..."
                rows="2"
              />
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button type="submit" className="btn btn-primary btn-sm mr-2">
                Post Reply
              </button>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {comment.replies && (
        <div className="replies-container mt-2">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;
  return (
    <div className="recipe-detail bg-black text-white min-vh-100">
      <div className="container pt-5 mt-5">
        <h1 className="mb-4 text-center">{recipe.label}</h1>
        {recipe.image && (
          <div className="text-center mb-4">
            <img src={recipe.image} alt={recipe.label} className="img-fluid rounded" style={{maxHeight: '400px'}} />
          </div>
        )}
        <p className="text-center text-white-50">Source: {recipe.source}</p>
        <div className="card bg-dark mt-4">
          <div className="card-body">
            <h3 className="card-title text-white">Ingredients:</h3>
            <ul className="list-group list-group-flush bg-dark">
              {recipe.ingredientLines && recipe.ingredientLines.map((ingredient, index) => (
                <li key={index} className="list-group-item bg-dark text-white">{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        {recipe.url && (
          <div className="text-center mt-4">
            <a href={recipe.url} className="btn btn-outline-light" target="_blank" rel="noopener noreferrer">
              View Full Recipe
            </a>
          </div>
        )}

      {/* Comments Section */}
      <div className="card bg-dark mt-4">
        <div className="card-body">
          <h2 className="card-title text-white">Comments:</h2>
          {currentUser && currentUser.role.toLowerCase() === 'user' && (
            <>
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <div className="form-group">
                  <textarea
                    className="form-control bg-dark text-white"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows="3"
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  Post Comment
                </button>
              </form>
              {commentError && <p className="text-danger">{commentError}</p>}
            </>
          )}
          {!currentUser && <p className='text-white-50'>Please log in to post comments.</p>}
          {currentUser && currentUser.role.toLowerCase() !== 'user' && (
            <p className='text-white-50'>Only users can post comments.</p>
          )}
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map(comment => renderComment(comment))
          ) : (
            <p className="text-white">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default RecipeDetail;