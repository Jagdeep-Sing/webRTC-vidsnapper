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
const photoFilter = document.getElementById("photo-filter");

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

//PHOTO BUTTON EVENT
photoButton.addEventListener('click', function (e) {
    takePicture();

    e.preventDefault();
}, false);

//FILTER EVENT
photoFilter.addEventListener('change', function (e) {
    //set filter to chosen option
    filter = e.target.value;
    //set filter to video
    video.style.filter = filter;
    e.preventDefault();
}, false);

//Clear event
clearButton.addEventListener('click', function (e) {
    //clear photos
    photos.innerHTML = '';
    //change filter back to none
    filter = 'none';
    //set video filter
    video.style.filter = filter;
    //reset select list
    photoFilter.selectedIndex = 0;

})

//TAKE PICTURE 
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

        //Set image filter
        img.style.filter = filter;

        //Add image to photos
        photos.appendChild(img)

    }
}