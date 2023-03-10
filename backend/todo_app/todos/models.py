from django.db import models

# Create your models here.

class Todo(models.Model):
    taskName = models.CharField(max_length=100)
    isCompleted = models.BooleanField(default=False)
    date_posted = models.DateTimeField(null=True, auto_now_add=True)

    def __str__(self):
        return self.taskName