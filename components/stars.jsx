"use client";
import React from 'react';

const Stars = ({ count, big, className }) => {
  const totalStars = 5;
  const filledStars = Math.min(count, totalStars); // Ensures the count does not exceed 5

  return (
    <div className={`flex justify-center items-center ${big ? 'gap-1' : 'gap-0.5'} ${className}`}>
      {Array.from({ length: totalStars }, (v, i) => (
        <span key={i}>
          {i < filledStars ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffb731"
              stroke="#ffb731"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${big ? 'w-7 h-7 drop-shadow-lg' : 'w-5 h-5'}`}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${big ? 'w-7 h-7 drop-shadow-lg' : 'w-5 h-5'}`}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
};

export default Stars;
