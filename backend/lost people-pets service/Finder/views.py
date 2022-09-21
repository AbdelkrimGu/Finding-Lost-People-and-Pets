import base64

import requests
from django.http import JsonResponse
from django.shortcuts import render ,redirect
from .models import *
from django.contrib import messages
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
import cv2
import face_recognition as fr
import numpy as np
import py_eureka_client.eureka_client as eureka_client
import signal
import sys




def on_err(err_type: str, err: Exception):
    if err_type in (eureka_client.ERROR_REGISTER, eureka_client.ERROR_DISCOVER):
        eureka_client.stop()
    else:
        print(f"{err_type}::{err}")



    # The flowing code will register your server to eureka server and also start to send heartbeat every 30 seconds
    # 将目前的服务器注册到 Eureka 服务器
eureka_client.init(
        # Eureka Server 所在的地址
    eureka_server="http://localhost:8761",
    app_name="Persons-Lost-Service",
    # instance_host 不填则自动取得当前机器在网络上的一个 IP 地址
    instance_host="localhost",
    instance_port=8000,
    on_error=on_err
)

def signal_handler(sig, frame):
    print('You pressed Ctrl+C!')
    eureka_client.stop()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)




def homepage(request):
    Losts = Lost.objects.all()
    Founds = Found.objects.all()
    Images = Image.objects.all()
    context = {'Losts': Losts , 'Founds':Founds,'Images':Images}
    return render(request, 'Finder/HomePage.html',context)


def addlost(request):
    print(request.META['HTTP_AUTHORIZATION'])
    url = 'http://localhost:8081/api/verify?token=' + request.META['HTTP_AUTHORIZATION']
    myobj = {'somekey': 'somevalue'}

    # use the 'headers' parameter to set the HTTP headers:
    #x = requests.get(url, data=myobj, headers={"HTTP_HOST": "MyVeryOwnHost"})
    #response = json.loads(x.text)
    response = json.loads(eureka_client.do_service("user-service", "/api/verify?token=" + request.META['HTTP_AUTHORIZATION']))


    if (response["message"] == "Unvalid"):
        data = [{'message': response["message"]}]
        return JsonResponse(data, safe=False)
    else:
        userid = response["userid"]  # fromspring
        body = json.loads(request.body)
        body["by"] = userid
        img_str = body["image"]
        body.pop('image', None)
        u = Lost(**body)
        img =decode_base64_file(img_str)
        u.Image = decode_base64_file(img_str)
        u.save()
        img =decode_base64_file(img_str)
        id_face = u.pk
        image = Image.objects.create(Face_Id=id_face,User_Id=userid,Image=img)
        image.save()

        data = LostSerializer(instance=u).data
        return JsonResponse(data, safe=False)


