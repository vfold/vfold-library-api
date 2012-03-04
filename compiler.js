var pathUglify = "./node_modules/uglify-js/uglify-js",
    /*****************************
     * File System
     *****************************/
    fs = require("fs"),
    jsp = require(pathUglify).parser,
    pro = require(pathUglify).uglify,
    files, stats, pathTemp, countFile = 0,
    /********************************************
     * javascript Code
     * Original Merged -> Abstract Syntax Tree
     ********************************************/
    code = "",
        /*********************************
     * Add Main class at end
     **********************************/
    pathMain = process.ARGV[2],
    /*********************************
     * read all files from src folder
     * specified in given arguments
     **********************************/
    pathSource = process.ARGV[3],
    /*********************************
     * Output path for compiled data
     **********************************/
    pathOutput = process.ARGV[4],
    /*********************************
     * Enable debug mode
     **********************************/
    debug = process.ARGV[5] == "debug" ? true : false;

/****************************************
 * Loop through the source folder and 
 * obtain the js files for compilation
 ****************************************/

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
            else{
                addFile(pathTemp);
            }
        }
        catch (e) {
            console.log(pathTemp + ": " + e);
        }
    });
}

/********************************************
 * Append .js file to the output code
 ********************************************/

addFile(pathMain);

function addFile(path){
   if (stats.isFile() && (path.indexOf(".js") != -1)) {
                countFile++;
                if (debug) {
                    code += "\n /***************************************************** \n  * File path: " + path + " \n  *****************************************************/ \n";
                }
                code += fs.readFileSync(path);
            }
}

if (!debug) {

    /********************************************
     * 1. Parse code and get the initial AST
     * 2. Get a new AST with mangled names
     * 3. Get an AST with compression optimizations
     ********************************************/

    code = pro.gen_code(
    pro.ast_squeeze(
    pro.ast_mangle(
    jsp.parse(code))));
}

/********************************************
 * Output path for compiled build
 ********************************************/

fs.writeFileSync(pathOutput, code);
console.log("----------------------------------- \n" + "Compiled " + countFile + " files \n" + "Output size: " + parseInt(fs.lstatSync(pathOutput).size / 1024) + "KB \n" + "-----------------------------------");