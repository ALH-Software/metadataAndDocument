"""metatask URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .routers import router
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', TemplateView.as_view(template_name='metadata/index.html')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),

    path('register', TemplateView.as_view(template_name='register.html')),
    path('login', TemplateView.as_view(template_name='login.html')),
    path('document', TemplateView.as_view(template_name='document/index.html')),
    path('document/add', TemplateView.as_view(template_name='document/add.html')),
    path('document/<str:document_name>', TemplateView.as_view(template_name='document/view.html')),
    path('metadata', TemplateView.as_view(template_name='metadata/index.html')),
    path('metadata/add', TemplateView.as_view(template_name='metadata/add.html')),
    path('metadata/<str:document_name>', TemplateView.as_view(template_name='metadata/view.html')),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)