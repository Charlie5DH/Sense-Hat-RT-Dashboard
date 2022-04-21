from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import SenseHatEnvMeasures, SenseHatOrientationMeasures
from django.http import HttpResponse
from .serializers import SenseHatEnvMeasuresSerializer, SenseHatOrientationMeasuresSerializer
import json

# Create your views here.
class HomePage(TemplateView):
    template_name = 'live_app.html'

@api_view(['GET'])
def getMockData(request):
    return HttpResponse(json.dumps({'data': 'Working Fine'}))

class EnvironmentViewSet(viewsets.ModelViewSet):
    def list(self, request):
        env_measures = SenseHatEnvMeasures.objects.all()
        serializer = SenseHatEnvMeasuresSerializer(env_measures, many=True)

        return Response(serializer.data)
    
    def create(self, request):
        serializer = SenseHatEnvMeasuresSerializer(data=request.data)
        #print(serializer)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        env_measures = SenseHatEnvMeasures.objects.get(_id=pk)
        serializer = SenseHatEnvMeasuresSerializer(env_measures, many=False)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        env_measures = SenseHatEnvMeasures.objects.get(_id=pk)
        serializer = SenseHatEnvMeasuresSerializer(instance=request, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            Response(serializer.data, status=status.HTTP_203_FAILED)

    def destroy(self, request, pk=None):
        env_measures = SenseHatEnvMeasures.objects.get(_id=pk)
        env_measures.delete()
        Response(status=status.HTTP_204_NO_CONTENT)

    def by_name(self, request, name=None):
        # http://150.162.236.21:8000/api/env_data/?name=SenseHat
        env_measures = SenseHatEnvMeasures.objects.filter(name=name)
        serializer = SenseHatEnvMeasuresSerializer(env_measures, many=True)

        return Response(serializer.data)

    def by_date(self, request, date=None):
        env_measures = SenseHatEnvMeasures.objects.filter(timestamp=date)
        serializer = SenseHatEnvMeasuresSerializer(env_measures, many=True)

        return Response(serializer.data)

class OrientationViewSet(viewsets.ModelViewSet):
    def list(self, request):
        orientation_measures = SenseHatOrientationMeasures.objects.all()
        serializer = SenseHatOrientationMeasuresSerializer(orientation_measures, many=True)

        return Response(serializer.data)
    
    def create(self, request):
        serializer = SenseHatOrientationMeasuresSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        orientation_measures = SenseHatOrientationMeasures.objects.get(pk=pk)
        serializer = SenseHatOrientationMeasuresSerializer(orientation_measures)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        orientation_measures = SenseHatOrientationMeasures.objects.get(pk=pk)
        serializer = SenseHatOrientationMeasuresSerializer(instance=request, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            Response(serializer.data, status=status.HTTP_203_FAILED)

    def destroy(self, request, pk=None):
        orientation_measures = SenseHatOrientationMeasures.objects.get(pk=pk)
        orientation_measures.delete()
        Response(status=status.HTTP_204_NO_CONTENT)