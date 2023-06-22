batman_theme="";
harry_potter_theme="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_batman = "";
song_harry_potter = "";

function setup()
{
  canvas=createCanvas(500,500);
  canvas.center();

  video= createCapture(VIDEO);
  video.hide();

  poseNet=ml5.poseNet(video, modelLoaded);
  poseNet.on('pose',gotPoses);
}


function preload()
{
    batman_theme = loadSound("batman_theme.mp3");
    harry_potter_theme = loadSound("harry_potter_theme.mp3");
}

function draw()
{
    image(video,0,0,500,500);

    fill("#00ff00");
    stroke("#ff0000");

    song_batman = batman_theme.isPlaying();
    console.log(song_batman);

    song_harry_potter = harry_potter_theme.isPlaying();
    console.log(song_harry_potter);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        harry_potter_theme.stop();
        if(song_batman == false){
            batman_theme.play();
            document.getElementById("song_id").innerHTML = "Song Name: Batman Theme";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        batman_theme.stop();
        if(song_harry_potter == false){
            harry_potter_theme.play();
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
        
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}