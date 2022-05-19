from django.shortcuts import render
from django.http import JsonResponse
import joblib
import platform
import json
from binascii import a2b_base64
import base64
import pandas as pd
import tensorflow as tf
import librosa
import numpy as np
import itertools
import librosa.display
import matplotlib.pyplot as plt
import cv2


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
        answer_list.extend([ "입금을 도와드리겠습니다.", "카드 또는 통장을 넣어주세요.",
        "...",
        "보내실 금액을 투입구에 넣어주세요.",
        "...",
        "이용해 주셔서 감사합니다!",
        "5초 후 자동으로 메인 화면으로 복귀합니다.",""]);
        
    elif target_num == 6: # 모달-금액에서 시작
        #  출금
        answer_list.extend(["출금을 도와드리겠습니다.", "카드 또는 통장을 넣어주세요.","...",
        "출금하실 금액을 입력해주세요.","모달-금액", "비밀번호를 입력해주세요.", "모달-비밀번호" ,
        "이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])
    elif target_num == 1: # 모달-계좌번호에서 시작
        
        # 송금
        answer_list.extend(["송금을 도와드리겠습니다.",
        "카드 또는 통장을 넣어주세요.","...","송금하실 계좌번호를 입력해 주세요.", "모달-계좌번호", 
        "출금 또는 송금하실 금액을 입력해주세요.", "모달-금액", "비밀번호를 입력해주세요.",
        "모달-비밀번호","이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])

    elif target_num == 3: # 모달-비밀번호에서 시작
    
        #  조회
        answer_list.extend(["계좌조회를 도와드리겠습니다.", "카드 또는 통장을 넣어주세요.", "..." , "비밀번호를 입력해주세요.","모달-비밀번호",
        "이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])
    elif target_num == 4: # 모달-약관에서 시작
        
        # 개설
        answer_list.extend(["계좌개설을 도와드리겠습니다.", "약관을 읽고 동의 버튼을 눌러주세요",
        "모달-약관","신분증을 촬영해 주세요.","이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])
    elif target_num == 5:
        
        # 카드 발급
        answer_list.extend(["카드발급을 도와드리겠습니다.", "발급을 원하시는 카드를 선택해주세요",
        "모달-카드", "약관을 읽고 동의 버튼을 눌러주세요", "모달-약관","신분증을 촬영해 주세요.","이용해 주셔서 감사합니다!","5초 후 자동으로 초기 화면으로 복귀합니다. 안녕히 가십시오.",""])
    elif target_num == 0:
        #  발급
        answer_list.append("다시 말씀해주세요")
    elif target_num == 7:
        #  발급
        if texts == '안녕하세요':
            answer_list.append("안녕하세요")
        elif texts == '반가워요':
            answer_list.append("저도 반가워요")
        elif texts.find("누구") or  texts.find("이름"):
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

def scam_model():
    model = tf.keras.models.load_model('main\model_folder\CNN_second_model2.h5')
    path = './test.wav'
    y, sr = librosa.load(path)
    
    n_fft = int(np.ceil(0.025 * sr))
    win_length = int(np.ceil(0.025 * sr))
    hop_length = int(np.ceil(0.01 * sr))

    S = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=40, win_length=win_length, hop_length=hop_length, n_fft=n_fft)
    
    print(S.shape)
    
    max_num = 14960
    arr_re = []
    
    arr_df = [ list(itertools.chain(*S)) ]
    arr_len = len(arr_df[0])
    avg = sum(arr_df[0]) / arr_len
    
    pred_now = 0
    if arr_len > max_num:
        idx = arr_len//max_num
        for i in range(idx):
            arr_re = []
            for j in range(i*max_num,(i+1)*max_num):
                arr_re.append(arr_df[0][j])

            padded_np = np.array(arr_re)

            b = padded_np.reshape(1, 40, 374)

            re_np = np.expand_dims(b, -1)

            pred = model.predict(re_np)
            print(pred)
            pred_now += pred

        if arr_len % max_num != 0:
            arr_re = []
            for i in range(arr_len - arr_len + idx * max_num, arr_len):
                arr_re.append(arr_df[0][i])
            for i in range(max_num- arr_len % max_num):
                    arr_re.append(avg)
            padded_np = np.array(arr_re)

            b = padded_np.reshape(1, 40, 374)

            re_np = np.expand_dims(b, -1)

            pred = model.predict(re_np)
            print(pred)
            pred_now += pred

        print(pred_now)
        if pred_now > 0.1:
            print(1)
        else:
            print(0)
    else:
        for i in range(arr_len):
            arr_re.append(arr_df[0][i])
        for i in range(max_num-arr_len):
            arr_re.append(avg)

        padded_np = np.array(arr_re)

        b = padded_np.reshape(1, 40, 374)

        re_np = np.expand_dims(b, -1)

        pred = model.predict(re_np)
        print(pred[0])
        pred_now = pred
        if np.round(pred)[0][0] > 0.1:
            print(1)
        else:
            print(0)
        
    
    return pred_now[0]

def emotionclassification() :
    targetlist = ['Angry','Disgust','Fearful','Happy','Neutral','Sad','Surprise','Emergency']
    model = tf.keras.models.load_model('main\model_folder\MelSpectrogramVGG16(2).h5')
    wav_path = './test.wav'
    save_path = './imgtest.png'
    y, sr = librosa.load(wav_path, sr=16000)

    input_nfft = int(round(sr*0.032))    
    input_stride = int(round(sr*0.010))
    
    S = librosa.feature.melspectrogram(y=y, n_mels=40, n_fft=input_nfft, hop_length=input_stride)
    
    print("Wav length: {}, Mel_S shape:{}".format(len(y)/sr,np.shape(S)))
    plt.figure(figsize=(10, 4))
    librosa.display.specshow(librosa.power_to_db(S, ref=np.max), y_axis='mel', sr=sr, hop_length=input_stride, x_axis='time')
    plt.colorbar(format='%+2.0f dB')
    plt.title('Mel-Spectrogram')
    plt.tight_layout()
    plt.savefig(save_path, bbox_inches='tight', pad_inches=0, dpi=300, frameon='false')
    
    img = cv2.imread(save_path)
    img = cv2.resize(img,(224,224))     # resize image to match model's expected sizing
    img = img.reshape(1,224,224,3) # return the image with shaping that TF wants.
    prediction = model.predict(img)

    target_num = np.argmax(prediction[0])
    print(targetlist[target_num],',',target_num)
    
    return [target_num]


def createSound(request):
    
    data = request.body
    url = json.loads(data).get('url')

    binary_data = decode_base64_url(url)
    with open('./test.wav', 'wb') as f:
        f.write(binary_data)
        f.close()
        
    scam_score = scam_model()
    vgg_score = emotionclassification()
    print(scam_score[0], vgg_score[0])
    datas = {
        'scam': scam_score[0].tolist(),
        'vgg' : vgg_score[0].tolist(),
    }
    return JsonResponse(datas)
    
    
    
    
    
    # return redirect('http://127.0.0.1:8000')

def decode_base64_url(url):
    assert url.startswith('data:audio/')
    assert ';base64,' in url
    schema, payload = url.split(',', 1)
    # Maybe parse the schema if you want to know the image's type
    # type = schema.split('/', 1)[-1].split(';', 1)[0]
    return base64.urlsafe_b64decode(payload)