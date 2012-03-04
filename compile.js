var pathUglify = "./node_modules/uglify-js/uglify-js",
    /*****************************
     * File System
     *****************************/
    fs = require("fs"),
    jsp = require(pathUglify).parser,
    pro = require(pathUglify).uglify,
    files, stats, pathTemp,
    /*********************************
     * Abstract Syntax Tree
     **********************************/
    ast,
    /*********************************
     * read all files from src folder
     * specified in given arguments
     **********************************/
    pathSource = process.ARGV[2],
    pathOutput = process.ARGV[3],
    /*****************************
     * Merged Uncompressed code 
     *****************************/
    orig_code = "";

readDir(pathSource);

function readDir(path) {

    files = fs.readdirSync(path);
    files.forEach(function(file) {
        pathTemp = path + "/" + file;
        try {
            stats = fs.lstatSync(pathTemp);
            if (stats.isDirectory()) {
                readDir(pathTemp);
            }
            else if(stats.isFile()&&(file.indexOf(".js") !=-1)){
                console.log(file);
                orig_code += fs.readFileSync(pathTemp);
            }
        }
        catch (e) {
            console.log(pathTemp + ": " + e);
        }
    });
}

/********************************************
 * 1. Parse code and get the initial AST
 * 2. Get a new AST with mangled names
 * 3. Get an AST with compression optimizations
 ********************************************/

ast = pro.ast_squeeze(
pro.ast_mangle(
jsp.parse(orig_code.toString())));

/********************************************
 * Output path for compiled build
 ********************************************/

fs.writeFileSync(pathOutput,pro.gen_code(ast));