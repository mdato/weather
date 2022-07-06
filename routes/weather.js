const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    country: null,
    des: null,
    icon: null,
    temp: null
  });
});

router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.KEY}`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('index', {
            city: data.message,
            des: null,
            icon: null,
            temp: null,
            country: null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = data.main.temp.toFixed(1);
          const country = data.sys.country

          res.render('index', {
            city, des, icon, temp, country
          });
        }
      });

  } catch (err) {
    res.render('index', {
      city: 'something wrong',
      des: null,
      icon: null,
      temp: null,
      country: null
    })
  }

})


module.exports = router;