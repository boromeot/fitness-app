from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Routine, db, routine


routine_routes = Blueprint('routines', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

#Get all routines by cycle Id
@routine_routes.route('/cycles/<int:cycleId>', methods=['GET'])
@login_required
def get_routines(cycleId):
  routines = Routine.query.filter(Routine.cycle_id == cycleId)
  return jsonify([routine.to_dict() for routine in routines])
