import React, { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  
  const codeSnippets = [
    'Initializing systems...',
    'Loading dependencies...',
    'Compiling shaders...',
    'Rendering scene...',
    'Ready!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textIndex = Math.min(Math.floor(progress / 20), codeSnippets.length - 1);
    setLoadingText(codeSnippets[textIndex]);
  }, [progress]);

  return (
    <div className="loader">
      <div className="loader-content">
        <div className="loader-logo">
          <div className="loader-box">
            <div className="box-face front"></div>
            <div className="box-face back"></div>
            <div className="box-face right"></div>
            <div className="box-face left"></div>
            <div className="box-face top"></div>
            <div className="box-face bottom"></div>
          </div>
        </div>
        
        <div className="loader-text">
          <span className="bracket">{'{'}</span>
          <span className="loading-message">{loadingText}</span>
          <span className="bracket">{'}'}</span>
        </div>
        
        <div className="loader-bar">
          <div className="loader-progress" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="loader-percentage">{progress}%</div>
      </div>
      
      <div className="loader-grid">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="grid-cell" style={{
            animationDelay: `${Math.random() * 2}s`
          }}></div>
        ))}
      </div>
    </div>
  );
}