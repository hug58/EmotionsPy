"""serializers"""
from rest_framework import serializers

class AnalyticTextSerializer(serializers.Serializer):
    """Serializer for AnalyticText, use for detail"""
    inputs = serializers.ListField(child=serializers.CharField())
    option = serializers.ChoiceField(choices=['sentiment','emotion'])


class UploadSerializer(serializers.Serializer):
    file_uploaded = serializers.FileField()
    class Meta:
        fields = ['file_uploaded']