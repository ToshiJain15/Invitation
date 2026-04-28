from django.shortcuts import render

def index(request):
    return render(request, 'invitation/index.html')
