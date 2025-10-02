import React from 'react';

const Loading = () => {
    return (
        <div style={styles.container}>
            <div className="loading-spinner" style={styles.loader}></div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    loader: {
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
    },
};

// Add global CSS for spinner animation
if (typeof window !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .loading-spinner { animation: spin 0.5s linear infinite; }
    `;
    document.head.appendChild(style);
}

export default Loading;