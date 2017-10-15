from flask import *
import socket

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/images/<path:path>')
def get_assets(path):
    return send_from_directory('static/resources', path)


if __name__ == '__main__':
    print(" * Running on http://" + socket.gethostbyname(socket.gethostname()) + ":5000/")
    print(" * Running on http://localhost:5000/")
    app.run(
        debug=True,
        host='0.0.0.0',
    )
