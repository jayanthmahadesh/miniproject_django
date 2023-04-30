from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.homepage,name='homepage'),
    path('my-view-url/', views.my_view, name='my_view'),
    path('testing/',views.testing,name='testing'),
    path('testing/transaction',views.transaction,name = 'transaction'),
]
