from django.shortcuts import render

# Create your views here.

def credits(request):
	c = {}
	return render(request, 'credits.html', c)
