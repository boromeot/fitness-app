from flask import Blueprint, jsonify, request
from app.api.auth_routes import login
from flask_login import login_required, current_user
from app.models import Exercise, db


workout_routes = Blueprint('routines', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@workout_routes.route('/', methods=['POST'])
@login_required
def post_exercise():
