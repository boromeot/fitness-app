from logging import log
from typing import Set
from flask import Blueprint, jsonify, request
from app.api.auth_routes import login
from app.forms.set_form import SetForm
from flask_login import login_required, current_user
from app.models import Set, db

set_routes = Blueprint('sets', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@set_routes.route('/', methods=['POST'])
@login_required
def post_set():
  form = SetForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    set = Set(
      total_reps = form.data['total_reps'],
      weight = form.data['weight'],
      unit = form.data['unit'],
      user_id = form.data['user_id'],
      exercise_id = form.data['exercise_id']
    )
    db.session.add(set)
    db.session.commit()
    return set.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@set_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_set(id):
  set = Set.query.get(id)
  if current_user.id == set.user_id:
    db.session.delete(set)
    db.session.commit()
    return {'message': 'Successfully deleted set'}
  else:
    return {'errors': ['Unathorized']}

@set_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_set(id):
  form = SetForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    set = Set.query.get(id)
    if current_user.id == set.user_id:
      set.completed_reps = form.data['completed_reps'],
      set.total_reps = form.data['total_reps'],
      set.weight = form.data['weight'],
      set.unit = form.data['unit'],
      db.session.commit()
      return set.to_dict()
    else:
      return {'errors': ['Unathorized']}
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
