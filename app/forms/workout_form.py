from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class WorkoutForm(FlaskForm):
  day = StringField('day', validators=[DataRequired('Day required')])
  user_id = IntegerField('user_id', validators=[DataRequired()])
  routine_id = IntegerField('routine_id', validators=[DataRequired()])
