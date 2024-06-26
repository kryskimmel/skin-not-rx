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
- [Live Link](https://skinnotrx-sn2d.onrender.com)


<h2 id="about-section">ABOUT</h2>

*Skin-not-Rx* is an app designed to keep track of every skincare product you have— currently and previously. With its simplistic user interface, you can easily add your products and skincare routines in a collection that describes them best. Keeping track of the products you have, the products you love, and the products that you wouldn't bother purchasing again shouldn't be hard... and those are the conveniences that *Skin-not-Rx* aims to provide.


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
<img width="1725" alt="splashpage-no-user" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/9201f90f-b24e-4120-8f50-798bbb5f58e7">


<h4>Sign Up</h4>
<img width="1725" alt="signup" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/c6894c12-b412-4420-a0cc-9b1de1bcb727">

<h4>Search</h4>
<img width="1725" alt="search" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/323c8cb9-b253-4b79-ab8a-d3b63db542c8">


<h4>Product detail</h4>
<img width="1725" alt="product-detail" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/64bc1629-efc0-4a03-ba69-a6ef3008ac6f">


<h4>Favorites</h4>
<img width="1725" alt="favorites" src="https://github.com/kryskimmel/skin-not-rx/assets/121524927/9cc114da-f7b1-4afd-8cb6-2a5f8b17d5e6">



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

 - Icons by <a href="https://iconify.design/"><i>Iconify</i></a>
 - Background Image (Splash Page) by <a href="https://copilot.microsoft.com/images/create"><i>Microsoft Copilot</i></a>
