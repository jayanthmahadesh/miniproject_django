from django.shortcuts import render
from django.http import JsonResponse
import json
import requests
# Create your views here.
def homepage(request):
    return render(request,'index.html')
    
def my_view(request):
    if request.method == 'POST':
        # data = request.POST.get('my_data')
        data = json.loads(request.body)
        # Do something with the data
        print('the data is ',data['my_data'])
        address = data['my_data']
        print('the address is ',address)

        # url = f'https://api-sepolia.etherscan.io/api?module=account&action=txlistinternal&address={address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=5BPMVFC3GIPHNSJJEFMMIBU9Z73CR7P65J'
        url = f'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=5BPMVFC3GIPHNSJJEFMMIBU9Z73CR7P65J'
        response = requests.get(url)
        all_transactions = response.json()
        print(all_transactions)
        return JsonResponse({'success': True})