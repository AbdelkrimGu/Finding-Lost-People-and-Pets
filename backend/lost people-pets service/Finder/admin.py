from django.contrib import admin
from .models import  Lost , Found , Image,Post,Comment,Account


admin.site.register(Account)
admin.site.register(Lost)
admin.site.register(Found)
admin.site.register(Image)
admin.site.register(Post)
admin.site.register(Comment)

# Register your models here.
