    function obtenerDigimon(name) {
        fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
            .then(response => response.json())
            .then(data => {
    
                document.getElementById("container-card").innerHTML = '';
                let html = '';
                html +=
                    `<div class="card m-4 shadow-lg p-3 mb-5 bg-white rounded" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button onclick="obtenerTodosDigimon()" type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                    <div class="col-md-4">
                        <img src="${data[0].img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${data[0].name}</h5>
                        <p class="card-text">Level: ${data[0].level}</p>
                        </div>
                    </div>
                    </div>
                </div>`
                document.getElementById("container-card").innerHTML += html
            })
            .catch()
    }

    function obtenerDigimonByLevel(level) {
        fetch(`https://digimon-api.vercel.app/api/digimon/level/${level}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("container-card-level").innerText = ''
                let digimones = data;
                let html = '';
                for (let digimon of digimones) {
                    html +=
                        `<div class="card shadow p-3 mb-5 bg-white rounded" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${digimon.img}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${digimon.name}</h5>
                                        <p class="card-text">Level: ${digimon.level}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
                }
                document.getElementById("container-card-level").innerHTML += html
            })
            .catch()
    }

    function obtenerTodosDigimon(){
        fetch("https://digimon-api.vercel.app/api/digimon")
        .then(response => response.json())
        .then(data => {
            let digimones = data;
            let html = '';
            document.getElementById("container-card").innerHTML = ''
            let inTraining = 0;
            let rookie = 0;
            let champion = 0;
            let ultimate = 0;
            let fresh = 0;
            let mega = 0;
            let training = 0;
            let armor = 0;
            let other = 0;

            for (let digimon of digimones) {
                html +=
                    `<div class="card m-4 shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <div class="card-header bg-transparent border-success">
                            <h5 class="card-title">${digimon.name}</h5>
                        </div>
                        <img src="${digimon.img}" class="card-img-top card-digimon" alt="...">
                        <div class="card-body">
                            <p class="card-text">Level:   ${digimon.level}</p>
                            <a onclick="obtenerDigimon('${digimon.name}')" class="btn btn-primary">Ver</a>
                        </div>
                    </div>`

                if (digimon.level == "In Training") {
                    inTraining++
                } else if (digimon.level == "Rookie") {
                    rookie++
                } else if (digimon.level == "Champion") {
                    champion++
                } else if (digimon.level == "Ultimate") {
                    ultimate++
                } else if (digimon.level == "Fresh") {
                    fresh++
                } else if (digimon.level == "Mega") {
                    mega++
                } else if (digimon.level == "Training") {
                    training++
                } else if (digimon.level == "Armor") {
                    armor++
                } else {
                    other++
                }

            }
            document.getElementById("container-card").innerHTML += html


            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "Clasificación por nivel"
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "##0.00\"%\"",
                    indexLabel: "{label} {y}",
                    dataPoints: [
                        { y: inTraining, label: "In Training", click: function (e) { obtenerDigimonByLevel("In Training") } },
                        { y: rookie, label: "Rookie", click: function (e) { obtenerDigimonByLevel("Rookie") } },
                        { y: champion, label: "Champion", click: function (e) { obtenerDigimonByLevel("Champion") } },
                        { y: ultimate, label: "Ultimate", click: function (e) { obtenerDigimonByLevel("Ultimate") } },
                        { y: fresh, label: "Fresh", click: function (e) { obtenerDigimonByLevel("Fresh") } },
                        { y: mega, label: "Mega", click: function (e) { obtenerDigimonByLevel("Mega") } },
                        { y: training, label: "Training", click: function (e) { obtenerDigimonByLevel("Training") } },
                        { y: armor, label: "Armor", click: function (e) { obtenerDigimonByLevel("Armor") } },
                        { y: other, label: "Others", click: function (e) { obtenerDigimonByLevel("Others") } }
                    ]
                }]
            });
            chart.render();

        })
        .catch(error => console.log(error))
    }

    obtenerTodosDigimon();