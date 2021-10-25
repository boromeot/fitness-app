from flask import Blueprint, jsonify, request
from app.api.auth_routes import login
from app.forms.routine_form import RoutineForm
from flask_login import login_required, current_user
from app.models import Routine, cycle, db


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


@routine_routes.route('/', methods=['POST'])
@login_required
def post_routine():
  form = RoutineForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    routine = Routine(
      name = form.data['name'],
      user_id = form.data['user_id'],
      cycle_id = form.data['cycle_id']
    )
    db.session.add(routine)
    db.session.commit()
    return routine.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@routine_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_routine(id):
  routine = Routine.query.get(id)
  if current_user.id == routine.user_id:
    db.session.delete(routine)
    db.session.commit()
    return {'message': 'Successfully deleted routine'}
  else:
    return {'errors': ['Unathorized']}
