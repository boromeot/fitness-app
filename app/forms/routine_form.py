from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class RoutineForm(FlaskForm):
  name = StringField('name', validators=[DataRequired('Name required')])
  user_id = IntegerField('user_id', validators=[DataRequired()])
  cycle_id = IntegerField('cycle_id', validators=[DataRequired()])
