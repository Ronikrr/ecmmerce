import React from 'react';

function NotFound() {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
            color: '#333',
            fontFamily: '"Helvetica Neue", sans-serif',
            padding: '0 20px',
        },
        heading: {
            fontSize: '6rem',
            margin: '0',
            fontWeight: 'bold',
            color: '#ff6b6b',
        },
        message: {
            fontSize: '1.5rem',
            margin: '20px 0',
            maxWidth: '600px',
        },
        link: {
            fontSize: '1.2rem',
            color: '#007bff',
            textDecoration: 'none',
            marginTop: '20px',
            borderBottom: '2px solid transparent',
        },
        linkHover: {
            borderBottom: '2px solid #007bff',
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404</h1>
            <p style={styles.message}>
                Oops! The page you're looking for doesn't exist. It might have been removed or the URL may be incorrect.
            </p>
            <a href="/" style={styles.link}>Go Back to Home</a>
        </div>
    );
}

export default NotFound;
