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
        'List View': '/todos/',
        'Detail View': '/todo-detail/<str:pk>/',
        'Create': '/todo-create/',
        'Update': '/todo-update/<str:pk>/',
        'Delete': '/todo-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def todoList(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def todoDetail(request, pk):
    todos = Todo.objects.get(id=pk)
    serializer = TodoSerializer(todos, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def todoCreate(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() 
    return Response(serializer.data)

@api_view(['POST'])
def todoUpdate(request, pk):
    todo = Todo.objects.get(id=pk)
    serializer = TodoSerializer(instance=todo, data=request.data)
    if serializer.is_valid():
        serializer.save() 
    return Response(serializer.data)

@api_view(['DELETE'])
def todoDelete(request, pk):
    todo = Todo.objects.get(id=pk)
    todo.delete()
    return Response('Item Deleted!')