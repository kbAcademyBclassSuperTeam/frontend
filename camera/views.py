import cv2
from django.shortcuts import render, redirect
from django.conf import settings
from . import getid
import datetime

def getIdImage(request):

    frame = getid.openCamera()
    dst = getid.detection(frame)
    getid.saveImage(dst)

    return redirect('/')