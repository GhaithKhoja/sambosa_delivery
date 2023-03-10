"""REST API for available resources."""
from flask import jsonify, request, abort
import sambosa

@sambosa.app.route('/api/v1/resources/', methods=['GET'])
def get_resources():
    """Return a JSON response of current sambosa stock."""
    return jsonify(**{'sambosa_count': sambosa.sambosa_count})

@sambosa.app.route('/api/v1/resources/', methods=['POST'])
def post_resources():
    """Update how many sambosas Ghaith can currently distribute."""
    # Get the new sambosa stock from the URL args
    sambosa_stock = request.args.get('stock')
    if not sambosa_stock:
        abort(400)
    # Set the new stock
    sambosa.sambosa_count = sambosa_stock
    # Return success and new sambosa count
    return 200, jsonify(**{'sambosa_count': sambosa.sambosa_count})