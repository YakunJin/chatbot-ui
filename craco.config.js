const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');
const path = require("path");

module.exports = {
    webpack: {
        plugins: {
            alias: {
                "@": path.join(__dirname, "src"),
            },
            add: [
                new WindiCSSWebpackPlugin({
                    virtualModulePath: 'src',
                }),
            ],
        },
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        client: {
            overlay: false,
        },
        // inline: true,
        // historyApiFallback: true,
        proxy: {
            '/aj' : {
                target: 'http://localhost:3003',
                changeOrigin: true,
                secure: false,
                xfwd: false,
            }
        }
    }
}