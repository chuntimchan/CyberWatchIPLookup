# IBM Hackathon Project - Cyber Watch

This project was created during an IBM Hackathon hosted by Ulster University.

Project outline: https://hackathon-docs.pages.dev/docs/intro


Front-End

The front end consists of index.html, index.css and index.js . The front end is relatively simple, it formats the information given through the ip lookup AbuseIPDB API and displays it nicely on the web application.

![Preview of FrontEnd](https://github.com/SilverStoneBBQ/CyberWatchIPLookup/blob/main/CyberWatchSS1.PNG?raw=true)


Back-End Setup

This is a FastAPI project that allows us to access information from AbuseIPDB bypassing CORS.

This file shows how to setup the backend which is used by the front-end project. 

For this to work you would need to make your front-end go live at localhost:5500 to allow our code which works around CORS to work.
You will also need to change the API key to your API key, you could either put an env file in or directly manipulate it and set the api variable to your API key string.

## Setup - Windows

To get started, you will need to create a virtual environment where your packages will live.
To do this, run:

```shell
python3 -m venv venv
```

Then activate the virutal environment:

```shell
./venv/scripts/activate
```

Install all the packages listed in the `requirements.txt` file.

```shell
python3 -m pip install -r requirements.txt
```

## Run

You can now run your python project. To start a FastAPI project, run:

```shell
uvicorn main:app --reload
```

You should then be able to access the API at `localhost:8000`.
