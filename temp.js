(async (city) => {
    const res = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&units=metric&lang=ru&q=" + encodeURIComponent(city))
    const d = await res.json()
    if(!res.ok) console.log(res.status === 401 ? "Ключ недействителен, получите новый по ссылке https://home.openweathermap.org/api_keys" : `Ошибка ${res.status}: ${d}`)
    console.log(`Сегодня в ${d.name} ${d.main.temp}C`)
})("Санкт-Петербург")
