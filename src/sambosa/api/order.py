"""REST API for orders."""
import random
import requests
from flask import request, abort
import sambosa

@sambosa.app.route('/api/v1/order/', methods=['POST'])
def post_order():
    """Posts an order and returns the order ID."""
    # Get request inputs
    sambosa_order = int(request.args.get("request"))
    if not sambosa_order or sambosa_order > sambosa.sambosa_count:
        print('1')
        abort(400)
    address = request.args.get("address")
    if not address:
        print('2')
        abort(400)
    zip = request.args.get("zip")
    if not zip:
        print('3')
        abort(400)
    phone = request.args.get("phone")
    if not phone:
        print('=4')
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