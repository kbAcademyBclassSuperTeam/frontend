from django.shortcuts import render
from django.http import JsonResponse
import joblib

def main(request):

    return render(request, 'frontend/main.html')


def model_predict(texts):
    transformer = joblib.load('main\model_folder\corpus_transformer.pkl')
    model = joblib.load('main\model_folder\corpus.pkl')
    ex = transformer.transform({texts})
    y_pred = model.predict(ex)

    return y_pred[0]
    
    

def search_table(request):
    search_key = request.GET.get('search_key') 
    context = {'search_key': str(model_predict(search_key))} 

    return JsonResponse(context)