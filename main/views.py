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
    
    answer_list.append(str(target_num))
    
    if target_num == 2: # 완료
        # 입금
        answer_list.extend([ "입금을 도와드리겠습니다. 카드 또는 통장을 넣어주세요.",
        "...",
        "보내실 금액을 투입구에 넣어주세요.",
        "...",
        "이용해 주셔서 감사합니다!",
        "5초 후 자동으로 메인 화면으로 복귀합니다.",""]);
        
    elif target_num == 6: # 모달-금액에서 시작
        #  출금
        answer_list.extend(["출금을 도와드리겠습니다. 카드 또는 통장을 넣어주세요.","...",
        "출금 또는 송금하실 금액을 입력해주세요.","모달-금액", "비밀번호를 입력해주세요.", "모달-비밀번호" ,
        "이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])
    elif target_num == 1: # 모달-계좌번호에서 시작
        
        # 송금
        answer_list.extend(["송금을 도와드리겠습니다.",
        "카드 또는 통장을 넣어주세요.","...","받는 사람의 계좌번호를 입력해 주세요.", "모달-계좌번호", 
        "출금 또는 송금하실 금액을 입력해주세요.", "모달-금액", "비밀번호를 입력해주세요.",
        "모달-비밀번호","이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])

    elif target_num == 3: # 모달-비밀번호에서 시작
    
        #  조회
        answer_list.extend(["계좌조회를 도와드리겠습니다. 카드 또는 통장을 넣어주세요.", "..." , "비밀번호를 입력해주세요.","모달-비밀번호",
        "이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])
    elif target_num == 4: # 모달-약관에서 시작
        
        # 개설
        answer_list.extend(["계좌개설을 도와드리겠습니다. 약관을 읽고 동의 버튼을 눌러주세요",
        "모달-약관","신분증을 촬영해 주세요.","이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])
    elif target_num == 5:
        
        # 카드 발급
        answer_list.extend(["카드발급을 도와드리겠습니다. 약관을 읽고 동의 버튼을 눌러주세요",
        "모달-약관","신분증을 촬영해 주세요.","이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])
    elif target_num == 0:
        #  발급
        answer_list.append("다시 말씀해주세요")
    elif target_num == 7:
        #  발급
        if texts == '안녕하세요':
            answer_list.append("안녕하세요")
        elif texts == '반가워요':
            answer_list.append("저도 반가워요")
        elif texts == '누구세요' | texts == '누구' | texts == '이름':
            answer_list.append("저는 AI 행원 루나스 입니다.")
        elif texts == '사랑합니다':
            answer_list.append("네 저도 사랑해요")
        else:
            answer_list.append("이용해주셔서 감사합니다")
    return answer_list
    

def search_table(request):
    search_key = request.GET.get('search_key') 
    context = {'search_key': model_predict(search_key)} 

    return JsonResponse(context)