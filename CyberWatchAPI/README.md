# Hackathon Example API

Back-end setup previously mentioned in the main Read.Me file

## Setup

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
