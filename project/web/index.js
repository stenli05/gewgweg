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
            
              infowindow.setContent(data[i].name);
              
              if (data[i].wheelchair_access == true){
                infowindow.setContent("The location is with wheelchair access.");
              }else{
                infowindow.setContent("The location is not with wheelchair access.");
              }
              if (data[i].staff_speaking_sign_lng == true){
                infowindow.setContent("The location is equiped with personel speaking sign language.");
              }else{
                infowindow.setContent("The location is equiped with personel speaking sign language.");
              }

              infowindow.open(map, marker);
          }
        })(marker, i));
      }
    });
}
