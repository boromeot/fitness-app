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
  
