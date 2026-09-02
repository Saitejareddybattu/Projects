from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)
# API_URL = "http://127.0.0.1:8000/feedback/"
# API_URL = "http://fastapi-container:8000/feedback/"
# API_URL = "http://fastapi-backend:8000/feedback/" # ← change this if using Docker-compose 
API_URL = "http://backend-service:8000/feedback/" #for kubernetes, use the service name defined in the deployment YAML
# API_URL = "http://localhost:8000/feedback/"

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        data = {
            "name": request.form["name"],
            "email": request.form["email"],
            "message": request.form["message"]
        }
        requests.post(API_URL, json=data)
        return redirect("/")
    return render_template("index.html")

@app.route("/view-feedback", methods=["GET"])
def view_feedback():
    response = requests.get(API_URL)
    feedback_list = response.json()
    return render_template("feedback_list.html", feedback=feedback_list)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
