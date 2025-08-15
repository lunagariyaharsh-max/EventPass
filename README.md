
**Assessment 1 (Total Marks **20**)**

Assignment: **Software requirements analysis and design (**Full-Stack CRUD Application Development with DevOps Practices**)**


---

**Objective**

You have been provided with a starter project that includes user authentication using Node.js, React.js, and MongoDB. Your task is to extend this application by implementing CRUD (Create, Read, Update, Delete) operations of different featuresfor a real-world application of your choice, while following industry best practices such as: 

* **Project Management with JIRA**
* **Requirement Diagram**, **Block Definition Diagram (**BDD), Parametric Diagram using**SysML**
* **Version Control using GitHub**
* **CI/CD Integration for Automated Deployment**

---

**GitHub link of the starter project: **[https://github.com/rajuiit/sdlapps](https://github.com/rajuiit/sdlapps)

---

**Requirement**

1. **Choose a Real-World Application**

We will send you an email to choose a Real-World project. If you face any difficulties in choosing your project, please contact your tutor.

2. **Project Design with SysML and Project Management with JIRA**

* Draw a requirements diagram, Block Definition Diagram (BDD), and Parametric Diagram based on your project (Connect all functional features).
* Create a JIRA project and define:
  * Epic
  * User Stories (features required in your app)
  * Child issues or Subtasks (breaking down development work)
  * Sprint Implementation (organizing work into milestones)
* Provide your JIRA board URL in the project README.

**3. Backend Development (Node.js + Express + MongoDB)**

* Set up and configure the MongoDB database connection.
* Implement various backend functions for handling application data.Ensure that all functions are compatible with an Application Programming Interface (API) structure(Follow existing patterns used in the Task Manager App where applicable).
* Implement CRUD operations forcreating, reading, updating, and deleting records for each functionality.

4. **Frontend Development (React.js)**

* Create a user-friendly interface to interact with your API endpoint (Follow task manager app).
* Implement different forms for adding, updating, and deleting records.
* Display data using tables, cards, or lists (Follow how we showed data in task manager app, try to implement better visualization for the frontend.)

**5. Authentication & Authorization** (Prerequisite Task)

* Ensure only authenticated users can access and perform CRUD operations. (Already developed in your project)
* Use JWT (JSON Web Tokens) for user authentication (Use the task manager one from .env file).

**6. GitHub Version Control & Branching Strategy**

* Use GitHub for version control and maintain:
* main branch (stable production-ready code)
* Feature branches for each new feature
* Follow proper commit messages and pull request (PR) for code reviews.

**7. CI/CD Pipeline Setup**

* Implement a CI/CD pipeline using GitHub Actions to:
* Automatically run tests on every commit/pull request (Optional).
* Deploy the backend to AWS. (Use the QUT provided EC2 instance)
* Deploy the frontend to AWS.
* Document your CI/CD workflow in the README.

---

**Submission Requirements**

**A report **contains** the following (Provide screenshots as evidence for each implemented task. **The screenshot should **contain** your username** from JIRA, GITHUB, and AWS**):

* **JIRA Project **Management**(Provide screenshots in the **report o**f at least two epics**, **including user story, sub**t**a**sks**. **Please **don’t** provide **the **U**ser Authentication** epic**.**Provide your JIRA Board URL in the report and README file as well.**Through the JIRA Board, we will systematically review the completeness of the project features, organised under Epics, User Stories, and Sub-tasks.**
* Requirement diagram, Block Definition Diagram (BDD), Parametric Diagram (Using project features).
* **GitHub Repository (backend/ and frontend/)** link. We will **review** your code implementation, which you followed from the task description. We will also **review** your commits, main branch, feature branches, and pull requests. **(**Please note that the authorisation** (Log In, Registration)** is the prerequisite for backend development.**)**
* CI/CD pipeline details step by step screenshot.
* README.md with:
* Project setup instructions.
* Public URL of your project.
* Provide a project-specific username and password if we need to access your dashboard.

---

**Assessment Criteria:**

* Clarity and completeness of Jira board and SysML models.
* Adherence to Git best practices and practical contributions.
* Successful implementation, deploymentand CI/CD pipeline.
* Problem-solving skills and the ability to go beyond basic requirements.

## Project Overview
The EventPass project is a dynamic web application designed to streamline event management and ticketing, built with a modern tech stack to ensure scalability and user-friendliness. The backend, powered by Node.js and Express, integrates with MongoDB to handle event data, user authentication, and ticket transactions securely via a RESTful API hosted on an AWS EC2 instance (IP: 3.106.242.235). The frontend, developed using React, provides an intuitive interface for users to browse events, purchase tickets, and manage their profiles, with a production build served by Nginx. This project leverages GitHub Actions for CI/CD, utilizing a self-hosted runner on the Ubuntu server to automate testing, building, and deployment, ensuring a robust and efficient development workflow.

## Setup and Deployment
To set up EventPass locally, clone the repository and install dependencies with yarn install in both the backend and frontend directories. Configure the .env file with MONGO_URI=mongodb://127.0.0.1:27017/EventPass, a JWT_SECRET, and PORT=5000, then run pm2 start server.js for the backend and yarn start for the frontend in development. For deployment, the CI/CD pipeline automates the process on the server, building the frontend and starting the backend with PM2, while Nginx serves the static files. Access the live site at http://3.106.242.235:3000, and report issues or contribute via GitHub Issues or Pull Requests. Note that MongoDB must be running, and EC2 security groups should allow ports 80 and 5000.
