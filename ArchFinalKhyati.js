let images = [

  "Images/image1.jpg",
  "Images/image2.jpg",
  "Images/image3.jpg",
  "Images/image4.jpg",
  "Images/image7.jpg",
  "Images/image8.jpg",
  "Images/image9.jpg",
  "Images/image10.jpg",
  "Images/image11.jpg",
  "Images/image12.jpg",
];

////////////////////////////////////////////////////////////////////////////


// Let's create graphemescope object inside the container

let container = $("#container");
let scope = new Graphemescope( container[0] );


let index = 0;
function changePicture() {
    scope.setImage(images[index]);
    index = (index + 1) % images.length;
};

setInterval(changePicture, 10000);
changePicture();


////////////////////////////////////////////////////////////////////////////

//Lets try to get co-ordinates from tracking of the color yellow and use it in place of the mouse move co-ordinates to move the kaleidoscope.


let colors = new tracking.ColorTracker(['yellow'])

colors.on('track', function(event) {
      if (event.data.length === 0) {
    // No colors were detected in this frame.
      } else {

        let factorx = 0;
        let factory = 0;

        event.data.forEach(function(rect) {
         //console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
         if (rect.color == "yellow"){

           let factorx = rect.x / $(window).width();
           let factory = rect.y / $(window).height();
                 // This will move kaleidoscope
           scope.angleTarget = factorx;
           scope.zoomTarget  = 1.0 + 0.5 * factory;

         }
       })
     }

       });

let resizeHandler = function() {
container.height( $(window).height() );
container.width( $(window).width() );
};

$(window).resize(resizeHandler);
$(window).resize();

container.click(changePicture);

tracking.track('#myVideo', colors, {camera: true});
