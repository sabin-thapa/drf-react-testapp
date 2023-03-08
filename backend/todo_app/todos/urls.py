from django.urls import path 
from . import views

urlpatterns = [
    path('', views.apiView, name='api-view'),
    path('todos/', views.todoList, name='todo-list'),
    path('todo-detail/<str:pk>/', views.todoDetail, name='todo-detail'),
    path('todo-create/', views.todoCreate, name='todo-create'),
    path('todo-update/<str:pk>', views.todoUpdate, name='todo-update'),
    path('todo-delete/<str:pk>', views.todoDelete, name='todo-delete'),
]