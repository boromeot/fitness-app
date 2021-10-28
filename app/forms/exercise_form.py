from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ExerciseForm(FlaskForm):
  name = StringField('name', validators=[DataRequired('Name required')])
  body_part = StringField('name', validators=[DataRequired('Body part name required')])
  user_id = IntegerField('user_id', validators=[DataRequired()])
  work_id = IntegerField('work_id', validators=[DataRequired()])
