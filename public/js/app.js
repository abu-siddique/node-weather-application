

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageZero=document.querySelector('#message-0')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector("#message-2")
//messageOne.textContent='i am text content';
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('it is working')
    const location=search.value;

    messageOne.textContent='loading...';
    messageZero.textContent='';
    messageTwo.textContent=''; 

    fetch('/weather?address='+location).then( (response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
               // console.log(data.error)
          messageOne.textContent=data.error;
        
        } 
        else
        {
            // console.log(data.temperature)
            // console.log(data.rain)
            messageZero.textContent=data.place
            messageOne.textContent=data.temperature
            messageTwo.textContent=data.rain
        }
    })
})


})