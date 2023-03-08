from django.urls import path 
from . import views

urlpatterns = [
    path('', views.apiView, name='api-view'),
    path('tasks/', views.taskList, name='task-list'),
]