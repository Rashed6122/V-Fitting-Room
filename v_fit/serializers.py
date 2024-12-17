from rest_framework import serializers
from .models import Product  # Make sure to import your Product model
from .models import FittedImage


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__' # Or list the fields explicitly if you prefer 

class FittedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FittedImage
        fields = ['image']  # Assuming there might be other fields to expose. Just image for now.

