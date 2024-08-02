var ap_status = "off"
var dms_state = false
var drive = "awd" 

function printCurrentTime() {
    let currentDate = new Date();

    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');

    let period = hours >= 12 ? 'PM' : 'AM';

    hours = (hours % 12) || 12; 

    let timeString = `${hours}:${minutes}${period}`;

    if (document.getElementById('clock')) {
        document.getElementById('clock').querySelector('h3').textContent = timeString;
    } else {
        return timeString
    }
    
}

printCurrentTime();
setInterval(printCurrentTime, 1000);

async function getWeather(city) {
    try {
        const apiURL = "https://api.weatherapi.com/v1/current.json?key=f45da337f5894b59877165507241206&q=" + city
        const response = await fetch(apiURL)
        const data = await response.json()
        if (!response.ok) {
            console.log(data.description);
            return;
        }
        console.log(data)
        console.log(Math.round(data["current"]["temp_c"]))
        let temp = (Math.round(data["current"]["temp_c"]))
        document.getElementById('outside-temp').querySelector('h3').textContent = `${temp}°C`;
    }
    catch (error) {
        console.log(error)
    }
    
  }

getWeather("Waterloo");

setInterval(() => {
    getWeather("Waterloo");
}, 36000);



async function getAQI() {
    try {
        const apiKey = '32b5be779a42161718091ef0b02e792e8e7e782a';
        const location = 'Waterloo';
        const apiUrl = `https://api.waqi.info/feed/${location}/?token=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (!response.ok) {
            console.log(data.description);
            return;
        }
        console.log(data["data"]["aqi"])
        let aqi = (data["data"]["aqi"])
        document.getElementById('aqi').querySelector('h3').textContent = `${aqi}`;
        const aqiElement = document.getElementById('aqi').querySelector('h3');
        if (aqi >= 0 && aqi <= 50) {
            aqiElement.style.backgroundColor = '#009966';
        } else if (aqi >= 51 && aqi <= 100)  {
            aqiElement .style.backgroundColor = '#FFDE33';
        } else if (aqi >= 101 && aqi <= 150)  {
            aqiElement .style.backgroundColor = '#FF9933';
        } else if (aqi >= 151 && aqi <= 200)  {
            aqiElement .style.backgroundColor = '#CC0033';
        } else if (aqi >= 201 && aqi <= 300)  {
            aqiElement .style.backgroundColor = '#660099';
        } else {
            aqiElement .style.backgroundColor = '#7E0023';
        }
    }
    catch (error) {
        console.log(error)
    }
    
  }

getAQI("Waterloo")


setInterval(() => {
    getAQI("Waterloo");
}, 10000);

var home_state = false
var map_state = false
var camera_state = false
var parking_state = false

document.querySelector('#home').onclick = function() {

    map_state = false
    camera_state = false
    parking_state = false
    getAQI("Waterloo")
    
    if (document.getElementById("transparent")) {
        document.getElementById("transparent").remove()
    }

    if (home_state == true) {
    } else {
        home_state = true
        
        const mapLogo = document.getElementById('map');
        mapLogo.style.backgroundColor = "white"
        const mapElement = document.querySelector('#map img');
        mapElement.src = "map-black.svg";
        mapLogo.style.borderRadius = "0"

        const homeLogo = document.getElementById('home');
        if (window.getComputedStyle(homeLogo).backgroundColor == 'rgb(49, 49, 49)') {
            return None
        }
        homeLogo.style.backgroundColor = '#313131';
        const homeElement = document.querySelector('#home img');
        homeElement.src = "home-white.svg";

        const cameraLogo = document.getElementById("camera");
        cameraLogo.style.backgroundColor = 'white'
        const cameraElement = document.querySelector("#camera img")
        cameraElement.src = "camera-black.svg"

        const parkingLogo = document.getElementById("parking");
        parkingLogo.style.backgroundColor = 'white'
        const parkingElement = document.querySelector("#parking img")
        parkingElement.src = "parking-black.svg"

        var mainInner = document.querySelector('.main-inner');
        console.log("failure 1")
        mainInner.id = "transparent"

        setTimeout(function() {
            // Remove all children nodes
            while (mainInner.firstChild) {
                mainInner.removeChild(mainInner.firstChild);
            }
        }, 200); 

        setTimeout(() => mainInner.remove(), 200);

        setTimeout(function() 
            {
            var new_mainInner = document.createElement("div")
            new_mainInner.classList.add("main-inner")
            var br = document.createElement("br")
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var clock_text_1 = document.createTextNode("Current")
            var clock_text_2 = document.createTextNode("Time")
            const mainElement = document.querySelector('.main');

            
            // car
            var car = document.createElement("div")
            car.id = "car"
            var fwd = document.createElement("div")
            var rwd = document.createElement("div")
            var lyriq = document.createElement("img")
            lyriq.src = "lyriq.png"
            lyriq.id = "lyriq"
            fwd.classList.add("fwd")
            rwd.classList.add("rwd")
            car.appendChild(fwd)
            car.appendChild(rwd)
            car.appendChild(lyriq)
            new_mainInner.appendChild(car)
            if (drive == "awd") {
                rwd.style.display = "block"
                fwd.style.display = "block"
            }
            if (drive == "rwd") {
                rwd.style.display = "block"
                fwd.style.display = "None"
            }
            if (drive == "fwd") {
                rwd.style.display = "None"
                fwd.style.display = "block"
            }


            // clock
            var br = document.createElement("br")
            var clock = document.createElement("div")
            clock.classList.add("stat")
            clock.id = "clock"
            h2.appendChild(clock_text_1)
            h2.appendChild(br)
            h2.appendChild(clock_text_2)
            getWeather("Waterloo")
            time = document.createTextNode(printCurrentTime())
            h3.appendChild(time)
            clock.appendChild(h2)
            clock.appendChild(h3)
            new_mainInner.appendChild(clock)

            // outside temp
            var br = document.createElement("br")
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var ot_text_1 = document.createTextNode("Outside")
            var ot_text_2 = document.createTextNode("Temperature")

            var outside_temp = document.createElement("div")
            outside_temp.classList.add("stat")
            outside_temp.id = "outside-temp"
            h2.appendChild(ot_text_1)
            h2.appendChild(br)
            h2.appendChild(ot_text_2)
            outside_temp.appendChild(h2)
            outside_temp.appendChild(h3)
            new_mainInner.appendChild(outside_temp)

            // aqi
            var br = document.createElement("br")
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var aqi_text_1 = document.createTextNode("Air Quality")
            var aqi_text_2 = document.createTextNode("Index")

            var aqi = document.createElement("div")
            aqi.classList.add("stat")
            aqi.id = "aqi"

            h2.appendChild(aqi_text_1)
            h2.appendChild(br)
            h2.appendChild(aqi_text_2)
            aqi.appendChild(h2)
            aqi.appendChild(h3)
            new_mainInner.appendChild(aqi)
            new_mainInner.appendChild(aqi)
        

            // battery
            var br = document.createElement("br")
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var battery_text_1 = document.createTextNode("Vehicle")
            var battery_text_2 = document.createTextNode("Battery")
            h3.textContent = "57%"

            var battery = document.createElement("div")
            battery.classList.add("stat")
            battery.id = "battery"

            h2.appendChild(battery_text_1)
            h2.appendChild(br)
            h2.appendChild(battery_text_2)
            battery.appendChild(h2)
            battery.appendChild(h3)
            new_mainInner.appendChild(battery)

            // battery temp
            var br = document.createElement("br")
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var batt_temp_text_1 = document.createTextNode("Battery")
            var batt_temp_text_2 = document.createTextNode("Temperature")
            h3.textContent = "100°C"

            var batt_temp = document.createElement("div")
            batt_temp.classList.add("stat")
            batt_temp.id = "batt-temp"
            new_mainInner.appendChild(batt_temp)
            
            h2.appendChild(batt_temp_text_1)
            h2.appendChild(br)
            h2.appendChild(batt_temp_text_2)
            batt_temp.appendChild(h2)
            batt_temp.appendChild(h3)
            new_mainInner.appendChild(batt_temp)

            // engine temp
            var br = document.createElement("br")
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var eng_temp_text_1 = document.createTextNode("Engine")
            var eng_temp_text_2 = document.createTextNode("Temperature")
            h3.textContent = "56°C"
            
            var eng_temp = document.createElement("div")
            eng_temp.classList.add("stat")
            eng_temp.id = "eng-temp"
            new_mainInner.appendChild(eng_temp)

            h2.appendChild(eng_temp_text_1)
            h2.appendChild(br)
            h2.appendChild(eng_temp_text_2)
            eng_temp.appendChild(h2)
            eng_temp.appendChild(h3)
            new_mainInner.appendChild(eng_temp)

            // Something
            new_mainInner.setAttribute("id", "transparent")
            mainElement.appendChild(new_mainInner);



            
            }, 200);
        
            setTimeout(function() 
            {
                var new_mainInner = document.querySelector('.main-inner');
                new_mainInner.removeAttribute("id")
            },275);
    }

}



document.querySelector('#map').onclick = function() {
    console.log("map")
    home_state = false
    camera_state = false
    parking_state = false
    
    if (document.getElementById("transparent")) {
        document.getElementById("transparent").remove()
    }

    if (map_state == true) {
        // console.log(123)
    } else {
        map_state = true
        // const homeLogo = document.getElementById('home');
        // homeLogo.style.backgroundColor = 'white';
        // const homeElement = document.querySelector('#home img');
        // homeElement.src = "home-black.svg";
        
        const mapLogo = document.getElementById('map');
        if (window.getComputedStyle(mapLogo).backgroundColor == 'rgb(49, 49, 49)') {
            return None
        }
        mapLogo.style.backgroundColor = "#313131"
        const mapElement = document.querySelector('#map img');
        mapElement.src = "map-white.svg";
        mapLogo.style.borderRadius = "0"

        const homeLogo = document.getElementById('home');
        homeLogo.style.backgroundColor = 'white';
        const homeElement = document.querySelector('#home img');
        homeElement.src = "home-black.svg";

        const cameraLogo = document.getElementById("camera");
        cameraLogo.style.backgroundColor = 'white'
        const cameraElement = document.querySelector("#camera img")
        cameraElement.src = "camera-black.svg"

        const parkingLogo = document.getElementById("parking");
        parkingLogo.style.backgroundColor = 'white'
        const parkingElement = document.querySelector("#parking img")
        parkingElement.src = "parking-black.svg"

        var mainInner = document.querySelector('.main-inner');
        mainInner.id = "transparent"

        setTimeout(function() {
            // Remove all children nodes
            while (mainInner.firstChild) {
                mainInner.removeChild(mainInner.firstChild);
            }
        }, 200); 

        setTimeout(() => mainInner.remove(), 200);

        setTimeout(function() 
            {
            var br = document.createElement('br');
            var h2_text_1 = document.createTextNode("Distance")
            var h2_text_2 = document.createTextNode("Ahead")
            var new_mainInner = document.createElement("div")
            new_mainInner.classList.add("main-inner")

            var pointCloud = document.createElement("div")
            pointCloud.classList.add("stat")
            pointCloud.id = "point_cloud"
            var pc_image = document.createElement("img")
            pc_image.src = "lidar.webp"
            pointCloud.appendChild(pc_image)
            new_mainInner.appendChild(pointCloud)

            var lights = document.createElement("div")
            lights.classList.add("stat")
            lights.id = "lights"
            var traffic_light = document.createElement("div")
            traffic_light.classList.add("traffic_light")
            var red = document.createElement("div")
            red.id = "red"
            var yellow = document.createElement("div")
            yellow.id = "yellow"
            var green = document.createElement("div")
            green.id = "green"
            traffic_light.appendChild(red)
            traffic_light.appendChild(yellow)
            traffic_light.appendChild(green)
            lights.appendChild(traffic_light)
            var lights_right = document.createElement("div")
            lights_right.classList.add("lights-right")
            var h2 = document.createElement("h2")
            h2.textContent = "Turn"
            var h3 = document.createElement("h3")
            h3.textContent = "Right"
            var arrow = document.createElement("img")
            arrow.src = "right-arrow.svg"
            arrow.id = "right-arrow"
            lights_right.appendChild(h2)
            lights_right.appendChild(h3)
            lights_right.appendChild(arrow)
            lights.appendChild(lights_right)
            new_mainInner.appendChild(lights)


            var distance = document.createElement("div")
            distance.classList.add("stat")
            distance.id = "distance"
            var distance_left = document.createElement("div")
            distance_left.classList.add("distance-left")
            var h2_distance_left = document.createElement("h2")
            h2_distance_left.appendChild(h2_text_1)
            h2_distance_left.appendChild(br)
            h2_distance_left.appendChild(h2_text_2)
            var h3_distance_left = document.createElement("h3")
            h3_distance_left.textContent = "100m"
            distance_left.appendChild(h2_distance_left)
            distance_left.appendChild(h3_distance_left)
            distance.appendChild(distance_left)

            var distance_img = document.createElement("img")
            distance_img.src = "distance.svg"
            distance_img.id = "distance_svg"
            distance.appendChild(distance_img)

            new_mainInner.appendChild(distance)
            const mainElement = document.querySelector('.main');

            new_mainInner.setAttribute("id", "transparent")
            mainElement.appendChild(new_mainInner);
            }, 200);
        
            setTimeout(function() 
            {
                console.log("failure 2")
                var new_mainInner = document.querySelector('.main-inner');
                new_mainInner.removeAttribute("id")
            },275);
    }

}

    
document.querySelector('#parking').onclick = function() {
    map_state = false
    home_state = false
    camera_state = false

        if (document.getElementById("transparent")) {
        document.getElementById("transparent").remove()
    }

    if (parking_state == true) {
        
    } else {
        parking_state = true

        const mapLogo = document.getElementById('map');
        mapLogo.style.backgroundColor = "white"
        const mapElement = document.querySelector('#map img');
        mapElement.src = "map-black.svg";
        mapLogo.style.borderRadius = "0"

        const homeLogo = document.getElementById('home');
        homeLogo.style.backgroundColor = 'white';
        const homeElement = document.querySelector('#home img');
        homeElement.src = "home-black.svg";

        const cameraLogo = document.getElementById("camera");
        cameraLogo.style.backgroundColor = 'white'
        const cameraElement = document.querySelector("#camera img")
        cameraElement.src = "camera-black.svg"

        const parkingLogo = document.getElementById("parking");
        if (window.getComputedStyle(parkingLogo).backgroundColor == 'rgb(49, 49, 49)') {
            return
        }
        parkingLogo.style.backgroundColor = '#313131'
        const parkingElement = document.querySelector("#parking img")
        parkingElement.src = "parking-white.svg"

        var mainInner = document.querySelector('.main-inner');
        mainInner.id = "transparent"

        setTimeout(function() {
            // Remove all children nodes
            while (mainInner.firstChild) {
                mainInner.removeChild(mainInner.firstChild);
            }
        }, 200); 

        setTimeout(() => mainInner.remove(), 200);

        setTimeout(function() {
            // Remove all children nodes
            while (mainInner.firstChild) {
                mainInner.removeChild(mainInner.firstChild);
            }
        }, 200); 

        setTimeout(() => mainInner.remove(), 200);

        setTimeout(function() 
            { console.log(1); 
            var new_mainInner = document.createElement("div")
            new_mainInner.classList.add("main-inner")

            //status
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var status_text = document.createTextNode("Status")
            if (ap_status == "off") {
                h3.textContent = "Automatic parking off"
            }
           
            
            var status = document.createElement("div")
            status.classList.add("ap")
            status.id = "status"
            new_mainInner.appendChild(status)

            h2.appendChild(status_text)
            // h2.appendChild(br)
            h2.appendChild(status_text)
            status.appendChild(h2)
            status.appendChild(h3)
            new_mainInner.appendChild(status)

            // activate
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var activate_text = document.createTextNode("Activate")

            var activate = document.createElement("div")
            activate.classList.add("ap")
            activate.id = "activate"
            new_mainInner.appendChild(activate)

            h2.appendChild(activate_text)
            h2.appendChild(activate_text)
            activate.appendChild(h2)
            activate.appendChild(h3)
            new_mainInner.appendChild(activate)
            //

            // start
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var start_text = document.createTextNode("Start")

            var start = document.createElement("div")
            start.classList.add("ap")
            start.id = "start"
            new_mainInner.appendChild(start)

            h2.appendChild(start_text)
            // h2.appendChild(br)
            h2.appendChild(start_text)
            start.appendChild(h2)
            start.appendChild(h3)
            new_mainInner.appendChild(start)
            //

            // cancel
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var cancel_text = document.createTextNode("Cancel")

            var cancel = document.createElement("div")
            cancel.classList.add("ap")
            cancel.id = "cancel"
            new_mainInner.appendChild(cancel)

            h2.appendChild(cancel_text)
            // h2.appendChild(br)
            h2.appendChild(cancel_text)
            cancel.appendChild(h2)
            cancel.appendChild(h3)
            new_mainInner.appendChild(cancel)
            //

            // finish
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var finish_text = document.createTextNode("Finish")

            var finish = document.createElement("div")
            finish.classList.add("ap")
            finish.id = "finish"
            new_mainInner.appendChild(finish)

            h2.appendChild(finish_text)
            // h2.appendChild(br)
            h2.appendChild(finish_text)
            finish.appendChild(h2)
            finish.appendChild(h3)
            new_mainInner.appendChild(finish)
            //

            const mainElement = document.querySelector('.main');
            mainElement.appendChild(new_mainInner);

            // important
            new_mainInner.setAttribute("id", "transparent")
            mainElement.appendChild(new_mainInner);
            }, 200);

            setTimeout(function() 
            {
                
                var status = document.getElementById("status")
                var activate = document.getElementById("activate")
                var start = document.getElementById("start")
                var cancel = document.getElementById("cancel")
                var finish = document.getElementById("finish")

                status = (status.children)[1]
                activate.addEventListener("click", function(){
                    ap_status = "activate"
                    activate.style.backgroundColor = "black"
                    activate.firstElementChild.style.color = "white"
                    start.style.backgroundColor = "white"
                    start.firstElementChild.style.color = "black"
                    finish.style.backgroundColor = "white"
                    finish.firstElementChild.style.color = "black"
                    status.textContent = "Searching for open parking spots"
                    
                })

                start.addEventListener("click", function(){
                    ap_status = "start"
                    start.style.backgroundColor = "black"
                    start.firstElementChild.style.color = "white"
                    activate.style.backgroundColor = "white"
                    activate.firstElementChild.style.color = "black"
                    finish.style.backgroundColor = "white"
                    finish.firstElementChild.style.color = "black"
                    status.textContent = "Starting automatic parking maneuver"
                })

                cancel.addEventListener("click", function(){
                    ap_status = "off"
                    activate.style.backgroundColor = "white"
                    activate.firstElementChild.style.color = "black"
                    start.style.backgroundColor = "white"
                    start.firstElementChild.style.color = "black"
                    cancel.style.backgroundColor = "white"
                    cancel.firstElementChild.style.color = "black"
                    finish.style.backgroundColor = "white"
                    finish.firstElementChild.style.color = "black"
                    status.textContent = "Automatic parking off"
                })

                finish.addEventListener("click", function() {
                    ap_status = "finish"
                    finish.style.backgroundColor = "black"
                    finish.firstElementChild.style.color = "white"
                    activate.style.backgroundColor = "white"
                    activate.firstElementChild.style.color = "black"
                    start.style.backgroundColor = "white"
                    start.firstElementChild.style.color = "black"
                    status.textContent = "Finishing automatic parking maneuver"
                })

                if (ap_status == "activate"){
                    ap_status = "activate"
                    activate.style.backgroundColor = "black"
                    activate.firstElementChild.style.color = "white"
                    start.style.backgroundColor = "white"
                    start.firstElementChild.style.color = "black"
                    finish.style.backgroundColor = "white"
                    finish.firstElementChild.style.color = "black"
                    status.textContent = "Searching for open parking spots"
                }
                if (ap_status == "start") {
                    ap_status = "start"
                    start.style.backgroundColor = "black"
                    start.firstElementChild.style.color = "white"
                    activate.style.backgroundColor = "white"
                    activate.firstElementChild.style.color = "black"
                    finish.style.backgroundColor = "white"
                    finish.firstElementChild.style.color = "black"
                    status.textContent = "Starting automatic parking maneuver"
                }
                if (ap_status == "finish") {
                    ap_status = "finish"
                    finish.style.backgroundColor = "black"
                    finish.firstElementChild.style.color = "white"
                    activate.style.backgroundColor = "white"
                    activate.firstElementChild.style.color = "black"
                    start.style.backgroundColor = "white"
                    start.firstElementChild.style.color = "black"
                    status.textContent = "Finishing automatic parking maneuver"
                }
            },201);
        
            setTimeout(function() 
            {
                var new_mainInner = document.querySelector('.main-inner');
                new_mainInner.removeAttribute("id")
            },275);
        
    }
}



document.querySelector('#camera').onclick = function() {
    map_state = false
    home_state = false
    parking_state = false

    if (document.getElementById("transparent")) {
        document.getElementById("transparent").remove()
    }

    if (camera_state == true) {
        
    } else {
        camera_state = true

        const mapLogo = document.getElementById('map');
        mapLogo.style.backgroundColor = "white"
        const mapElement = document.querySelector('#map img');
        mapElement.src = "map-black.svg";
        mapLogo.style.borderRadius = "0"

        const homeLogo = document.getElementById('home');
        homeLogo.style.backgroundColor = 'white';
        const homeElement = document.querySelector('#home img');
        homeElement.src = "home-black.svg";

        const cameraLogo = document.getElementById("camera");
        if (window.getComputedStyle(cameraLogo).backgroundColor == 'rgb(49, 49, 49)') {
            return
        }
        cameraLogo.style.backgroundColor = '#313131'
        const cameraElement = document.querySelector("#camera img")
        cameraElement.src = "camera-white.svg"

        const parkingLogo = document.getElementById("parking");
        parkingLogo.style.backgroundColor = 'white'
        const parkingElement = document.querySelector("#parking img")
        parkingElement.src = "parking-black.svg"

        var mainInner = document.querySelector('.main-inner');
        mainInner.id = "transparent"

        setTimeout(function() {
            // Remove all children nodes
            while (mainInner.firstChild) {
                mainInner.removeChild(mainInner.firstChild);
            }
        }, 200); 

        setTimeout(() => mainInner.remove(), 200);

        setTimeout(function() {
            // Remove all children nodes
            while (mainInner.firstChild) {
                mainInner.removeChild(mainInner.firstChild);
            }
        }, 200); 

        setTimeout(() => mainInner.remove(), 200);

        setTimeout(function() 
            { var new_mainInner = document.createElement("div")
            new_mainInner.classList.add("main-inner")
            var h2 = document.createElement("h2")
            var h3 = document.createElement("h3")
            var video = document.createElement("video")
            const mainElement = document.querySelector('.main');

            //first
            h2.classList.add("dms-text")
            h2.textContent = "Driver Monitoring"
            new_mainInner.appendChild(h2)

            //second
            var dms = document.createElement("div")
            dms.classList.add("dms")
            dms.id = "dms"

            var off = document.createElement("div")
            off.classList.add("off")
            h3.textContent = "Off"
            dms.appendChild(off)
            off.appendChild(h3)
            video.classList.add("webcam")
            video.id = "webcam2"
            video.setAttribute('autoplay', '');
            video.setAttribute('playsinline', '');
            dms.appendChild(video)

            // if (dms_state == false) {
            //     stopVideo()
            // }

            new_mainInner.appendChild(dms)


            //third

            // Something
            new_mainInner.setAttribute("id", "transparent")
            mainElement.appendChild(new_mainInner);
            }, 200);

            setTimeout(function() 
            {
                const webcam2 = document.getElementById("webcam2")

                if (dms_state == true){
                    console.log("this is true")
                    var off = (document.getElementsByClassName("off"))[0]
                    off.style.display = "None"
                    startVideo()
                }



                    webcam2.addEventListener("click", function() {
                            if (dms_state == false) {
                                console.log("DMS is on");
                                dms_state = true
                                var off = (document.getElementsByClassName("off"))[0]
                                off.style.display = "None"
                                startVideo()
                                }

                            else if (dms_state == true) {
                                console.log("DMS is off");
                                dms_state = false
                                var off = (document.getElementsByClassName("off"))[0]
                                off.style.display = "flex"
                                stopVideo()
                            }
                            
                        })


                }, 201);

        
            setTimeout(function() 
            {
                var new_mainInner = document.querySelector('.main-inner');
                new_mainInner.removeAttribute("id")
            },275);
        
    }
}



function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true }) // Corrected: Use { video: true }
        .then(function (stream) {
            webcam2.srcObject = stream;
        })
        .catch(function (err) {
            console.error("Error accessing the webcam:", err);
        });
}

function stopVideo() {
    if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }
    webcam2.srcObject = null;
}

document.addEventListener('keydown', function(event) {
    var alert = (document.getElementsByClassName("alert"))[0]
    if ((event.key === 'a' || event.key === 'A') && (dms_state == true)) {
        alert.style.display = "flex"
      console.log("Alert is on"); 
    }
    if ((event.key === 's' || event.key === 'S') && (dms_state == true)) {
        console.log("Alert is off")
        alert.style.display = "None"
    }
  });

// function printAbcEverySecond() {
//     setInterval(function() {
//         console.log(dms_state);
//     }, 1000); // 1000 milliseconds = 1 second
// }
// printAbcEverySecond();


document.addEventListener('keydown', function(event) {
    var rwd = (document.getElementsByClassName("rwd"))[0]
    var fwd = (document.getElementsByClassName("fwd"))[0]
    if ((event.key === 'r' || event.key === 'r')) {
        fwd.style.display = "None"
        rwd.style.display = "block"
        drive = "rwd"
    }
    if ((event.key === 'f' || event.key === 'f')) {
        rwd.style.display = "None"
        fwd.style.display = "block"
        drive = "fwd"
    }
    if ((event.key === 'e' || event.key === 'e')) {
        rwd.style.display = "block"
        fwd.style.display = "block"
        drive = "awd"
    }
  });