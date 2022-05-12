from django.urls import path
from . import views

urlpatterns = [
    path('', views.getIdImage, name='getidimage'),
]