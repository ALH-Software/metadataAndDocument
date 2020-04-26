from rest_framework import viewsets, permissions
from .models import Metadata
from .models import Document
from .serializers import MetadataSerializer
from .serializers import DocumentSerializer
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet

# Create your views here.
class MetadataView(viewsets.ModelViewSet):
    lookup_field = 'metadata_name'

    queryset = Metadata.objects.all()
    serializer_class = MetadataSerializer

    permission_classes = (permissions.IsAuthenticated,)

class DocumentView(viewsets.ModelViewSet):
    lookup_field = 'document_name'

    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    permission_classes = (permissions.IsAuthenticated,)

class CreateUserView(CreateModelMixin, GenericViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer