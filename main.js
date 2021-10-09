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
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill(255, 0, 0);
    stroke(255, 0, 0);
    if(left_score > 0.2){
        circle(left_x, left_y, 20);
        song2.stop();
        if (song1Status == false){
            song1.play();
        }
    }
    if(right_score > 0.2){
        circle(right_x, right_y, 20);
        song1.stop();
        if (song2Status == false){
            song2.play();
        }
    }
}

function stop(){
    song1.stop();
    song2.stop();
}

function play(){
        song2.stop();
        song1.play();
        song1.volume(0.7);
    }