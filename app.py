from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

# Rota principal para exibir o dashboard
@app.route("/")
def index():
    return render_template("index.html")

# Rota para buscar projetos do GitHub
@app.route("/api/projects")
def get_projects():
    GITHUB_API_URL = "https://api.github.com/users/anderson-tec445/repos"
    try:
        response = requests.get(GITHUB_API_URL)
        response.raise_for_status()
        projects = response.json()
        return jsonify(projects)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
