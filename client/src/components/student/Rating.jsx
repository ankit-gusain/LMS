import { useEffect, useState } from "react";

const Rating = ({ initialRating, onRate }) => {

    const [rating, setRating] = useState(initialRating || 0);

    const handleRating = (value) => {
        setRating(value);
        if (onRate) onRate(value);
    };

    useEffect(() => {
        setRating(initialRating || 0);
    }, [initialRating]);

    return (
        <div>
            {Array.from({ length: 5 }).map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={index}
                        onClick={() => handleRating(starValue)}
                        className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
};

export default Rating;