def decode_base64_file(data):

    def get_file_extension(file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

    from django.core.files.base import ContentFile
    import base64
    import six
    import uuid

    # Check if this is a base64 string
    if isinstance(data, six.string_types):
        # Check if the base64 string is in the "data:" format
        if 'data:' in data and ';base64,' in data:
            # Break out the header from the base64 content
            header, data = data.split(';base64,')

        # Try to decode the file. Return validation error if it fails.
        try:
            decoded_file = base64.b64decode(data)
        except TypeError:
            TypeError('invalid_image')

        # Generate file name:
        file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
        # Get the file name extension:
        file_extension = get_file_extension(file_name, decoded_file)

        complete_file_name = "%s.%s" % (file_name, file_extension, )

        return ContentFile(decoded_file, name=complete_file_name)


def addFound(request):
    print(request.META['HTTP_AUTHORIZATION'])
    url = 'http://localhost:8081/api/verify?token=' + request.META['HTTP_AUTHORIZATION']
    myobj = {'somekey': 'somevalue'}

    # use the 'headers' parameter to set the HTTP headers:
    #x = requests.get(url, data=myobj, headers={"HTTP_HOST": "MyVeryOwnHost"})
    #response = json.loads(x.text)
    response = json.loads(eureka_client.do_service("user-service", "/api/verify?token=" + request.META['HTTP_AUTHORIZATION']))
    print(response["message"])

    if (response["message"] == "Unvalid"):
        data = [{'message': response["message"]}]
        return JsonResponse(data, safe=False)
    else:

        Images = Image.objects.all()
        Names = []
        Photos = []
        for i in Images:
            Names.append(i.Face_Id)
            Photos.append(i.Image)
            # print(i.Face_Id)

        def findEncode(images):
            encode = []
            i = 0
            for img in images:
                i += 1
                image = cv2.imdecode(np.fromstring(img.read(), np.uint8), cv2.IMREAD_UNCHANGED)
                img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                # print(img)
                encodeimg = fr.face_encodings(img)[0]
                encode.append(encodeimg)
            return encode

        userid = response["userid"]  # fromspring
        body = json.loads(request.body)
        body["by"] = userid
        img_str = body["image"]
        body.pop('image', None)
        u = Found(**body)
        u.Image = decode_base64_file(img_str)
        u.save()
        data = FoundSerializer(instance=u).data


        encodeList = findEncode(Photos)
        File = decode_base64_file(img_str)

        # mooon = cv2.imread(File)
        mooon = cv2.imdecode(np.fromstring(File.read(), np.uint8), cv2.IMREAD_UNCHANGED)

        imgS = cv2.resize(mooon, (0, 0), None, 0.25, 0.25)
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

        faces = fr.face_locations(imgS)

        encodes = fr.face_encodings(imgS, faces)
        for encodeFace, Loc in zip(encodes, faces):
            print("2")
            mathes = fr.compare_faces(encodeList, encodeFace)
            facedis = fr.face_distance(encodeList, encodeFace)
            print(facedis)
            matchindex = np.argmin(facedis)
            if mathes[matchindex]:
                name = Names[matchindex]
                if (facedis[matchindex] > 0.53):
                    name = "unknown"
                name = "The Face ID of this person is : ", name
                info = []
                info.append(name)
        info.append(data)
        return JsonResponse(info, safe=False)



"""   Images = Image.objects.all()
    Names = []
    Photos = []
    for i in Images:
        Names.append(i.Face_Id)
        Photos.append(i.Image)
        # print(i.Face_Id)

    def findEncode(images):
        encode = []
        i = 0
        for img in images:
            i += 1
            image = cv2.imdecode(np.fromstring(img.read(), np.uint8), cv2.IMREAD_UNCHANGED)
            img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            # print(img)
            encodeimg = fr.face_encodings(img)[0]
            encode.append(encodeimg)
        return encode

    encodeList = findEncode(Photos)

    # mooon = cv2.imread(File)
    mooon = cv2.imdecode(np.fromstring(File.read(), np.uint8), cv2.IMREAD_UNCHANGED)

    imgS = cv2.resize(mooon, (0, 0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    faces = fr.face_locations(imgS)

    encodes = fr.face_encodings(imgS, faces)

    for encodeFace, Loc in zip(encodes, faces):
        mathes = fr.compare_faces(encodeList, encodeFace)
        facedis = fr.face_distance(encodeList, encodeFace)
        print(facedis)
        matchindex = np.argmin(facedis)
        if mathes[matchindex]:
            name = Names[matchindex]
            # print(name)
            if (facedis[matchindex] > 0.53):
                name = "unknown"
            print("The Face ID of this person is : ", name)"""















from rest_framework import serializers
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

from rest_framework import serializers
class FoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Found
        fields = '__all__'

class LostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lost
        fields = '__all__'


from rest_framework import serializers
from django.core import serializers
import json as simplejson
import json


def postlist(request):
    data = list(Post.objects.values())
    print(data)
    return JsonResponse(data, safe=False)


def Commentlist(request):
    data = list(Comment.objects.values())
    print(data)
    return JsonResponse(data, safe=False)

def addpost(request):


    print(request.META['HTTP_AUTHORIZATION'])
    url = 'http://localhost:8081/api/verify?token=' + request.META['HTTP_AUTHORIZATION']
    myobj = {'somekey': 'somevalue'}

    # use the 'headers' parameter to set the HTTP headers:
    #x = requests.get(url, data=myobj, headers={"HTTP_HOST": "MyVeryOwnHost"})
    #response = json.loads(x.text)
    response = json.loads(eureka_client.do_service("user-service", "/api/verify?token=" + request.META['HTTP_AUTHORIZATION']))
    print(response["message"])

    if (response["message"] == "Unvalid"):
        data = [{'message': response["message"]}]
        return JsonResponse(data, safe=False)
    else:
        userid = response["userid"] #fromspring
        body = json.loads(request.body)
        body["by"] = userid
        img_str = body["image"]
        body.pop('image', None)
        u = Post(**body)
        u.image = decode_base64_file(img_str)
        u.save()
        data = PostSerializer(instance=u).data
        return JsonResponse(data, safe=False)




def foundbyuser(request):
    print(request.META['HTTP_AUTHORIZATION'])
    url = 'http://localhost:8081/api/verify?token=' + request.META['HTTP_AUTHORIZATION']
    myobj = {'somekey': 'somevalue'}

    # use the 'headers' parameter to set the HTTP headers:
    #x = requests.get(url, data=myobj, headers={"HTTP_HOST": "MyVeryOwnHost"})
    #response = json.loads(x.text)
    response = json.loads(eureka_client.do_service("user-service", "/api/verify?token=" + request.META['HTTP_AUTHORIZATION']))
    print(response["message"])

    if (response["message"] == "Unvalid"):
        data = [{'message': response["message"]}]
        return JsonResponse(data, safe=False)
    else:
        userid = response["userid"]  # fromspring
        founds = Found.objects.filter(by=userid).values()
        data = list(founds)
        return JsonResponse(data, safe=False)


def lostbyuser(request):

        print(request.META['HTTP_AUTHORIZATION'])
        url = 'http://localhost:8090/api/verify?token=' + request.META['HTTP_AUTHORIZATION']
        myobj = {'somekey': 'somevalue'}

        # use the 'headers' parameter to set the HTTP headers:
        #x = requests.get(url, data=myobj, headers={"HTTP_HOST": "MyVeryOwnHost"})
        #response = json.loads(x.text)
        response = json.loads(eureka_client.do_service("user-service", "/api/verify?token=" + request.META['HTTP_AUTHORIZATION']))
        print(response["message"])

        if (response["message"] == "Unvalid"):
            data = [{'message': response["message"]}]
            return JsonResponse(data, safe=False)
        else:
            userid = response["userid"]  # fromspring
            losts = Lost.objects.filter(by=userid).values()
            data = list(losts)
            return JsonResponse(data, safe=False)


def addcomment(request):


    print(request.META['HTTP_AUTHORIZATION'])
    url = 'http://localhost:8081/api/verify?token=' + request.META['HTTP_AUTHORIZATION']
    myobj = {'somekey': 'somevalue'}

    # use the 'headers' parameter to set the HTTP headers:
    #x = requests.get(url, data=myobj, headers={"HTTP_HOST": "MyVeryOwnHost"})
    #response = json.loads(x.text)
    response = json.loads(eureka_client.do_service("user-service", "/api/verify?token=" + request.META['HTTP_AUTHORIZATION']))
    print(response["message"])

    if (response["message"] == "Unvalid"):
        data = [{'message': response["message"]}]
        return JsonResponse(data, safe=False)
    else:
        userid = response["userid"] #fromspring
        body = json.loads(request.body)
        body["by"] = userid
        u = Comment(**body)
        u.save()
        data = CommentSerializer(instance=u).data
        return JsonResponse(data, safe=False)






def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username = username, password = password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'Finder/registration/Register.html', {'form': form})



def detailpost(request,post_id):
    commentlist = Comment.objects.filter(post=post_id).values()
    data = list(commentlist)
    return JsonResponse(data, safe=False)
