const mq = require('mssql');
const dosyasistemi = require('fs');
const moment = require('moment');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    user: 'tncakpnr',
    password: 'tunc.Ua98',
    server: 'itakpnr.database.windows.net',
    database: 'MEDIPILIMDB',
    encrypt: true ,
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
        
    }
    
};

module.exports.Albumgetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from Album ", function (err, recordset) {
            if (err) console.log(err)
            mq.close();
            res.render('album', { data: recordset.recordset });
            //res.send(recordset);
        });
    });
}

module.exports.albumGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from Album where AlbumId = " + req.query.id, function (err, album) { 
            if (err) console.log(err)
            mq.close();
            console.log(album.recordset);
            res.render('albumGuncelle', { album: album.recordset[0], moment: moment });
            //res.send(recordset);
        });
    });
}

module.exports.albumGuncellePost = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("UPDATE Album SET AlbumAdi = '" + req.body.albumAdi + "',  CikisTarihi = '"+ req.body.cikisTarihi +"' WHERE AlbumId = " + req.query.id , function (err, album) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('album');
        });
    });
}

module.exports.albumEklePost = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("INSERT INTO Album(AlbumAdi,CikisTarihi,SanatciId,MuzikTurId) values ( '"+ req.body.albumAdi +"', '"+ req.body.cikisTarihi + "', "+ req.body.sanatciId +" , "+ req.body.muzukTurId +" )", function (err) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('album');
        });
    });
}
module.exports.albumSil = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("DELETE FROM Album WHERE AlbumId = " + req.query.id, function (err) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('album');
        });
    });
}

module.exports.Sanatcigetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select *, case SanatciYasiyormu when 1 then 'yaşıyor ' when 0 then 'ölü' end as sanatciyaşıyormu  from Sanatci ", function (err, sanatcis) {
            if (err) console.log(err)
            mq.close();
            res.render('sanatci', { sanatci: sanatcis.recordset });
          
        });
    });
}
module.exports.sanatciEklePost = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("INSERT INTO Sanatci(SanatciAdi,SanatciYasiyormu,SanatciDogumTarihi,EklenmeTarihi) values ( '"+ req.body.sanatciAdi +"', "+ req.body.sanatciYasiyormu + ", "+ req.body.sanatciDogumTarihi +" , '"+ req.body.eklenmeTarihi +"' )", function (err) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('sanatci');
        });
    });
}
module.exports.sanatciGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from Sanatci where SanatciId = " + req.query.id, function (err, sanatcigncll) { 
            if (err) console.log(err)
            mq.close();
            console.log(sanatcigncll.recordset);
            res.render('sanatciGuncelle', { sanatcigncll: sanatcigncll.recordset[0], moment: moment });
            
        });
    });
}
module.exports.sanatciGuncellePost = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("UPDATE Sanatci SET SanatciAdi = '" + req.body.sanatciAdi + "',  SanatciYasiyormu = '"+ req.body.sanatciYasiyormu +"',  SanatciDogumTarihi = '"+ req.body.sanatciDogumTarihi +"',  EklenmeTarihi = '"+ req.body.eklenmeTarihi +"' WHERE SanatciId = " + req.query.id , function (err, sanatcigncll) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('sanatci');
        });
    });
}
module.exports.sanatciSil = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("DELETE FROM Sanatci WHERE SanatciId = " + req.query.id, function (err) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('sanatci');
        });
    });
}
module.exports.MuzikTurgetir = function (req, res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from MuzikTur ", function (err, tur) {
            if (err) console.log(err)
            mq.close();
            res.render('muziktur', { Mtur: tur.recordset });
        
        });
    });
}
module.exports.muzikTurEklePost = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("INSERT INTO MuzikTur(MuzikTur) values ( '"+ req.body.muzikTurAdi +"' )", function (err) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('muziktur');
        });
    });
}
module.exports.muzikTurGuncelleGet = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("select * from MuzikTur where MuzikTurId = " + req.query.id, function (err, muzikTurGncll) { 
            if (err) console.log(err)
            mq.close();
            console.log(muzikTurGncll.recordset);
            res.render('muzikTurGuncelle', { muzikTurGncll: muzikTurGncll.recordset[0], moment: moment });
            
        });
    });
}
module.exports.muzikTurSil = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("DELETE FROM MuzikTur WHERE MuzikTurId = " + req.query.id, function (err) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('muziktur');
        });
    });
}
module.exports.muzikTurGuncellePost = function (req,res) {
    mq.connect(config, function (err) {
        if (err) console.log(err);
        var request = new mq.Request();
        request.query("UPDATE MuzikTur SET MuzikTur = '" + req.body.muzikTurAdi + "' WHERE MuzikTurId = " + req.query.id , function (err, muzikTurGncll) { 
            if (err) console.log(err)
            mq.close();
            res.redirect('muzikTur');
        });
    });
}