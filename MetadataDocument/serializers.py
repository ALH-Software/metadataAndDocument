from rest_framework import serializers
from .models import Document
from .models import Metadata
from django.contrib.auth import get_user_model

class MetadataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Metadata
        fields = '__all__'

        extra_kwargs = {'url': {'lookup_field': 'metadata_name'}}


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

        extra_kwargs = {'url': {'lookup_field': 'document_name'}}


UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user

    class Meta:
        model = UserModel
        fields = ('password', 'username',)
