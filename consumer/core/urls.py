from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomePage.as_view(), name='home'),
    path('api/', views.getMockData, name='mockData'),
    path('api/env_data/', views.getEnvData, name='envData'),
    path('api/env_data/_id=<str:_id>/', views.getEnvDataById, name='envDataById'),
    path('api/env_data/last=<int:last>/', views.getLastEnvBatch, name='envData'),
    path('api/env_data/date=<str:date>/', views.getEnvDataByDate, name='envDataByDate'),
    path('api/env_data/date=<str:date>/last=<int:last>/', views.getEnvDataByDateLast, name='envDataByDate'),
    path('api/env_data/init_date=<str:init_date>/end_date=<str:end_date>/', views.getEnvDataByDateRange, name='envDataByDate'),
    path('api/env_data/after_date=<str:after_date>/', views.getEnvDataAfterDate, name='envDataAfterDate'),
    path('api/env_data/after_date_equal=<str:after_date>/', views.getEnvDataAfterEqualDate, name='envDataAfterDate'),
    path('api/env_data/before_date=<str:before_date>/', views.getEnvDataBeforeDate, name='envDataBeforeDate'),
    
    #path('api/env_data/', views.EnvironmentViewSet.as_view({
    #    'get': 'list',
    #    'post': 'create',
    #}), name='env_data'),
    path('api/env_data/?_id=<str:pk>/', views.EnvironmentViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    }), name='env_data_detail'),
    path('api/orientation_data/', views.OrientationViewSet.as_view({
        'get': 'list',
        'post': 'create',
    }), name='orientation_data'),
    path('api/orientation_data/<str:pk>/', views.OrientationViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    }), name='orientation_data_detail'),
    # http://150.162.236.21:8000/api/env_data/?name=SenseHat
    path('api/env_data/?name=<str:name>/', views.EnvironmentViewSet.as_view({ 
        'get': 'by_name',
    }), name='env_data_by_name'),
    path('api/env_data/?date=<str:date>/', views.EnvironmentViewSet.as_view({
        'get': 'by_date',
    }), name='env_data_by_date'),

    path('api/orientation_data/last=<int:last>', views.getOrientationDataLast, name='orientation_data_last'),
    path('api/orientation_data/date=<str:date>', views.getOrientationDataByDate, name='orientation_data_by_date'),
    path('api/orientation_data/init_date=<str:init_date>/end_date=<str:end_date>', views.getOrientationDataByDateRange, name='orientation_data_by_date_range'),
]