from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='Finder/registration/Login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', register, name='register'),

    path('',homepage,name='home' ),
    path('addlost/',addlost,name='addlost' ),
    path('addfound/',addFound,name='addFound' ),
    path('addpost/',addpost,name='addpost' ),
    path('postlist/',postlist,name='postlist' ),
    path('commentlist/',Commentlist,name='commentlist' ),
    path('addcomment/',addcomment,name='addcomment' ),
    path('lostbyuser/',lostbyuser,name='lostbyuser' ),
    path('foundbyuser/',foundbyuser,name='foundbyuser' ),
    path('postlist/<int:post_id>/',detailpost,name='detailpost' ),

]
