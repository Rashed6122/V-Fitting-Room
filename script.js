const images = document.querySelectorAll('.image');
let currentImageIndex = 1;

function changeImage() {
  images.forEach((img, index) => {
    img.classList.toggle('active', index === currentImageIndex); // Add 'active' only to the current image
  });

  currentImageIndex = (currentImageIndex + 1) % images.length; // Cycle through images
}

setInterval(changeImage, 3000); // Change image every 3 seconds
