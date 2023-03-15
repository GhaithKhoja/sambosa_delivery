"""REST API for orders."""
import random
import requests
from flask import request, abort
import sambosa

@sambosa.app.route('/api/v1/order/', methods=['POST'])
def post_order():
    """Posts an order and returns the order info."""
    # Get request inputs
    sambosa_order = int(request.args.get("request"))
    if not sambosa_order or sambosa_order > sambosa.sambosa_count:
        abort(400)
    address = request.args.get("address")
    if not address:
        abort(400)
    zip = request.args.get("zip")
    if not zip:
        abort(400)
    phone = request.args.get("phone")
    if not phone:
        abort(400)
    instructions = request.args.get("instructions")
    if not instructions:
        instructions = ""
        
    # Generate ID for order
    request_id = 'sambosa-' + str(random.randint(1000, 9999))
    
    # Make order
    request_body = { # Modify pickup and drop off addresses below
    "external_delivery_id": request_id,
    "pickup_address": "413 E Huron St Ann Arbor, MI 48104",
    "pickup_business_name": "Ghaith's Sambosa Factory",
    "pickup_phone_number": "+12068494905",
    "pickup_instructions": "Enter gate code 1234 on the callbox.",
    "dropoff_address": address + f', MI {zip}',
    "dropoff_phone_number": "+1" + phone,
    "dropoff_instructions": "Enter gate code 1234 on the callbox.",
    "order_value": sambosa_order
    }
    
    # POST delivery request
    delivery_details = requests.post(sambosa.endpoint, headers=sambosa.app.config["HEADERS"], json=request_body) # Create POST request
    
    # If status code not 200 abort
    if delivery_details.status_code != 200:
        abort(delivery_details.status_code)
        
    # Deduct sambosas from inventory
    sambosa.sambosa_count -= sambosa_order

    # Return
    return delivery_details.json(), 200

@sambosa.app.route('/api/v1/order/', methods=['GET'])
def get_order():
    """Gets an order details and returns the order info."""
    # Get request inputs
    order_id = request.args.get("ID")
    if not order_id:
        abort(400)
    
    # GET delivery details
    response = requests.get(sambosa.endpoint + order_id, headers=sambosa.app.config["HEADERS"]) # Create GET request
    delivery_details = response.json()
    
    # If status code not 200 abort
    if response.status_code != 200:
        abort(response.status_code)

    # Add google map api key
    delivery_details['map_api_key'] = sambosa.app.config["MAP_API_KEY"]
    
    # Return
    return delivery_details, 200