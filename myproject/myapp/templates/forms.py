from django import forms
from ..models import transactions

class transactionform(forms.ModelForm): 
    class Meta:
        model= transactions
        fields= ['fromaddress','toaddress','amount']
