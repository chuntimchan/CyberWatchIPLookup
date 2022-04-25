import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests

app = FastAPI()

# This is so we can access this API from our front-end
# react application. This code will ensure we have a CORS
# header in every response for the allowed origins.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Our secrets are specified in the .env file. This may be hidden in
# your file manager if you are using macOS or a Linux distro.

# We load these variables from the file into our environment using
# the dotenv library when the application starts up and read them
# so we can use the keys in our app.
load_dotenv()
ABUSEIPDB_API_KEY = os.getenv("ABUSEIPDB_API_KEY")


@app.get("/")
async def root():
    return "Welcome to our COOL API"


# The annotation exposes this function to the network.
# You can call this function through the network by calling
# https://localhost:8000/abuse/{ip} where {ip} should be
# an IP address string. Run this project and try it in your
# web browser.
#
# This is here as an example to use for calling other web APIs
# in your project.
@app.get("/abuse/{ip}")
async def abuse(ip: str):
    data = requests.get(
        "https://api.abuseipdb.com/api/v2/check",
        params={"ipAddress": ip},
        headers={"Key": ABUSEIPDB_API_KEY, "Accept": "application/json"}
    )
    return data.content
