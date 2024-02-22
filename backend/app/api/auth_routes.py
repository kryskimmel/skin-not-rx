from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.awsS3 import upload_file_to_s3, get_unique_filename, allowed_file

auth_routes = Blueprint('auth', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    try:
        if form.validate_on_submit():
        # Checks to see if there is an image to update from Redux
            if "profile_image" in request.files:
                # Grabs the image
                profile_image = request.files["profile_image"]
                if not allowed_file(profile_image.filename):
                    return {"errors" : ["Image file type not permitted"]}, 400

            # preparing and sending image to AWS
            profile_image.filename = get_unique_filename(profile_image.filename)
            upload = upload_file_to_s3(profile_image)

            if "url" not in upload:
                return upload, 400
            url = upload["url"]

            user = User(
                first_name=form.data['first_name'],
                last_name=form.data['last_name'],
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                profile_image=url,
                skin_type=form.data["skin_type"]
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict(), 201

    except Exception as e:
        return {'error': str(e)}, 400
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
