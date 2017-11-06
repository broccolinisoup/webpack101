// webpack.config.js
const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const inProduction = (process.env.NODE_ENV === 'production');


module.exports = {
    // Entry points for your project.
    entry: {
        bundle : [path.join(__dirname, 'src', 'main.js'), path.join(__dirname, 'src', 'main.scss')],
    },
    // The bundle will be extracted in the output path
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            // Compile your scss/sass file into a css bundle file.
            {
                test: /\.s[ac]ss$/,
                loader: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader', // Any problem on extracting, embed the css into bundle.js
                        use: ['css-loader', 'sass-loader'],
                    })
            },
            {
                test: /\.(png|je?pg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options:
                    {
                        name: '[name].[ext]'
                    }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        //Extract the css file as the entry point name - bundle.css
        new ExtractTextPlugin("[name].css"),

        // This plugin removes the unused css classes from the css bundle
        // Note: It's working very well. It regards the normal html strings as a css class
        // And keep this in the css bundle. It also preclude the `LoaderOptionsPlugin`
        // from working on minimizing css
        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, 'index.html')),
        //     minimize:inProduction
        // }),

        //
        new webpack.LoaderOptionsPlugin({
            minimize:inProduction
        }),

        //Clean the dist folder before a new build
        new CleanWebpackPlugin('dist/*')
    ]
};

// JS Minimisation plugin
if(inProduction){
    module.exports.plugins.push(
        new webpack.optimise.UglifyJSPlugin()
    );
}
