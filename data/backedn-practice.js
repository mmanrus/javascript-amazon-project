const xhr = new XMLHttpRequest();

 // response has loaded.
xhr.addEventListener('load', ()=> {
    console.log(xhr.response);
});
xhr.open('GET', 'https://supersimplebackend.dev');

xhr.send();
 

// Response Request Cycle = 1 request one Respond