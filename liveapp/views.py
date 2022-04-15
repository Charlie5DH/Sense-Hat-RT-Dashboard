from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
import json

# Create your views here.
class HomePage(TemplateView):
    template_name = 'live_app.html'

@api_view(['GET'])
def getMockData(request):
    return HttpResponse(json.dumps({'data': 'Working Fine'}))
    