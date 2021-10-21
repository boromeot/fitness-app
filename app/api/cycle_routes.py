from flask import Blueprint
from flask_login import login_required
from app.models import Cycle

cycle_routes = Blueprint('cycles', __name__)

@cycle_routes.route('/<int:userId>')
@login_required
def get_cycles(userId):
  cycles = Cycle.query.filter(Cycle.user_id == userId)
  return [cycle.to_dict() for cycle in cycles]
