from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class HomePage(TemplateView):
    template_name = 'live_app.html'