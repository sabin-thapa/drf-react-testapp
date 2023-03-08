from django.urls import path 
from . import views

urlpatterns = [
    path('', views.apiView, name='api-view'),
    path('todos/', views.todoList, name='todo-list'),
    path('todo-detail/<str:pk>/', views.todoDetail, name='todo-detail'),
]