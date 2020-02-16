#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
import uuid
from flask import Flask, render_template
from models import storage


# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5001
host = '0.0.0.0'


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """
    after each request, this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session
    """
    storage.close()


@app.route('/2-hbnb')
def hbnb_filters(id=None):
    """
    handles request to custom template with states, cities & amentities
    """
    states = {state.name: state for state in storage.all('State').values()}
    users = {user.id: "{} {}".format(user.first_name, user.last_name)
             for user in storage.all('User').values()}

    return render_template('2-hbnb.html',
                           states=states,
                           amens=storage.all('Amenity').values(),
                           places=storage.all('Place').values(),
                           users=users,
                           cache_id=uuid.uuid4())


if __name__ == "__main__":
    app.run(host=host, port=port)
