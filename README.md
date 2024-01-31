# Skin-not-Rx
## NAVIGATION
- [About](#about-section)
- [Technologies Used](#technologies-used-section)
- [Database Schema](https://github.com/kryskimmel/skin-not-rx/wiki/Database-Schema)
- [Routes](https://github.com/kryskimmel/skin-not-rx/wiki/Frontend-Routes)
- [User Stories](https://github.com/kryskimmel/skin-not-rx/wiki/User-Stories)
- [Screenshots](#screenshots-section)
- [Getting Started](#getting-started-section)
- [Helpful Commands](#helpful-commands-section)
- [AWS S3 Setup Instructions](https://github.com/kryskimmel/skin-not-rx/wiki/AWS-S3-Setup-Instructions)
- [Acknowledgments](#acknowledgments-section)


<h2 id="about-section">ABOUT</h2>

*Skin-not-rx* is an app designed to keep track of every skincare product you have— currently and previously. With its simplistic user interface, you can easily add your products and skincare routines in a collection that describes them best. Not sure which product to implement into your routine? Then why not get a random recommendation using the random product generator. Curious to see what products or routines others have? You can explore that too! Keeping track of what products you have, products you've loved, and products that you wouldn't bother purchasing again shouldn't be hard... and those are the conveniences that *Skin-not-rx* aims to provide.


<h2 id="technologies-used-section">Technologies Used</h2>

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)


<h2 id="screenshots-section">SCREENSHOTS</h2>

<h4>Splash page</h4>
<img width="1728" alt="splashpage" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/d25d4e0c-3cb6-4ca9-9779-55b6784c2305">

<h4>Search</h4>
<img width="1728" alt="search" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/55ec1286-4fdc-425e-b482-22409ad87f49">

<h4>Product detail</h4>
<img width="1728" alt="product-detail" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/7500d37c-eaf1-4254-a53f-877733183cc8">

<h4>Collection detail</h4>
<img width="1728" alt="collection-detail" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/c82d3f12-5239-4266-8f51-f22621d17ab9">


<h2 id="getting-started-section">Getting Started</h2>

### I. Clone the repository:
`git clone https://github.com/kryskimmel/skin-not-rx.git`
### II. Install the dependencies (in root directory):
`pipenv install -r requirements.txt`
### III. Set up your environmental variables:
1. Run: `echo > ".env"`
2. Open the _.env.example_ file and copy its contents into your newly created _.env_ file
3.  Replace placeholder values with actual values for S3-related keys (See the [AWS S3 Setup Instructions](#https://github.com/wtorresjr/Craftsy-Etsy-Clone/wiki/AWS-S3-Setup-Instructions) page)

### IV. Run the following commands:
#### To run the backend server of application:
1. Enter your virtual environment: `pipenv shell`
2. Migrate your database: `flask db upgrade`
3. Seed your database: `flask seed all`
4. Run your server: `flask run`

#### To run the frontend of application:
5. In another terminal, change directory into _react-app_: `cd react-app`
6. Install node modules: `npm install`
7. Run your application: `npm start`


<h2 id="helpful-commands-section">Helpful Commands</h2>
<table>
  <thead>
    <tr>
      <th scope="col">Command</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
    <tbody>
    <tr>
      <th scope="row">pipenv shell</th>
      <td>Automatically activates a virtual environment specifically for your project, keeping any dependencies installed isolated.
      <br>
      <br>
      Run <b>deactivate</b> to exit the virtual environment and return to your shell environment.
      </td>
    </tr>
    <tr>
      <th scope="row">pipenv run</th>
      <td>Can activate a virtual environment and run commands like the <b>pipenv shell</b> command; however flask commands must be prepended with this command (e.g., <i>pipenv run flask db upgrade</i> and <i>pipenv run flask run</i>).
      </td>
    </tr>
    <tr>
      <th scope="row">flask run</th>
      <td>When prepended with <b>pipenv run</b>, it activates a virtual environment for your project.
      <br>
      <br>
      Press <b>CTRL + C</b> to exit the virtual envrionment and return to your shell environment.
      </td>
    </tr>
    <tr>
      <th scope="row">flask db upgrade</th>
      <td>Syncs the database schema.</td>
    </tr>
    <tr>
      <th scope="row">flask db downgrade</th>
      <td>Reverts the database schema to the previous state. This is run, followed by <b>flask db upgrade</b> to update the application with any schema changes.</td>
    </tr>
    <tr>
      <th scope="row">flask seed all</th>
      <td>Populates the database with seed file data.</td>
    </tr>
  </tbody>
</table>

<br>
<h3 id="acknowledgments-section">Acknowledgments</h3>

 - Icons by <a href="https://iconify.design/docs/icon-components/react/](https://iconify.design/"><i>Iconify</i></a>
 - Background Image (Splash Page) by <a href="https://openai.com/dall-e-2"><i>DALL·E 2</i></a>
