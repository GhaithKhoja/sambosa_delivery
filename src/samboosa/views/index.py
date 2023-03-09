"""sambosa index (main) view.

URLs include: /
"""
from flask import render_template
import sambosa


@sambosa.app.route('/')
def index():
    """Display / route."""
    # Render template
    return render_template("index.html")
