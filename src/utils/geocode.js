const request = require("request");
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWJ1c2lkZGlxdWUxOTgiLCJhIjoiY2tlYjRhOWZwMDU3bTJ0cXliNXByYm5uZSJ9.S06-HNeQQ45VpPGG8vAmqQ';
   // request({url:url,json:true},(error,response,body)=>{
         //here i can use shrthand property of ES6 
         request({url,json:true},(error,response,body)=>{
         if(error)
        callback('unable to defined',undefined)
        else if(body.message || body.features.length==0)
        callback('invalid address',undefined)
        else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })

}
module.exports=geocode;