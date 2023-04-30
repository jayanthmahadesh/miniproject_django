from django.db import models
from django.utils import timezone

# Create your models here.
class transactions(models.Model):
    fromaddress = models.CharField(max_length=100)
    toaddress = models.CharField(max_length=100)
    amount = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.fromaddress