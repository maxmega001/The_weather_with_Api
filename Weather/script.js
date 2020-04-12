let a = $('#formaUser').submit(function(event){
    event.preventDefault();
    getWeather(this.name.value, this.code.value);
});


let popular_city = function(pop_city, pop_code){
    // Вывод информации по городу из предложенного списка
    $('#city').val(pop_city);
    $('#code').val(pop_code);
    getWeather(pop_city, pop_code);
}


let getWeather = function(name,code){
    let data = {
        city: name,
        code: code,
    }
    $.get(`http://api.openweathermap.org/data/2.5/weather?q=${data.city},${data.code}&appid=c3cdacfa5bf69fde84f04707a04dde19&units=metric&lang=ru`, 
    data, function (response) {})
    .fail(function() {
        // Обработка ошибки
        $("#container").html('');
        $(`<h3>Oops... something went wrong. Check the  name of the city</h3>`).appendTo($("#container"));
    })
    .done(function(response){
        addItem(response);
    }) 
}


let clothes = function(icon, temp){
    // Рекомендуемая одежда
    let recomendation = "";
    let flag = true;

    if (icon == "09" || icon == "10" || icon == "50" ){
        recomendation = "Возьмите зонтик. ";
        flag = false;
    }

    if (icon == "50"){
        recomendation = "Возьмите очки. Воздух грязнее обычного. ";
    }

    if ((temp > 30) && (false)){
        recomendation += "Футболка будет в самый раз. ";
    }else if (temp > 20){
        recomendation += "Кофта сегодня не помешает. ";
    }else if (temp > 5){
        recomendation += "Захватите лёгкую куртку. ";
    } else{
        recomendation += "Наденьте куртку потеплее. ";
    }

    if (temp < -10){
        recomendation += "Теплые перчатки и шапка будут в саймый раз. ";
    }

    return recomendation;
}


let wind_direction = function(speed, deg){
    let wind = "Ветер ";

    if (speed > 15){
        wind += ` сегодня сильный: <span style="font-size: 23px">${speed}</span> м/с. Будьте готовы! `;
    }else{
        wind += ` сегодня спокойный: <span style="font-size: 23px">${speed}</span> м/с. Можно расслабиться. `;
    }

    if (deg <= 360){
        wind += 'Напрвление: <span style="font-size: 23px">СЗ</span>.';
        return wind;
    }

    if (deg < 337.55){
        wind += 'Напрвление: <span style="font-size: 23px">СЗ</span>.';
        return wind;
    }

    if (deg < 292.55){
        wind += 'Напрвление: <span style="font-size: 23px">З</span>.';
        return wind;
    }

    if (deg < 247.55){
        wind += 'Напрвление: <span style="font-size: 23px">ЮЗ</span>.';
        return wind;
    }

    if (deg < 202.55){
        wind += 'Напрвление: <span style="font-size: 23px">Ю</span>.';
        return wind;
    }

    if (deg < 157.55){
        wind += 'Напрвление: <span style="font-size: 23px">ЮВ</span>.';
        return wind;
    }

    if (deg < 112.55){
        wind += 'Напрвление: <span style="font-size: 23px">В</span>.';
        return wind;
    }

    if (deg < 67.55){
        wind += 'Напрвление: <span style="font-size: 23px">СВ</span>.';
        return wind;
    }

    if (deg < 22){
        wind += 'Напрвление: <span style="font-size: 23px">С</span>.';
        return wind;
    }
}


let visibility_check = function(list){
    if (list.visibility){
        return `<p>Видимость: <span style="font-size: 23px">${list.visibility}</span> м.</p>`;
    };

    return '';
    
}


let addItem = function(list){
    $("#container").attr('smth','true');
    $("#container").html(`<div class="container text-center mt-5" id="container" smth=""><p>${new Date(Date.now()+new Date().getTimezoneOffset()*60000+list.timezone*1000).toLocaleDateString("ru")}</p>
    <h1 class="city_name">${list.name}, ${list.sys.country}</h1>
    <h1>${list.main.temp} &#8451;</h1>
    <p>Ощущается, как ${list.main.feels_like} &#8451;</p>
    <p>Макс. t = ${list.main.temp_max} &#8451;, мин t = ${list.main.temp_min} &#8451;</p>
    <img src="http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png" width="200px" height="200px" alt="">
    <p> Сегодня ${list.weather[0].description}.  ${clothes(list.weather[0].icon.substr(0,2), list.main.feels_like)}</p>
    <p>${wind_direction(list.wind.speed, list.wind.deg)}</p>
    ${
        visibility_check(list)
    }
    </div>`);
}