jQuery(document).ready(function () {
    var body
    $("#buscar").on("click", function () {
        $("#heroBody").empty()
        body = `<h1>Search by city:</h1>
                    <div class="d-flex">
                        <label>City</label>
                        <input class="form-control" type="text" id="ciudad" placeholder="London">
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-outline-primary" id="btnBuscar" type="button">
                            Search
                        </button>
                    </div>
                    <div class="container-fluid" id="tiempo">
                    </div>`
        $("#heroBody").append(body)
        $("#btnBuscar").on('click', function () {
            var lugar = $("#ciudad").val();
            if (lugar != "") {
                getTiempoLugar(lugar);
            } else {
                alert("Por favor inserte el nombre de una ciudad");
            }
        });
    })
    $("#home").on("click", function () {
        $("#heroBody").empty()
        body = `<h1>Your weather app</h1>
                <p>Know the weather at all time</p>`
        $("#heroBody").append(body)
    })
    $("#location").on("click", function () {
        getTiempoUbicacion()
    })
    function getTiempoLugar(lugar) {
        var key = "6bc0d1c22c462a751fe8bb9330e7bdf9"
        $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${lugar}&limit=1&appid=${key}`, function (data) {
            if (data.list && data.list.length > 0) {
                $("#tiempo").empty();
                item = data.list[0]
                item.weather.forEach(function (weather) {
                    var tiempo = `<div class="row">
                            <div class="col-12 col-md-5 col-xl-3">
                                        <img src="http://openweathermap.org/img/wn/${weather.icon}.png" height="150" width="150" alt="icono">
                                        <p> ${weather.description}</p>
                                     </div>
                                     <div class="col-12 col-md-5 col-xl-3">
                                        <p>${weather.main}</p>
                                     </div>
                                     </div>`
                    $("#tiempo").append(tiempo);
                });
            } else {
                alert("No hay datos disponibles.");
            }
        }).fail(function (xhr, status, error) {
            alert("Error al obtener los datos: " + xhr.status);
        });
    }
    function getTiempoUbicacion() {
        navigator.geolocation.getCurrentPosition((position) => {
            $("#heroBody").empty()
            var key = "6bc0d1c22c462a751fe8bb9330e7bdf9"
            var lat = position.coords.latitude
            var lon = position.coords.longitude
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`,
                method: 'GET',
                async: false,
                success: function (data) {
                    if (data.list && data.list.length > 0) {
                        $("#tiempo").empty();
                        item = data.list[0]
                        item.weather.forEach(function (weather) {
                            var tiempo = `<div class="row">
                            <div class="col-12 col-md-5 col-xl-3">
                                        <img src="http://openweathermap.org/img/wn/${weather.icon}.png" height="150" width="150" alt="icono">
                                        <p> ${weather.description}</p>
                                     </div>
                                     <div class="col-12 col-md-5 col-xl-3">
                                        <p>${weather.main}</p>
                                     </div>
                                     </div>`;
                            $("#tiempo").append(tiempo);
                        });
                    } else {
                        alert("No hay datos")
                    }
                },
                error: function (xhr, status, error) {
                    alert(xhr.status);
                }
            });
        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert(error.PERMISSION_DENIED)
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert(error.POSITION_UNAVAILABLE)
                    break;
                case error.TIMEOUT:
                    alert(error.TIMEOUT)
                    break;
                case error.UNKNOWN_ERROR:
                    alert(error.UNKNOWN_ERROR)
                    break;
            }
        })
    }
    $("#home").click();
})