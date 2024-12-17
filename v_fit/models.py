from django.db import models
from django.core.validators import MinValueValidator, MaxLengthValidator

class Product(models.Model):
    name = models.CharField(max_length=255, validators=[MaxLengthValidator(255)])
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)])
    description = models.TextField(blank=True, null=True)  # Allow empty descriptions
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)  # Allow no image

class FittedImage(models.Model):
    image = models.ImageField(upload_to='fitted_images/')