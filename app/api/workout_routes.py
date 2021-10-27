from flask import Blueprint, jsonify, request
from app.api.auth_routes import login
from app.forms.workout_form import WorkoutForm
from flask_login import login_required, current_user
from app.models import Workout, db, workout


workout_routes = Blueprint('workouts', __name__)

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
def post_workout():
	form = WorkoutForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit():
		workout = Workout(
			day = form.data['day'],
			user_id = form.data['user_id'],
			routine_id = form.data['routine_id']
		)
		db.session.add(workout)
		db.session.commit()
		return workout.to_dict()
	return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@workout_routes.route('/weekly', methods=['POST'])
@login_required
def post_weekly_workouts():
	form = WorkoutForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit():
		days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
		workouts = []
		for day in days:
			workout = Workout(
				day = day,
				user_id = form.data['user_id'],
				routine_id = form.data['routine_id']
			)
			db.session.add(workout)
			db.session.commit()
			workouts.append(workout.to_dict())
		return jsonify(workouts)
	return {'errors': validation_errors_to_error_messages(form.errors)}, 401
