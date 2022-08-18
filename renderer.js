const {ipcRenderer}=require('electron')

function start() {
    console.log("sll-----start")
    ipcRenderer.send("start")
}

function stop() {
    
}

ipcRenderer.on("getSources", (_, sources) => {
    console.log("sll------render-sources = ", sources)
    for (let i=0;i<sources.length;++i) {
        if (sources[i].name==="electron-test") {
            console.log('begin share ', sources[i])
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: sources[i].id,
                        minWidth: 2000,
                        maxWidth: 2000,
                    }
                }
            }).then(stream => {
                const video=document.getElementsByTagName('video')[0]
                video.srcObject=stream;
            })
            break
        }
    }
})

// var child = require('child_process').execFile;
// var executablePath = "C:\\Windows\\System32\\DisplaySwitch.exe";
// var extend = ["/extend"];
// var clone = ["/clone"];

// var test = 0
// var parameters = extend

// const createDesktopShare=async () => {
//     if (test == 0) {
//         parameters = extend
//         test = 1
//     } else {
//         parameters = clone
//         test = 0
//     }
//     child(executablePath, parameters, function(err, data) {
//         if(err){
//            console.error(err);
//            return;
//         }
     
//         console.log(data.toString());
//     });
// }