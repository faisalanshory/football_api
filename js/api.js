const API_KEY = "16d85bf702974259b17e4dff4faeade4";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;
const TEAM_ID = 64;

const ENDPOINT_ALL = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
const ENDPOINT_STANDING = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAMS = `${BASE_URL}teams/`;

function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      // Method reject() akan membuat blok catch terpanggil
      return Promise.reject(new Error(response.statusText));
    } else {
      // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
      return Promise.resolve(response);
    }
  }
  
  // Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getStanding() {
    if ("caches" in window) {
        caches.match(ENDPOINT_STANDING).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Standing Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_STANDING)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getTeam() {
    if ("caches" in window) {
        caches.match(ENDPOINT_ALL).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Team Data: " + data);
                    showTeam(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_ALL)
        .then(data => {
            showTeam(data);
        })
        .catch(error => {
            console.log(error)
        })

}

function getMatch() {
    if ("caches" in window) {
                caches.match(ENDPOINT_MATCH).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Team Data: " + data);
                    showMatch(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_MATCH)
        .then(data => {
            showMatch(data);
        })
        .catch(error => {
            console.log(error)
        })
}


function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("standing");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr style="text-align: center;">
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td><b>${standing.points}</b></td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px; ">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>P</th>
                        </tr>
                     </thead>
                    <tbody id="standings" >
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getTeam()  {
    if ("caches" in window) {
        caches.match(ENDPOINT_ALL).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Team Data: " + data);
                    showTeam(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_ALL)
        .then(data => {
            showTeam(data);
        })
        .catch(error => {
            console.log(error)
        })
}


function showTeam(data) {
    let squads = "";
    let teamElement =  document.getElementById("teams");

    data.teams.forEach(function (team){
        squads += `
        <a href="./profile.html?id=${team.id}" style="color:black;">
             <div class="col s6 m4 l3" style="float: left; height: 40rem; margin: 0; padding: 10px; ">
                 <div class="card">
                    <div class="card-image" style="height : 15rem;">
                     <img src="${team.crestUrl}" style="margin: auto; padding: 1rem 1rem 0 1rem; height: 100%; width:auto; max-width: 100%; ">
                    </div>
                    <div class="card-content" style="padding-top: 0.5rem; height : 6rem;">
                     <h5><strong>${team.name}</strong></h5>
                    </div>
                    <div class="card-action">
                     <a href="./profile.html?id=${team.id}" style="float: left; ">Klik Disini</a>
                    </div>
                 </div>
             </div>
        </a>
         `;
     });

    teamElement.innerHTML = ` 
        <div class="row">    
        ${squads}
        </div>
    `;
}



function getTeamById() {
    return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(ENDPOINT_TEAMS + idParam ).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("Team Data: " + data);
                        showTeamById(data);
                    })
                }
            })
        }
    
        fetchAPI(ENDPOINT_TEAMS + idParam)
            .then(data => {
                showTeamById(data);
                resolve(data)
            })
            .catch(error => {
                console.log(error)
            })
    });
}

function showTeamById(data) {
  let squads = "";
  let info = "";
  let teamElement =  document.getElementById("body-content");

  info += `
      <div class="card" style="text-align:center;">
        <div class="row">
          <div class="col s3 l5"></div>
          <div class="col s6 l2" style="margin-bottom: 0; padding:0; ">
              <img src="${data.crestUrl}" style="padding-top: 2rem; width:100%; height: auto;" align="middle" >
          </div>
        </div>
        <div class="card-content" style="margin-top: 0;padding:0; ">
           <h3 >${data.name}</h3>
           <h5 >${data.website}</h5>
           <h6><strong>Founded on ${data.founded} Stadion ${data.venue}</strong></h6>
           <br>
        </div>
  `;

  data.squad.forEach(function (member) {
    squads += `
            <tr style="text-align: center;">
                <td>${member.name}</td>
                <td>${member.nationality}</td>
                <td>${member.role}</td>
                <td>${member.position}</td>
            </tr>
    `;
  });

  teamElement.innerHTML = `
      ${info}
      <div class="card" style="padding-left: 24px; padding-right: 24px;">
            <table class="striped responsive-table">
                <thead>
                  <tr><h5 style="text-align: center; padding-top: 15px;"><strong>Anggota Tim</strong><h5></tr>
                    <tr>
                        <th>Nama</th>
                        <th>Kenegaraan</th>
                        <th>Peran</th>
                        <th>Posisi</th>
                    </tr>
                 </thead>
                <tbody id="standings" >
                    ${squads}
                </tbody>
            </table>
            
      </div>
    </div>
  `;
      
}


function getSavedTeams() {
    getAll().then(function(teams) {
      console.log(teams);
      // Menyusun komponen card artikel secara dinamis
        let squads = "";

        teams.forEach(function (team){
            squads += `
            <a href="./profile.html?id=${team.id}&saved=true" style="color:black;">
                <div class="col s6 m4 l3" style="float: left; height: 40rem; margin: 0; padding: 10px; ">
                    <div class="card">
                        <div class="card-image" style="height : 15rem;">
                        <img src="${team.crestUrl}" style="margin: auto; padding: 1rem 1rem 0 1rem; height: 100%; width:auto; max-width: 100%; ">
                        </div>
                        <div class="card-content" style="padding-top: 0.5rem; height : 6rem;">
                        <h5><strong>${team.name}</strong></h5>
                        </div>
                        <div class="card-action">
                        <a href="/profile.html?id=${team.id}&saved=true" style="float: left; ">Klik Disini</a>
                        </div>
                    </div>
                </div>
            </a>
            `;
        });

        document.getElementById("saveddd").innerHTML = ` 
            <div class="row">    
            ${squads}
            </div>
        `;
    });
}
