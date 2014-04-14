from django.views.generic import View
from django.shortcuts import render_to_response

# Create your views here.
class MeterView(View):
	"""docstring for MeterView"""
	def get(self, request):
		return render_to_response("basic.html")

		