"""serializers"""
from rest_framework import serializers

class AnalyticTextSerializer(serializers.Serializer):
    """Serializer for AnalyticText, use for detail"""
    inputs = serializers.ListField(child=serializers.CharField())
    option = serializers.ChoiceField(choices=['sentiment','emotion'])

    def validate_input(self, value):
        """Validate the input"""
        if len(value) < 1:
            raise serializers.ValidationError("field must be at least one character")
        return value

