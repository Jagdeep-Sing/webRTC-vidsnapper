//Global vars
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM Elements
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photos = document.getElementById("photos");
const photoButton = document.getElementById("photo-button");
const clearButton = document.getElementById("clear-button");
const photoFilte = document.getElementById("photo-filter");

// Get media stream

navigator.mediaDevices.getUserMedia({
    video: true, audio: false
})
    .then(function (stream) {
        //Link to the video source
        video.srcObject = stream;
        //play video
        video.play();
    })
    .catch(function (err) {
        cosole.log(`Error: ${err}`);
    });

//play when ready
video.addEventListener('canplay', function (e) {
    //Set video / canvas height
    height = video.videoHeight / (video.videoWidth / width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    streaming = true;

}, false);

photoButton.addEventListener('click', function (e) {
    takePicture();

    e.preventDefault();
}, false);

function takePicture() {
    //Create canvas
    const context = canvas.getContext('2d');
    if (width && height) {
        //set canvas props
        canvas.width = width;
        canvas.height = height;
        //Draw an image of the video on the canvas
        context.drawImage(video, 0, 0, width, height);

        //Create imge from canvas
        const imgurl = canvas.toDataURL("image/png");

        //Create img element
        const img = document.createElement('img');

        //Set img src
        img.setAttribute('src', imgurl);

        //Add image to photos
        photos.appendChild(img)

    }
}