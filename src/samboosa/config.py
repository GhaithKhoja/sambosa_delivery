"""sambosa development configuration."""
import pathlib
# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'
# Secret key for encrypting cookies
SECRET_KEY = b"9,|\xbb\xe3\xc0>\xacb\xdc\x96X\xbd\x9e\x0e\xc3e\x91'\xaf^:RV"
SESSION_COOKIE_NAME = 'login'
# File Upload to var/uploads/
sambosa_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = sambosa_ROOT / 'var' / 'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024
