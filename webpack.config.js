const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');


const path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

const PATHS = {
    app: path.resolve(__dirname, 'app'),
    build: path.resolve(__dirname, 'build')
};

const common = {
    // Entry accepts a path or an object of entries. We'll be using the
    // latter form given it's convenient with more complex configurations.
    entry: {
        vendors: [
            'react',
            'react-dom',
            'node-uuid'
        ],
        app: PATHS.app
    },
    resolveLoader: {
        root: nodeModulesPath
    },
    resolve: {
        extensions: ['', '.tsx', '.webpack.js', '.web.js', '.ts', '.js'],
        modulesDirectories: ["node_modules", "resources"],
        alias: {
            'node-uuid': path.join(nodeModulesPath, 'node-uuid', 'uuid.js'),
            'react': path.join(nodeModulesPath, 'react', 'react.js'),
            'react-dom': path.join(nodeModulesPath, 'react-dom', 'dist', 'react-dom.js'),
        },
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};

var config = {};
// Default configuration
if (TARGET === 'start' || !TARGET) {
    config = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            //
            // If you use Vagrant or Cloud9, set
            // host: process.env.HOST || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices unlike default
            // localhost
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
                save: true // --save
            })
        ]
    });
}

if (TARGET === 'build') {
    config = merge(common, {});
}

module.exports = config;
