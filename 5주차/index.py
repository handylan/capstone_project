from flask import (
    Flask,
    request,
    redirect,
    url_for,
    session,
    jsonify
)
from flask_cors import CORS
from db import *
import json
from random import random

# Flask 앱 설정
app = Flask(__name__)
app.secret_key = "your_secret_key"
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# 고정된 로그인 정보
FIXED_USER_ID = "admin"
FIXED_PASSWORD = "aict2024!!"
FIXED_PASSPHRASE = "AICT"

# 메인 페이지: 로그인 폼
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        data = request.get_json()
        id = data.get('id')
        password = data.get('password')
        code = data.get('code')

        if not all([id, password, code]):
            return jsonify({"message": "아이디, 비밀번호, 암구호는 필수 입력 항목입니다."}), 400

        # 입력값이 고정된 값과 일치하는지 확인
        if (
            id == FIXED_USER_ID
            and password == FIXED_PASSWORD
            and code == FIXED_PASSPHRASE
        ):
            session["user_id"] = id
            session["is_admin"] = True  # 관리자 권한으로 설정

            return jsonify({'message':'로그인 성공'}), 200
            # return redirect(url_for("device_status"))
        else:
            return jsonify({'message':'부적절한 아이디 또는 패스워드, 암구호 입니다.'}), 403

# 기기 상태 조회 페이지
@app.route("/device_status")
def device_status():
    if "user_id" not in session or not session.get("is_admin"):
        return redirect(url_for("index"))
    devices = get_all_device_status()
    return json.dumps([dict(row) for row in devices])
    #return render_template("device_status.html", devices=[dict(row) for row in devices])


# 기기 상태 조회 페이지
@app.route("/status_devices")
def status_devices():
    if "user_id" not in session or not session.get("is_admin"):
        return redirect(url_for("/"))
    devices = get_all_device_status()
    print(devices)
    print(json.dumps([dict(row) for row in devices], indent=4))
    return json.dumps([dict(row) for row in devices], indent=4)


# 삭제 처리 경로 추가
@app.route("/delete_device/<int:device_id>", methods=["POST"])
def delete_device_route(device_id):
    if "user_id" not in session or not session.get("is_admin"):
        return redirect(url_for("index"))

    # 기기 삭제 처리 호출
    delete_device(device_id)

    # 삭제 후 기기 상태 페이지로 리다이렉트
    return redirect(url_for("device_status"))


if __name__ == "__main__":
    create_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
