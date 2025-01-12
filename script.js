const images = document.querySelectorAll('.image');
let currentImageIndex = 1;

function changeImage() {
  images.forEach((img, index) => {
    img.classList.toggle('active', index === currentImageIndex); // Add 'active' only to the current image
  });

  currentImageIndex = (currentImageIndex + 1) % images.length; // Cycle through images
}

setInterval(changeImage, 3000); // Change image every 3 seconds

const fileInput = document.getElementById("file-input");
const uploadArea = document.getElementById("upload-area");
const browseLink = document.getElementById("browse-link");



// Unified file handler
function handleFileUpload(files) {
  if (files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file.");
          return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10 MB limit
          alert("File size exceeds the 10 MB limit.");
          return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
          replaceUploadInterface(event.target.result); // Update the UI
      };
      reader.readAsDataURL(file); // Read the file
  }
}

// Update file input change listener
fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  handleFileUpload(files);
});

// Drag-and-drop functionality
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
  const files = e.dataTransfer.files; // Get files from drag-and-drop
  handleFileUpload(files);
});

// Browse button trigger
browseLink.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click(); // Open the file dialog
});

// Replace upload area content
function replaceUploadInterface(imageSrc) {
  const images2 = document.querySelectorAll('.image2');
  images2.forEach((img, index) => {
    img.classList.toggle('active', index === 1); // Add 'active' only to the current image
  });
    uploadArea.innerHTML = `
        <div class="content-wrapper">
            <div class="uploaded-image-container">
                <img src="${imageSrc}" alt="Uploaded Image">
                <p class="image-caption">YOUR IMAGE</p>
            </div>
            <div class="vertical-line"></div>
            <div class="clothes-section">
                <h2>Choose Your Outfit</h2>
                <div class="clothes-container">
                    <img src="imgs/clothes1.png" alt="Clothes 1" class="clothes-image">
                    <img src="imgs/clothes1.png" alt="Clothes 2" class="clothes-image">
                    <img src="imgs/clothes1.png" alt="Clothes 3">
                    <img src="imgs/clothes1.png" alt="Clothes 4">
                    <img src="imgs/clothes1.png" alt="Clothes 5">
                    <img src="imgs/clothes1.png" alt="Clothes 6">
                    <img src="imgs/clothes1.png" alt="Clothes 1">
                    <img src="imgs/clothes1.png" alt="Clothes 2">
                    <img src="imgs/clothes1.png" alt="Clothes 3">
                    <img src="imgs/clothes1.png" alt="Clothes 4">
                    <img src="imgs/clothes1.png" alt="Clothes 5">
                    <img src="imgs/clothes1.png" alt="Clothes 6">
                    <img src="imgs/clothes1.png" alt="Clothes 1">
                    <img src="imgs/clothes1.png" alt="Clothes 2">
                    <img src="imgs/clothes1.png" alt="Clothes 3">
                    <img src="imgs/clothes1.png" alt="Clothes 4">
                    <img src="imgs/clothes1.png" alt="Clothes 5">
                    <img src="imgs/clothes1.png" alt="Clothes 6">
                    <!-- Add more images as needed -->
                </div>
            </div>
        </div>
    `;
    const clothesImages = document.querySelectorAll('.clothes-image');
    clothesImages.forEach((clothingImage) => {
      clothingImage.addEventListener('click', () => handleClothesClick(imageSrc));
    });
}

function handleClothesClick(imageSrc) {
  // Update the upload area to show only the uploaded image centered
  document.querySelector('.image-container-try').style.display = 'none';
  document.querySelector('.upload-area').style.height = '500px';
  const uploadArea = document.getElementById('upload-area');
  uploadArea.innerHTML = `
    <div class="uploaded-image-container">
        <img src="${imageSrc}" alt="Uploaded Image" class="centered-image">
    </div>
  `;
  const finalContainer = document.querySelector('.uploaded-image-container');

  // Create a new title element
  const titleElement = document.createElement('h2');

  // Set the text content of the title
  titleElement.textContent = 'Final Look';

  // Add styles to center the title
  titleElement.style.textAlign = 'center';
  titleElement.style.marginBottom = '20px'; // Add some space below the title
  titleElement.style.fontSize = '24px'; // Adjust font size
  titleElement.style.color = '#333'; // Adjust text color
  titleElement.style.fontWeight = 'normal';

  // Insert the title at the top of the final container
  finalContainer.insertBefore(titleElement, finalContainer.firstChild);

  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.justifyContent = 'center';
  buttonsContainer.style.gap = '20px';
  buttonsContainer.style.marginTop = '20px';

  // Create Retry button
  const retryButton = document.createElement('button');
  retryButton.textContent = 'Retry';
  retryButton.style.padding = '5px 50px';
  retryButton.style.fontSize = '16px';
  retryButton.style.cursor = 'pointer';
  retryButton.style.backgroundColor = '#FFFFFF'; // Adjust button color
  retryButton.style.color = '#000000';
  retryButton.style.border = '1px solid #FFFFFF';
  retryButton.style.borderRadius = '8px';
  retryButton.addEventListener('click', () => {
    window.location.href = 'TryOnPage.html'; // Redirect to TryOnPage.html
  });

  // Create Exit button
  const exitButton = document.createElement('button');
  exitButton.textContent = 'Exit';
  exitButton.style.padding = '5px 56px';
  exitButton.style.fontSize = '16px';
  exitButton.style.cursor = 'pointer';
  exitButton.style.backgroundColor = '#FFFFFF'; // Adjust button color
  exitButton.style.color = '#000000';
  exitButton.style.border = '1px solid #FFFFFF';
  exitButton.style.borderRadius = '8px';
  exitButton.addEventListener('click', () => {
    window.location.href = 'main.html'; // Redirect to index.html
  });

  // Append buttons to the buttons container
  buttonsContainer.appendChild(retryButton);
  buttonsContainer.appendChild(exitButton);

  // Append buttons container below the upload-area in the rounded-window
  const roundedWindow = document.querySelector('.rounded-window');
  roundedWindow.appendChild(buttonsContainer);
}


