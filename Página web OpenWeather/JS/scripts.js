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
        /*$.getJSON(url, function (data) {
            if (data.length > 0) {
                $("#tiempo").empty()
                data.forEach(function (item) {
                    item.weather.forEach(function (weather) {
                        body = `<p>${weather.id}</p>
                                `
                    $("#tiempo").append(body)
                    })
                });
            } else {
                alert("No hay datos")
            }
        }).fail(function (xhr, status, error) {
            alert(xhr.status);
        });*/
        //`https://api.openweathermap.org/data/2.5/forecast?q=${lugar}&appid=${key}`
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=6bc0d1c22c462a751fe8bb9330e7bdf9",
            method: 'GET',
            success: function (data) {
                if (data.length > 0) {
                    $("#tiempo").empty()
                    alert(data)
                    data.forEach(function (item) {
                        alert(item)
                        item.weather.forEach(function (weather) {
                            alert(weather)
                            body = `<p>${weather.id}</p>
                                    `
                            $("#tiempo").append(body)
                        })
                    });
                } else {
                    alert("No hay datos")
                }
            },
            error: function (xhr, status, error) {
                alert(xhr.status);
            }
        })
    }
    function getTiempoUbicacion() {
        navigator.geolocation.getCurrentPosition((position) => {
            var key = "6bc0d1c22c462a751fe8bb9330e7bdf9"
            var lat = position.coords.latitude
            var lon = position.coords.longitude
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`,
                dataType: 'json',
                method: 'GET',
                success: function (data) {
                    alert(data)
                    if (data.length > 0) {
                        $("#tiempo").empty();
                        var tiempo = `<div class="col">
                        <p>${data.list.weather.icon}</p>
                        <p>${data.list.weather.description}</p>
                        </div>
                        <div class="col">
                        <p>${data.list.weather.main}</p>
                        </div>`
                        $("#tiempo").append(tiempo)
                    } else {
                        alert("No hay datos")
                    }
                },
                error: function (xhr, status, error) {
                    alert(xhr.status);
                }
            });
        }, function (error) {
            // El segundo parámetro es la función de error
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
})