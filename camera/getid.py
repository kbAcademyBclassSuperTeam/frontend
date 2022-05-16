import sys
import cv2
import numpy as np
from django.conf import settings
import datetime
import base64

def openCamera():
    # 카메라로부터 cv2.VideoCapture 객체 생성
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Camera open failed!")
        sys.exit()

    # 프레임 해상도 출력
    print('Frame width:', round(cap.get(cv2.CAP_PROP_FRAME_WIDTH)))
    print('Frame height:', round(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))

    # 매 프레임 처리 및 화면 출력
    while True:
        ret, frame = cap.read()

        if not ret:
            break

        cv2.imshow('frame', frame)
        k = cv2.waitKey(10)

        if k == 27:
            break

        elif k == 13:
            cv2.destroyAllWindows()
            return frame

def reorderPts(pts):
    idx = np.lexsort((pts[:, 1], pts[:, 0]))  # 칼럼0 -> 칼럼1 순으로 정렬한 인덱스를 반환
    pts = pts[idx]  # x좌표로 정렬

    if pts[0, 1] > pts[1, 1]:
        pts[[0, 1]] = pts[[1, 0]]

    if pts[2, 1] < pts[3, 1]:
        pts[[2, 3]] = pts[[3, 2]]

    return pts


# 영상 불러오기
def detection(frame):

    src = frame

    if src is None:
        print('Image load failed!')
        return None

    # 출력 영상 설정
    dw, dh = 720, 400
    srcQuad = np.array([[0, 0], [0, 0], [0, 0], [0, 0]], np.float32)
    dstQuad = np.array([[0, 0], [0, dh], [dw, dh], [dw, 0]], np.float32)
    dst = np.zeros((dh, dw), np.uint8)

    # 입력 영상 전처리
    src_gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    th, src_bin = cv2.threshold(src_gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # 외곽선 검출 및 명함 검출
    contours, _ = cv2.findContours(src_bin, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    for pts in contours:
        # 너무 작은 객체는 제외
        if cv2.contourArea(pts) < 10:
            continue

        # 외곽선 근사화
        approx = cv2.approxPolyDP(pts, cv2.arcLength(pts, True)*0.02, True)

        # 컨벡스가 아니면 제외
        if not cv2.isContourConvex(approx) or len(approx) != 4:
            continue

        print(len(approx))

        cv2.polylines(src, [approx], True, (0, 255, 0), 2, cv2.LINE_AA)
        srcQuad = reorderPts(approx.reshape(4, 2).astype(np.float32))

        pers = cv2.getPerspectiveTransform(srcQuad, dstQuad)
        dst = cv2.warpPerspective(src, pers, (dw, dh), flags=cv2.INTER_CUBIC)

    return dst

def saveImage(dst):
    name = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    encoded_name = base64.b64encode(name.encode('ascii')).decode('ascii')
    cv2.imwrite(settings.MEDIA_ROOT + '\\images\\' + encoded_name + '.jpg', dst)
    print(settings.MEDIA_ROOT + '\\images\\' + encoded_name + '.jpg')