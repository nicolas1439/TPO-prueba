function iniciarMap(){

    var coord = {lat:-34.6343402 ,lng: -58.394033};
    var coord_uno = {lat:-34.5704376 ,lng: -58.4385508};
    var coord_dos = {lat:-34.6030616 ,lng: -58.5682069};
    var coord_tres = {lat:-34.6827734 ,lng: -58.5878081};
    var coord_cuatro = {lat:-34.4536758 ,lng: -58.6491936};

    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord,
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    })
    var marker = new google.maps.Marker({
      position: coord_uno,
      map: map
    });
    var marker = new google.maps.Marker({
      position: coord_dos,
      map: map
    });
    var marker = new google.maps.Marker({
      position: coord_tres,
      map: map
    });
    var marker = new google.maps.Marker({
      position: coord_cuatro,
      map: map
    });


}