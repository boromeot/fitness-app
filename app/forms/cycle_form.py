from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Cycle

class CycleForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  user_id = IntegerField('user_id', validators=[DataRequired()])
