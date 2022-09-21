# code

from django.db.models.signals import post_save, pre_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import *
from django.db.models.signals import (
    pre_save,
    post_save,
    pre_delete,
    post_delete,
    m2m_changed,
)

'''
@receiver(post_save, sender=Lost)
def lost_post_save(sender, instance, created , *args, **kwargs):
    print(instance.id, instance.First_Name)

    if created:
        image = Image.objects.create(Face_Id=instance.id,User_Id=instance.by.id,Image=instance.Image)

'''
@receiver(post_save, sender=User)
def lost_post_save(sender, instance, created , *args, **kwargs):
    if created:
        account = Account.objects.create(User_Id=instance.id,First_Name=instance.username)
    # data = form.instance.id
#         print(data)
#         lost = Lost.objects.filter(Family_Name=request.POST['Family_Name']).update(id=data)
#         for i in photo:
#             image = Image.objects.create(User_Id=request.user.id,Face_Id=data,Image=i)


