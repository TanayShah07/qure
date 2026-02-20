const {spawn}= require("child_process");
const { resolve } = require("path/posix");

function runPython( scriptPath, args =[]) {
    return new Promise((resolve,reject)=>{
        const process= spawn("py", [scriptPath,...args]);

        let result="";

        process.stdout.on("data", (data)=>{
            result+=data.toString();
        });

        process.stderr.on("data", (error)=>{
            reject(error.toString());
        });

        process.on("close", ()=>{
            resolve(result.trim());
        });
    });
}

module.exports=runPython;