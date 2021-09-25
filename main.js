song1 = "";
song2 = "";
left_score = 0;
right_score = 0;
right_x = 0;
right_y = 0;
left_x = 0;
left_y = 0;

function preload() {
    song1 = loadSound("Take Me Away.mp3");
    song2 = loadSound("Freefalling.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    model = ml5.poseNet(video, loded);
    model.on("pose", getresult);
}

function loded() {
    console.log("-_-");
}

function getresult(arry) {
    if (arry.length > 0) {
        //console.log(arry);//
        left_x = arry[0].pose.leftWrist.x;
        left_y = arry[0].pose.leftWrist.y;
        right_x = arry[0].pose.rightWrist.x;
        right_y = arry[0].pose.rightWrist.y;

        left_score = arry[0].pose.keypoints[9].score;
        right_score = arry[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill(255, 0, 0);
    stroke(255, 0, 0);
}

function stop(){
    song1.stop();
    song2.stop();
}

function play(){
    if (right_y > left_y) {
        song1.play();
        song2.stop();
        song1.volume(0.7);
    }
    else{
        song2.play();
        song1.stop();
        song2.volume(0.7);
    }
}