from rest_framework import serializers
from .models import SenseHatEnvMeasures, SenseHatOrientationMeasures

class SenseHatEnvMeasuresSerializer(serializers.ModelSerializer):
    class Meta:
        model = SenseHatEnvMeasures
        fields = '__all__'

class SenseHatOrientationMeasuresSerializer(serializers.ModelSerializer):
    class Meta:
        model = SenseHatOrientationMeasures
        fields = '__all__'