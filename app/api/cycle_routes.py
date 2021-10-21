from flask import Blueprint
from flask.json import jsonify
from flask_login import login_required
from app.models import Cycle

cycle_routes = Blueprint('cycles', __name__)

@cycle_routes.route('/<int:userId>')
@login_required
def get_cycles(userId):
  print('--------------------')
  print(type(userId))
  cycles = Cycle.query.filter(Cycle.user_id == userId)
  print('good')
  return jsonify([cycle.to_dict() for cycle in cycles])
