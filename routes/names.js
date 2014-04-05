exports.autogen = function (req, res) {
 var startname = req.query.name;

 var altnames = [];

 altnames.push(startname.replace(/[aeiou]/g, ""));

 if(startname.match(/one/) != null)
     altnames.push(startname.replace(/one/g, "1"));
 if(startname.match(/two/)  != null)
    altnames.push(startname.replace(/two/g, "2"));
 if(startname.match(/three/)  != null)
    altnames.push(startname.replace(/three/g, "3"));
 if(startname.match(/four(ty)?/)  != null)
    altnames.push(startname.replace(/four(ty)?/g, "4"));
 if(startname.match(/fi[(ve)(fty)]?/)  != null)
    altnames.push(startname.replace(/fi[(ve)(fty)]?/g, "5"));
 if(startname.match(/six(ty)?/)  != null)
    altnames.push(startname.replace(/six(ty)?/g, "6"));
 if(startname.match(/seven(ty)?/)  != null)
     altnames.push(startname.replace(/seven(ty)?/g, "7"));
 if(startname.match(/eight(y)?/) != null)
    altnames.push(startname.replace(/eight(y)?/g, "8"));
 if(startname.match(/nine(ty)?/) != null)
     altnames.push(startname.replace(/nine(ty)?/g, "9"));

 altnames.push(startname + "ify");
 altnames.push(startname + "omatic");
 altnames.push(startname + "er");
 altnames.push(startname + "ly");
 altnames.push(startname + "gram");
 altnames.push(startname + "icus");

 altnames.push("i" + startname);
 altnames.push("my" + startname);
 altnames.push("because" + startname);
 altnames.push("insta" + startname);
 altnames.push("cloud" + startname);

 res.json({success:true, names: altnames});
}