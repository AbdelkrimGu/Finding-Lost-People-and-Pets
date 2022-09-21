from django.conf import settings
from django.contrib.auth.models import User
from django.db import models





class Lost(models.Model):
    by = models.IntegerField(null=True,blank=True,default=5)

    GENDER = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    id = models.AutoField(primary_key=True)
    First_Name = models.CharField(max_length=100, blank=False, help_text="Enter your Full name")
    Family_Name = models.CharField(max_length=100, blank=False, help_text="Enter your Full name")
    Phone = models.CharField(max_length=100, blank=False, help_text="Username")
    Address = models.CharField(max_length=100 , blank=False)
    Gender = models.CharField(blank=False, choices=GENDER, max_length=10, default='M')
    Image = models.ImageField(upload_to='images', null=True)
    is_found =models.BooleanField(default=False,null=True,blank=True)


    def __str__(self):
        return self.First_Name



class Found(models.Model):
    by = models.IntegerField(null=True,blank=True,default=5)

    GENDER = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    Found_Id = models.AutoField(primary_key=True)
    First_Name = models.CharField(max_length=100, blank=False, help_text="Enter your Full name")
    Family_Name = models.CharField(max_length=100, blank=False, help_text="Enter your Full name")
    Phone = models.CharField(max_length=100, blank=False, help_text="Username")
    Address = models.CharField(max_length=100 , blank=False)
    Gender = models.CharField(blank=False, choices=GENDER, max_length=10, default='M')
    Image = models.ImageField(upload_to='images', null=True)
    is_identified = models.BooleanField(default=False,null=True,blank=True)

    def __str__(self):
        return self.First_Name


class Account(models.Model):
    GENDER = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    User_Id = models.AutoField(primary_key=True)
    Lost = models.ForeignKey(Lost, on_delete=models.CASCADE, blank=True, null=True)
    Found = models.ForeignKey(Found, on_delete=models.CASCADE, blank=True, null=True)
    First_Name = models.CharField(max_length=100, blank=False, help_text="Enter your Full name")
    Family_Name = models.CharField(max_length=100, blank=False, help_text="Enter your Full name")
    Phone = models.CharField(max_length=100, blank=False, help_text="Username")
    Address = models.CharField(max_length=100 , blank=False)
    Email = models.EmailField(blank=False)
    Password = models.CharField(max_length=100, blank=False)
    Gender = models.CharField(blank=False, choices=GENDER, max_length=10, default='M')
    Image = models.ImageField(upload_to='images', null=True)

    def __str__(self):
        return self.First_Name



class Image(models.Model):
    Image_Id = models.AutoField(primary_key=True)
    User_Id =models.IntegerField(blank=False,null=True, default=0)
    Face_Id =models.IntegerField(blank=False,null=True, default=0)
    Image = models.ImageField(upload_to='images', null=True)

class Post(models.Model):
    by = models.IntegerField(null=True,blank=True,default=5)
    title = models.CharField(max_length = 50 ,null=True, blank=True)
    content = models.TextField(max_length=1000,null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank = True,null = False)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post,on_delete = models.CASCADE,related_name="comments",null=False, blank=True)
    by = models.IntegerField(null=True,blank=True,default=5)
    comment_content = models.CharField(max_length = 200,null=False, blank=True)
    comment_date = models.DateTimeField(auto_now_add=True,null=True, blank=True)

    def __str__(self):
        return str(self.comment_content)


    class Meta:
        ordering = ['-comment_date']
