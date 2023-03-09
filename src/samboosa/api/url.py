"""REST API for urls."""
from flask import jsonify
import sambosa

@sambosa.app.route('/api/v1/', methods=['GET'])
def get_resources():
    """Return a JSON response of all sambosa API urls."""
    return jsonify(**{'url': '/api/v1/'})