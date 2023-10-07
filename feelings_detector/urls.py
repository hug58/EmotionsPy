"""urls, here you can user routers"""
from django.urls import  path

from .views import AnalyticTextView,WordPopulyView, EmojiPopulyView, HashtagsView


urlpatterns = [
    path('analytics/', AnalyticTextView.as_view()),
    path('top/words/', WordPopulyView.as_view()),
    path('top/emojis/', EmojiPopulyView.as_view()),
    path('top/hashtags/', HashtagsView.as_view()),

]
