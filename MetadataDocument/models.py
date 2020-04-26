from django.db import models

# Create your models here.


class Metadata(models.Model):
    id = models.BigIntegerField(primary_key=True)
    metadata_name = models.CharField(max_length=250, unique=True)
    metadata_string = models.TextField()

class Document(models.Model):
    id = models.BigIntegerField(primary_key=True)
    document_name = models.CharField(max_length=250, unique=True)
    document_file = models.FileField(max_length=100, blank=False, null=False)
