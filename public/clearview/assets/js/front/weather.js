$(function(){
    const weather_1 = `강한 자외선을 차단하기 위해 선글라스, 모자 착용으로 눈을 보호해주세요. <br>높은 기온과 강한 햇빛으로 지친 눈을 위해 충분한 휴식을 취하세요!`
    const weather_2 = `흐린 날이 맑은 날보다 자외선 지수가 더 높다는 사실 알고 계세요? <br>자외선 차단제와 선글라스로 소중한 피부와 눈을 보호해주세요.`
    const weather_3 = `비가 오는 날에는 고온다습한 환경으로 눈 건강 관리에 더 유의하셔야 합니다. <br>렌즈 착용을 삼가하거나, 착용 시 오염에 주의하세요!`
    const weather_4 = `쌓인 눈에서 햇빛이 반사되어 자외선이 유입되지 않도록 눈을 보호해주세요! <br>쌀쌀한 기온과 바람, 건조한 실내 환경으로 안구건조증이 발생할 수 있으니 눈 건강에 유의하세요.`

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=8986672dd174c444e5cf84cfed53652f&units=metric',

        dataType: 'json',
        type: 'GET',
        success: function (data) {
            const $Icon = (data.weather[0].icon).substr(0, 2);
            const $Temp = Math.floor(data.main.temp);

            $('.weather_ico').append(`<img src="/img/front/common/weather/${$Icon}.png" width="120" height="78" alt="${data.weather[0].description}" />`)
            $('.temp_num').text($Temp);

            switch($Icon){
                case '01': case '02':
                    $('.weather_info').html(weather_1)
                break;
                case '03': case '04': case '50':
                    $('.weather_info').html(weather_2)
                break;
                case '09': case '10': case '11':
                    $('.weather_info').html(weather_3)
                break;
                case '13':
                    $('.weather_info').html(weather_4)
                break;
          }
        }
    })
});