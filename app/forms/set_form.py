from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError

class SetForm(FlaskForm):
  completed_reps = IntegerField('completed_reps')
  total_reps = IntegerField('total_reps', validators=[DataRequired('Total reps required')])
  weight = FloatField('weight', validators=[DataRequired('Weight required')])
  unit = StringField('unit', validators=[DataRequired('Unit required')])
  user_id = IntegerField('user_id', validators=[DataRequired()])
  exercise_id = IntegerField('exercise_id', validators=[DataRequired()])
