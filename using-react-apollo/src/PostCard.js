import React from 'react';

// Helper function for formatting dates.
const formatDate = date => new Date( date ).toDateString();

const PostCard = ({post}) => {
  const { postId, title, date, author, featuredImage } = post;
  const { name: authorName } = author;

  return (
    <div key={postId} className="post-card">
    { featuredImage && // If a featured image exists, display it.
      <img src={featuredImage.imageUrl} alt={featuredImage.altText} className="post-card__image" />
    }
      <h3 className="post-card__heading">{title}</h3>
      <span className="post-card__detail">
        <span className="post-card__label">Date:</span> {formatDate(date)}
      </span>
      <span className="post-card__detail">
        <span className="post-card__label">Author:</span> {authorName}
      </span>
    </div>
  );
};

export default PostCard;
