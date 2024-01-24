const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/app.js", // Your main entry point
    output: {
        filename: "app.js", // Output bundle file
        path: path.resolve(__dirname, "dist"), // Output folder
        clean: true, // Clean the output folder before build
    },
    module: {
        rules: [
            {
                test: /\.js$/, // For JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"], // Transpile ES6 to ES5
                    },
                },
            },
            {
                test: /\.css$/, // For CSS files
                use: ["style-loader", "css-loader"], // Process CSS files
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // Your HTML file
        }),
    ],
    mode: "development", // Set the mode to development
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"), // The folder to serve
        },
        compress: true, // Enable gzip compression
        port: 3000, // The port on which the server will be running
        open: true, // Open the browser after the server has been started
    },
};
