"""sambosa package initializer."""
import flask
# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name
# Read settings from config module (sambosa/config.py)
app.config.from_object('sambosa.config')
# Overlay settings read from a Python file whose path is set in the environment
# variable sambosa_SETTINGS. Setting this environment variable is optional.
# Docs: http://flask.pocoo.org/docs/latest/config/
#
# EXAMPLE:
# $ export sambosa_SETTINGS=secret_key_config.py
app.config.from_envvar('sambosa_SETTINGS', silent=True)
# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.
import sambosa.views  # noqa: E402  pylint: disable=wrong-import-position
import sambosa.api  # noqa: E402  pylint: disable=wrong-import-position
# Number of sambosas Ghaith will distribute
sambosa_count = 30
