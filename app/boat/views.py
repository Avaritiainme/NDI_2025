from django.shortcuts import render

# Create your views here.

def boat(request):
	c = {}
	return render(request, 'boat.html', c)
