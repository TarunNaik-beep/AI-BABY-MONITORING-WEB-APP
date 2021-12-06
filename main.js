img = "";
myStatus = "";
objects = [];


function preload() {
    
    sound = loadSound("mixkit-facility-alarm-908.wav");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
}

function draw() {
    image(video,0,0,380,380);
    if(myStatus!="") {
        
        object_detector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: baby detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person") {
                document.getElementById("status").innerHTML = "Baby Found";
                sound.stop();
            }
            else {
                document.getElementById("status").innerHTML = "Baby not Found";
                sound.play();
            }
            if(objects.length==0) {
                document.getElementById("status").innerHTML = "Baby not Found";
                sound.play();
            }
        }
    }
}

function modelLoaded() {
    console.log(modelLoaded);
    myStatus = true;
    object_detector.detect(video,gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results
    }
}