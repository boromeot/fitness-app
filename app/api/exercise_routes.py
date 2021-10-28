from flask import Blueprint, jsonify, request
from app.api.auth_routes import login
from app.forms.exercise_form import ExerciseForm
from flask_login import login_required, current_user
from app.models import Exercise, db

exercise_routes = Blueprint('exercises', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@exercise_routes.route('/', methods=['POST'])
@login_required
def post_exercise():
  form = ExerciseForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    exercise = Exercise(
      name = form.data['name'],
      body_part = form.data['body_part'],
      user_id = form.data['user_id'],
      work_id = form.data['work_id']
    )
    db.session.add(exercise)
    db.session.commit()
    return exercise.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@exercise_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_exercise(id):
  exercise = Exercise.query.get(id)
  if current_user.id == exercise.user_id:
    db.session.delete(exercise)
    db.session.commit()
    return {'message': 'Successfully deleted routine'}
  else:
    return {'errors': ['Unathorized']}
