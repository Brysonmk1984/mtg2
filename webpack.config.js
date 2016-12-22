module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: __dirname + "/dist/",

        publicPath: '/dist/',

        filename: "js/app.bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a valid name to reference 
            query: {
                presets: ['es2015', 'react']
            }
        },
        /*,{ 
            test: /\.css$/,
            loader: "style-loader!css-loader" 
                
        },*/
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    }
};

