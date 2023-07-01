import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import StarRating from './components/StarRating.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} />
    <StarRating maxRating={10} color="#ff8622" />
    <StarRating
      maxRating={4}
      color="#8e6fa1"
      size={24}
      messages={['Bad', 'Fair', 'Good', 'Amazing']}
    /> */}
  </React.StrictMode>
);
