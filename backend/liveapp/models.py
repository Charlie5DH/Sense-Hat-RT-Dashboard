#from django.db import models
from djongo import models
from datetime import datetime

# Create your models here.

class SenseHatEnvMeasures(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, default="SenseHat")
    temperature = models.FloatField(blank=True, default=0.0)
    pressure = models.FloatField(blank=True, default=0.0)
    humidity = models.FloatField(blank=True, default=0.0)
    
    timestamp = models.DateTimeField(default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class SenseHatOrientationMeasures(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, default="SenseHat")
    acceleration_x = models.FloatField(blank=True, default=0.0)
    acceleration_y = models.FloatField(blank=True, default=0.0)
    acceleration_z = models.FloatField(blank=True, default=0.0)
    pitch = models.FloatField(blank=True, default=0.0)
    roll = models.FloatField(blank=True, default=0.0)
    yaw = models.FloatField(blank=True, default=0.0)

    timestamp = models.DateTimeField(default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

