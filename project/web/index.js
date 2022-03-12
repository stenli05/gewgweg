function initMap() {
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      console.log(data)

      const center = { lat: 42.6977, lng: 23.3219 };
      var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
      });
   
      var infowindow = new google.maps.InfoWindow;
   
      var marker, i;
      for (i = 0; i < data.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
          map: map
        });
     
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            
            content = data[i].name
              
              if (data[i].wheelchair_access == true){
                content += "<br>The location is with wheelchair access."
              }else{
                content += "<br>The location is not with wheelchair access."
              }
              if (data[i].staff_speaking_sign_lng == true){
                content += "<br>The location is equipped with personel speaking sign language."
              }else{
                content += "<br>The location is not equipped with personel speaking sign language."
              }
              
              infowindow.setContent(content)
              infowindow.open(map, marker);
          }
        })(marker, i));
      }
    });
}

function add() {
  // placeName = document.getElementById("name").value
  // longitude = document.getElementById("longitude").value
  // latitude = document.getElementById("latitude").value
  // wheelchair = document.getElementById("wheelchair_access").value
  // sign_lng = document.getElementById("staff_speaking_sign_language").value


  placeName = "Park"
  longitude = 42
  latitude = 23
  wheelchair = true
  sign_lng = true

  fetch("/new_place",
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      name: placeName, 
      longitude: longitude,
      latitude: latitude,
      staff_speaking_sign_lng: sign_lng,
      wheelchair_access: wheelchair_access
    })
  })
  .then(function(res){ 
    console.log(res) 
    location.reload()
  })
  .catch(function(res){ console.log(res) })
}
