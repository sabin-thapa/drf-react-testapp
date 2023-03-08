from django.shortcuts import render
from django.http import JsonResponse
from .models import Todo

from rest_framework.response import Response
from rest_framework.decorators import api_view #decorator

#Import Serializer 
from .serializers import TodoSerializer

# Create your views here.

@api_view(['GET'])
def apiView(request):
    api_urls = {
        'List': '/tasks/',
        'Detail': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Delete': '/task-delete/<str:pk>/',
        'Update': '/task-update/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def taskList(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)
