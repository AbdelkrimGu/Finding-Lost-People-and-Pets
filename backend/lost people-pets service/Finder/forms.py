from django import forms
from .models import *



class AddLost(forms.ModelForm):

    class Meta :
        model = Lost
        fields = '__all__'
        exclude = ('by',)


class addFoundForm(forms.ModelForm):
    class Meta :
        model = Found
        fields = '__all__'
        exclude = ('by',)



class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title","content","image"]



class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = '__all__'
