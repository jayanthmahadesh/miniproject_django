from django.shortcuts import render,redirect
from django.http import JsonResponse
import json
import requests
from django.views.decorators.csrf import csrf_exempt
from .templates.forms import transactionform
from .models import transactions
# Create your views here.
def homepage(request):
    return render(request,'index.html')
@csrf_exempt
# def my_view(request):
#     if request.method == 'POST':
#         # data = request.POST.get('my_data')
#         data = json.loads(request.body)
#         # Do something with the data
#         address = data['my_data']
#         print('the address is ',address)
#         # print(all_transactions)
#         return JsonResponse({'success': True})

def my_view(request):
    # form= transactionform(request.POST)
    # print("here1")
    # if form.is_valid():
    #     print("here2")
    #     form.save()
    # context= {'form': form }
    if request.method=='POST':
        data = json.loads(request.body)
        print(data['fromaddress'])
        print(type(data['fromaddress']))
        print(type(data))
        ret = transactions.objects.create(fromaddress=data['fromaddress'],toaddress=data['toaddress'],amount=data['amount'])
    return redirect('/')
