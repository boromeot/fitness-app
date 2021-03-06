from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cycle, db
from app.forms import CycleForm

cycle_routes = Blueprint('cycles', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

#Get all cycles by user Id
@cycle_routes.route('/<int:userId>', methods=['GET'])
@login_required
def get_cycles(userId):
  cycles = Cycle.query.filter(Cycle.user_id == userId)
  return jsonify([cycle.to_dict() for cycle in cycles])

@cycle_routes.route('/' , methods=['POST'])
@login_required
def post_cycle():
  form = CycleForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    cycle = Cycle(
      name = form.data['name'],
      user_id = form.data['user_id']
    )
    db.session.add(cycle)
    db.session.commit()
    return cycle.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@cycle_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_cycle(id):
  cycle = Cycle.query.get(id)
  if current_user.id == cycle.user_id:
    db.session.delete(cycle)
    db.session.commit()
    return {'message': 'Successfully deleted cycle'}
  else:
    return {'errors': ['Unathorized']}


@cycle_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_cycle(id):
  form = CycleForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    cycle = Cycle.query.get(id)
    if current_user.id == cycle.user_id:
      cycle.name = form.data['name']
      db.session.commit()
      return cycle.to_dict()
    else:
      return {'errors': ['Unathorized']}
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
