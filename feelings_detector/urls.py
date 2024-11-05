"""urls, here you can user routers"""

from django.urls import  path,include
from rest_framework.routers import DefaultRouter

from .views import (AnalyticTextView,WordPopulyView,
                    EmojiPopulyView,
                    AnalyticCsvView,
                    HashtagsView)


router = DefaultRouter()
router.register(r'upload',AnalyticCsvView,basename='upload')

urlpatterns = [
    path('files/', include(router.urls)),
    path('analysis/', AnalyticTextView.as_view()),
    path('top/words/', WordPopulyView.as_view()),
    path('top/emojis/', EmojiPopulyView.as_view()),
    path('top/hashtags/', HashtagsView.as_view()),
]
