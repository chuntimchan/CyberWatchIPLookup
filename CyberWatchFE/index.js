const ipInput = document.getElementById('ip-input');
const submitButton = document.getElementById('submit-button');
const output = document.getElementById('output');


const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );

  axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=London&key=AIzaSyBVPqWSZP57O9F95DZ1kQtSlqgGEI2nwQw")
  .then((response2) => {
    output.innerText = JSON.stringify(response2);
  });

function handleButton() {
  output.innerText = "";
  document.getElementById('ip').innerText = "";
  document.getElementById('whitelisted').innerText = "";
  document.getElementById('country').innerText = "";
  document.getElementById('isp').innerText = "";
  document.getElementById('domain').innerText = "";
  document.getElementById('distinctUsers').innerText = "";
  document.getElementById('reports').innerText = "";
  document.getElementById('abuseScore').innerText = "";
  document.getElementById('img-whitelist').style.display = "none";
  document.getElementById('numUsers').innerText = "";
  document.getElementById('totalReports').innerText = "";
 

  const ipAddress = "http://localhost:8000/abuse/".concat(ipInput.value);



  axios.get(ipAddress)
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    
    data = JSON.parse(response.data).data;

    //output.innerText = JSON.stringify(data);

    ip_Address = data.ipAddress;
    whiteListed = data.isWhitelisted;
    countryCode = data.countryCode;
    isp = data.isp;
    domain = data.domain;
    distinctUsers = data.numDistinctUsers;
    totalReports = data.totalReports;
    abuseConfidence = data.abuseConfidenceScore

    // output.innerText = "";
    // output.innerText += "\n IP Address: " + ip_Address;
    // output.innerText += "\n WhiteListed: " + whiteListed;
    // output.innerText += "\n Country: " + regionNames.of(countryCode) + " - (" + countryCode + ")";
    // output.innerText += "\n ISP: " + isp;
    // output.innerText += "\n Domain: " + domain;
    // output.innerText += "\n Distinct Users: " + distinctUsers;
    // output.innerText += "\n Total Reports: " + totalReports;
    // output.innerText += "\n Abuse Confidence Score: " + abuseConfidence;

    document.getElementById('ip').innerText = ip_Address;
    document.getElementById('whitelisted').innerText = whiteListed;
    document.getElementById('country').innerText = regionNames.of(countryCode) + " - (" + countryCode + ")";
    document.getElementById('isp').innerText = isp;
    document.getElementById('domain').innerText = domain;
    document.getElementById('distinctUsers').innerText = distinctUsers;
    document.getElementById('reports').innerText = totalReports;
    document.getElementById('abuseScore').innerText = abuseConfidence;
    
    //document.getElementByClass('container').visibility = visible;
    
    //document.getElementByClass("container").style.visibility = "visible";

    // output.innerText += "\n " + JSON.stringify(response);
    // output.innerText+="\n" + data.substring((startChar+13),(startChar+17) );

    if(whiteListed){
      document.getElementById('img-whitelist').src = "images/tick.png";
      document.getElementById('img-whitelist').alt = "Green Tick";
      document.getElementById('img-whitelist').style.display = "block";
      document.getElementById('totalReports').style.color = "green";
      document.getElementById('numUsers').style.color = "green";

    } else{
      document.getElementById('img-whitelist').src = "images/cross.png";
      document.getElementById('img-whitelist').alt = "Red Cross";
      document.getElementById('img-whitelist').style.display = "block";
      document.getElementById('img-whitelist').style.display = "block";
      document.getElementById('totalReports').style.color = "red";
      document.getElementById('numUsers').style.color = "red";
    }

    document.getElementById('numUsers').innerText = distinctUsers;
    document.getElementById('totalReports').innerText = totalReports;
   

  })
  .catch(function(error){
    //output.innerText = "Error: Invalid IP Address";
  });
  ipInput.value = "";

  
}

submitButton.onclick = handleButton;




// fancy css background
function createBackground(depth) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() * canvas.width);
      const y = (Math.random() * canvas.height);
      context.fillStyle = `rgb(${depth},${depth},${depth})`;
      context.fillRect(x,y,1,1);
    }
    canvas.toBlob((blob) => {
      return resolve(URL.createObjectURL(blob));
    }, "image/png");
  });
}

const bgs = [];

let sx = 0, sy = 0;

function frame() {
  sx += 2;
  sy += 2;

  document.body.style.backgroundPositionX = bgs.map((bg, index, list) => {
    return `${sx * (index + 1) * (1 / list.length)}px`;
  }).join(",");
  document.body.style.backgroundPositionY = bgs.map((bg, index, list) => {
    return `${sy * (index + 1) * (1 / list.length)}px`;
  }).join(",");

  requestAnimationFrame(frame);
}

Promise.all([
  createBackground(128),
  createBackground(192),
  createBackground(256)
]).then(([bg0,bg1,bg2]) => {
  requestAnimationFrame(frame);
  bgs.push([bg0],[bg1],[bg2]);
  document.body.style.backgroundImage = bgs.map(([url]) => `url(${url})`).join(",");
  console.log(bg0,bg1,bg2);
});