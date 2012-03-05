var pathUglify = "./node_modules/uglify-js/uglify-js",
    /*****************************
     * File System
     *****************************/
    fs = require("fs"),
    jsp = require(pathUglify).parser,
    pro = require(pathUglify).uglify,
    path, files, stats, countFile = 0,
    /********************************************
     * javascript Code
     * Original Merged -> Abstract Syntax Tree
     ********************************************/
    code = "", codeShader = commentBlock("WebGL Shaders") + "\n var Shader;",
    /*********************************
     * Add Main class at end
     **********************************/
    classMain = process.ARGV[2] + ".js",
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

function readDir(dir){
    files = fs.readdirSync(dir);
    files.forEach(function(file) {
        path = dir+"/"+file;
        try {
            stats = fs.lstatSync(path);
            if (stats.isDirectory()) {
                readDir(path);
            }
            else if (stats.isFile()){
                addFile(file);
            }
        }
        catch (e) {
            console.log(path + ": " + e);
        }
    });
}

/********************************************
 * Append .js file to the output code
 ********************************************/

path = "./"+classMain;
addFile(classMain);

function addFile(filename) {
     var comment = "";   
        if (debug) {
            comment = commentBlock("File path: " + path);
        }
        if (filename.indexOf(".js") != -1) {
            code += comment + fs.readFileSync(path);
        }
        else if (filename.indexOf(".shader") != -1) {
            codeShader += comment;
            //codeShader += "\n Shader." + filename.split(".")[1] + '"' + pro.gen_code(jsp.parse(fs.readFileSync(path))) + '"';
    }
    countFile++;
}

code+=codeShader;

/**************************************************
 * Comment out anything necessary upon compilation
 **************************************************/

function commentBlock(comment) {

    return "\n /***************************************************** \n  * " + comment + " \n  *****************************************************/ \n"
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