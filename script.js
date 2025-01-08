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
    uploadArea.innerHTML = `
        <div class="content-wrapper">
            <div class="uploaded-image-container">
                <img src="${imageSrc}" alt="Uploaded Image">
            </div>
            <div class="vertical-line"></div>
            <div class="clothes-container">
                <img src="imgs/clothes1.png" alt="Clothes 1">
                <img src="imgs/clothes1.png" alt="Clothes 2">
                <img src="imgs/clothes1.png" alt="Clothes 3">
                <!-- Add more clothes images -->
            </div>
        </div>
    `;
}
