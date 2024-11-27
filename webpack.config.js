const path = require('path');

module.exports = {
    mode: 'development', // or 'production' depending on your environment
    entry: './src/index.js', // Adjust based on your entry file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs'),
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader',
                type: 'javascript/auto' // Necessary for Webpack 4 and later
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            // Other rules (e.g., for CSS, etc.)
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    // Other Webpack configurations (e.g., plugins)
};
