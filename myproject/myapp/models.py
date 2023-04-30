from django.db import models

# Create your models here.
class transactions(models.Model):
    fromaddress = models.CharField(max_length=100)
    toaddress = models.CharField(max_length=100)
    amount = models.CharField(max_length=100)
    def __str__(self):
        return self.fromaddress