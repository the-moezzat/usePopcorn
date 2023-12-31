import { useState } from 'react';

interface IStarRating {
  maxRating: number;
  size: number;
  color?: string;
  defaultRating?: number;
  className?: string;
  messages?: string[];
  onSetRating?: (rate: number) => void;
}

export default function StarRating({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  messages = [],
  className = '',
  defaultRating = 0,
  onSetRating,
}: IStarRating) {
  const [rate, setRate] = useState(defaultRating);
  const [tempRate, setTempRate] = useState(0);

  function handleRating(rate: number) {
    setRate(rate);
    onSetRating && onSetRating(rate);
  }

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
      className={className}
    >
      <div style={{ display: 'flex' }}>
        {Array.from({ length: maxRating }, (_, i: number) => (
          <Star
            full={tempRate ? tempRate >= i + 1 : rate >= i + 1}
            onRate={() => handleRating(i + 1)}
            onMouseEnter={() => setTempRate(i + 1)}
            onMouseLeave={() => setTempRate(0)}
            color={color}
            size={size}
            key={i}
          />
        ))}
      </div>
      <p
        style={{ lineHeight: 1, margin: 0, color, fontSize: `${size / 1.5}px` }}
      >
        {messages.length === maxRating
          ? messages[tempRate ? tempRate - 1 : rate - 1]
          : tempRate || rate || ''}
      </p>
    </div>
  );
}

interface IStar {
  size: number;
  color: string;
  full: boolean;
  onRate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function Star({
  full,
  onRate,
  onMouseEnter,
  onMouseLeave,
  color,
  size,
}: IStar) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: 'pointer',
  };

  return (
    <span
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
