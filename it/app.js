const express = require('express');
var multer  = require('multer');

const bp = require('body-parser');
const db = require('./dbislemleri')
const app = express();
const port = process.env.PORT || 3000;



app.set('view engine', 'ejs'); 
app.get('/albumekle', function(req, res) {
    res.render('albumekle');
    });
app.get('/sanatciEkle', function(req, res) {
        res.render('sanatciEkle');
        });    
app.get('/muzikTurEkle', function(req, res) {
            res.render('muzikTurEkle');
            });            
app.use(bp.urlencoded({ extended: false }))
app.get('/album', db.Albumgetir);
app.get('/albumSil', db.albumSil);
app.get('/sanatci', db.Sanatcigetir);
app.get('/sanatciSil', db.sanatciSil);
app.get('/muziktur', db.MuzikTurgetir);
app.get('/muzikTurSil', db.muzikTurSil);
app.get('/albumGuncelle',db.albumGuncelleGet );
app.post('/albumGuncelle',db.albumGuncellePost );
app.post('/albumEkle',db.albumEklePost);
app.post('/sanatciEkle',db.sanatciEklePost);
app.get('/sanatciGuncelle',db.sanatciGuncelleGet);
app.post('/sanatciGuncelle',db.sanatciGuncellePost);
app.post('/muzikTurEkle',db.muzikTurEklePost);
app.get('/muzikTurGuncelle',db.muzikTurGuncelleGet);
app.post('/muzikTurGuncelle',db.muzikTurGuncellePost);

app.listen(port, () => console.log('Example app listening on port:' + port))