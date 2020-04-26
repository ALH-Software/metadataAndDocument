# Django Sample - Metadate & Documents
A simple example of Django

## About my project
You can: 
Signup (parameters: email and password)
1. Login (parameters: email and password)
2. Upload Metadata (parameters: name and string)
3. Get all Metadata
4. Get Metadata (parameter: name)
5. Upload Document (parameters: name and file)
6. Get Documents
7. Get Document (parameter: name)browser. All 

The endpoints except Signup and Login are authenticated using JWT.


## Installation

First of all, You should download the source code for this project and run it on your local machine.

Of course, you should have python 3 installed on your PC.

Now installing Django

```bash
pip install Django
```

Installing django rest framework

```bash
pip install djangorestframework
```

Adding CORS headers allows your resources to be accessed on other domains:

```bash
pip install django-cors-headers
```

## Run the project

Now make migrations for the model. Go to the base folder containing ```manage.py``` and run

```bash
python manage.py makemigrations
```

Now migrate this file to create a database structure for this.

```bash
python manage.py migrate
```

Now, run the web server:

```bash
python manage.py runserver
```

and then browser the: 

```bash
http://127.0.0.1:8000
```


## Details
Project has APIs for the above functionalities, in addition to front-end using jQuery.

### Available URLs

```json
1. admin/
2. api/
3. api-auth/
4. register
5. login
6. document
7. document/add
8. document/<document_name>
9. metadata
10. metadata/add
11. metadata/<document_name>
12. api/token/
13. api/token/refresh/
```

---