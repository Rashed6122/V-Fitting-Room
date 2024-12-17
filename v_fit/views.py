from rest_framework import generics , status
from .models import Product
from .serializers import ProductSerializer

from rest_framework.response import Response
from PIL import Image
from io import BytesIO
from django.core.files.images import ImageFile
import uuid # For generating unique filenames
from .models import FittedImage # New model for storing the fitted images
from .serializers import FittedImageSerializer

class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class FittingView(generics.CreateAPIView): # Assuming you want to save these to the model
    queryset = FittedImage.objects.all() # Accessing the new model.
    serializer_class = FittedImageSerializer 

    def post(self, request, *args, **kwargs):
        image1 = request.FILES.get('image1')
        image2 = request.FILES.get('image2')

        if not image1 or not image2:
            return Response({'error': 'Both image1 and image2 are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            img1 = Image.open(image1)
            img2 = Image.open(image2)


            # Resize images to the same height (if needed)
            if img1.height != img2.height:
                height = min(img1.height, img2.height)
                img1 = img1.resize((int(img1.width * height / img1.height), height))
                img2 = img2.resize((int(img2.width * height / img2.height), height))

            # Combine images side by side
            combined_width = img1.width + img2.width
            combined_img = Image.new('RGB', (combined_width, img1.height))
            combined_img.paste(img1, (0, 0))
            combined_img.paste(img2, (img1.width, 0))

            # Save the combined image (in-memory)
            in_memory_file = BytesIO()
            combined_img.save(in_memory_file, format='JPEG')  # Or PNG, etc.
            in_memory_file.seek(0)

            # Create a Django ImageFile object
            image_file = ImageFile(in_memory_file, name=f'{uuid.uuid4()}.jpg') # Unique filename to avoid conflicts

            # Save the image to your model
            fitted_image = FittedImage(image=image_file)
            fitted_image.save()

            serializer = FittedImageSerializer(fitted_image) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)


        except Exception as e:  # Handle potential errors like invalid image formats
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

