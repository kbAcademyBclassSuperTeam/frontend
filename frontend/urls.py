from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('main/', include('main.urls')),
    path('camera/', include('camera.urls')),
    # path('createSound', include('main.urls')),
    path('createSound', views.createSound, name="create_sound"),
 
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
