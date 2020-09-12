const request = require("request");
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7bb7cbb04cc2dd51f21b986904e35187&query='+longitude+','+latitude;
    request({url:url,json:true},(error,response,body)=>{
        if(error)
        callback('unable to defined',undefined)
        else if(body.error)
        callback('try again',undefined)
        else{
            callback(undefined,{
               temperature:body.current.temperature,
               palce:body.location.name,
               rain:body.current.precip
            })
        }
    })

}
module.exports=forecast;