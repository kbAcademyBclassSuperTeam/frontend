from django.shortcuts import render
from django.http import JsonResponse
import joblib
import platform

def main(request):

    return render(request, 'frontend/main.html')


def model_predict(texts):
    if platform.system()=='Darwin':
        transformer = joblib.load('main/model_folder/corpus_transformer.pkl')
        model = joblib.load('main/model_folder/corpus.pkl')
    else:
        transformer = joblib.load('main\model_folder\corpus_transformer.pkl')
        model = joblib.load('main\model_folder\corpus.pkl')
    ex = transformer.transform({texts})
    y_pred = model.predict(ex)
    target_num = y_pred[0]
    answer_list = []
    
    
    if target_num == 2:
        # 입금
        answer_list = ["입금을 도와드리겠습니다. 카드 또는 통장을 넣어주세요.",
        "...",
        "보내실 금액을 투입구에 넣어주세요.",
        "...",
        "이용해 주셔서 감사합니다!",
        "5초 후 자동으로 메인 화면으로 복귀합니다.",""];
    elif target_num == 6:
        #  출금
        answer_list = ["출금을 도와드리겠습니다. 카드 또는 통장을 넣어주세요.","...",
        "출금하실 금액을 입력해주세요.","...","이용해 주셔서 감사합니다!","5초 후 자동으로 메인 화면으로 복귀합니다.",""]
    elif target_num == 1:
        
        # 송금
        answer_list = ["송금을 도와드리겠습니다. 송금 유형을 선택해주세요.",
        "카드 또는 통장을 넣어주세요.","...","받는 사람의 계좌번호를 입력해 주세요.",
        "...","이용해 주셔서 감사합니다!","5초 후 자동으로 메인 화면으로 복귀합니다.",""]
    elif target_num == 3:
    
        #  조회
        answer_list = ["계좌조회를 도와드리겠습니다. 카드 또는 통장을 넣어주세요.","비밀번호를 입력해주세요.","...",
        "이용해 주셔서 감사합니다!","5초 후 자동으로 메인 화면으로 복귀합니다.",""]
    elif target_num == 4:
        
        # 개설
        answer_list = ["계좌개설을 도와드리겠습니다. 약관을 읽고 동의 버튼을 눌러주세요","약관에 동의해 주세요.",
        "...","신분증을 촬영해 주세요.","이용해 주셔서 감사합니다!","5초 후 자동으로 메인 화면으로 복귀합니다.",""]
    elif target_num == 5:
        
        # 카드 발급
        answer_list = ["카드발급을 도와드리겠습니다. 약관을 읽고 동의 버튼을 눌러주세요","약관에 동의해 주세요.",
        "...","신분증을 촬영해 주세요.","이용해 주셔서 감사합니다!","5초 후 자동으로 메인 화면으로 복귀합니다.",""]
    elif target_num == 0:
        #  발급
        answer_list = ["다시 말씀해주세요"]
    elif target_num == 7:
        #  발급
        if texts == '안녕하세요':
            answer_list = ["안녕하세요"]
        else:
            answer_list = ["다시 말씀해주세요"]

    return answer_list
    
    

def search_table(request):
    search_key = request.GET.get('search_key') 
    context = {'search_key': model_predict(search_key)} 

    return JsonResponse(context)