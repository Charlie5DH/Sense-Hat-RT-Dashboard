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
from datetime import datetime
import json

# Create your views here.
class HomePage(TemplateView):
    template_name = 'live_app.html'

@api_view(['GET'])
def getMockData(request):
    return HttpResponse(json.dumps({'data': 'Working Fine'}))

@api_view(['GET'])
def getEnvData(request):
    env_measures = SenseHatEnvMeasures.objects.all()
    serializer = SenseHatEnvMeasuresSerializer(env_measures, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getLastEnvBatch(request, last):
    # Get last n measures
    env_data = SenseHatEnvMeasures.objects.order_by('-timestamp')[:last]
    serializer = SenseHatEnvMeasuresSerializer(env_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEnvDataByDate(request, date):
    ## Get the date in the format YYYY-MM-DD
    env_data = SenseHatEnvMeasures.objects.filter(timestamp=date).last()
    serializer = SenseHatEnvMeasuresSerializer(env_data, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getEnvDataByDateLast(request, date, last):
    env_data = SenseHatEnvMeasures.objects.filter(timestamp__contains=date)[:last]
    serializer = SenseHatEnvMeasuresSerializer(env_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEnvDataByDateRange(request, init_date, end_date):
    # Get a set of measures between two dates
    # exampel: api/env_data/init_date=2022-04-21T18:57:49Z/end_date=2022-04-21T18:57:54Z/
    env_data = SenseHatEnvMeasures.objects.filter(timestamp__range=[init_date, end_date])
    serializer = SenseHatEnvMeasuresSerializer(env_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEnvDataAfterDate(request, after_date):
    # Get a set of measures after a date
    # exampel: /api/env_data/after_date=2022-04-21T18:57:52Z
    env_data = SenseHatEnvMeasures.objects.filter(timestamp__gt=after_date)
    serializer = SenseHatEnvMeasuresSerializer(env_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEnvDataAfterEqualDate(request, after_date):
    # Get a set of measures after or equal a date
    # exampel: /api/env_data/after_date=2022-04-21T18:57:52Z
    env_data = SenseHatEnvMeasures.objects.filter(timestamp__gte=after_date)
    serializer = SenseHatEnvMeasuresSerializer(env_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEnvDataBeforeDate(request, before_date):
    # Get a set of measures before a date
    # exampel: api/env_data/before_date=2022-04-21T17:58:37Z
    env_data = SenseHatEnvMeasures.objects.filter(timestamp__lt=before_date)
    serializer = SenseHatEnvMeasuresSerializer(env_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEnvDataById(request, _id):
    # doeasn't work, because of the '_id' in the url
    # possible fix:
    # use pymongo to query the database and return the result
    env_data = SenseHatEnvMeasures.objects.get(pk=_id)
    serializer = SenseHatEnvMeasuresSerializer(env_data)
    return Response(serializer.data)


##----------------------ORIENTATION APIS---------------------------##

@api_view(['GET'])
def getOrientationDataLast(request, last):
    # Get last n measures
    orientation_data = SenseHatOrientationMeasures.objects.order_by('-timestamp')[:last]
    serializer = SenseHatOrientationMeasuresSerializer(orientation_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOrientationDataByDate(request, date):
    ## Get the date in the format YYYY-MM-DD
    orientation_data = SenseHatOrientationMeasures.objects.filter(timestamp=date).last()
    serializer = SenseHatOrientationMeasuresSerializer(orientation_data, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getOrientationDataByDateRange(request, init_date, end_date):
    # Get a set of measures between two dates
    # exampel: api/orientation_data/init_date=2022-04-21T18:57:49Z/end_date=2022-04-21T18:57:54Z/
    orientation_data = SenseHatOrientationMeasures.objects.filter(timestamp__range=[init_date, end_date])
    serializer = SenseHatOrientationMeasuresSerializer(orientation_data, many=True)
    return Response(serializer.data)

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
