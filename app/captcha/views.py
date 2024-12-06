from django.shortcuts import render

# Create your views here.

def captcha(request):
	c = {}
	return render(request, 'captcha.html', c)
