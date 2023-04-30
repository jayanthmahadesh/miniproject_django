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
    if request.method=='POST':
        data = json.loads(request.body)
        ret = transactions.objects.create(fromaddress=data['fromaddress'],toaddress=data['toaddress'],amount=data['amount'])
    return redirect('/')
def testing(request):
    return render(request,'newindex.html')
@csrf_exempt
def transaction(request):
    print("comming here jauanth ")
    if request.method == 'POST':
        my_input = request.POST.get('my_input')
        # print(my_input)
        currentusertransaction = transactions.objects.filter(fromaddress = my_input)
        context = {
            'currentusertransaction':currentusertransaction,
        }
        print(currentusertransaction)
    return render(request,'transaction.html',context)
        
    
    # Return a JSON response containing the HTML string
    # if request.method=='POST':
        # data = json.loads(request.body)
        # print(data['fromaddress'])
        # prev_transactions = transactions.objects.filter(fromaddress=fromaddress)
        # print(prev_transactions)
        # return redirect(request,'index.html')
    
