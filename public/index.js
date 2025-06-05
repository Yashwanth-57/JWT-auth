




document.getElementById('reg').addEventListener('click', ()=>{
 const username=document.getElementById('username').value;
 const password= document.getElementById('password').value;
 axios.post('/api/reg', {
    username,password
 },{ headers:{'Content-Type':'application/json'}})
    .then(response=>{

    document.getElementById('result').innerHTML=`<pre> <h1>${response.data.message} </h1></pre>`
    document.getElementById('username').value='';
    document.getElementById('password').value='';

 })
    .catch(error=>{
         document.getElementById('result').innerHTML=`<pre> <h1> ${error.response.data.error}</h1> </pre>`
         document.getElementById('username').value='';
         document.getElementById('password').value='';
        console.log("error", error);
    } )

})
 
document.getElementById('login').addEventListener('click',()=>{
    const username=document.getElementById('username1').value;
    const password=document.getElementById('password1').value;
    axios.post('/api/login',{ username,password},{
        headers:{'Content-Type':'application/json'}
    })
    .then(response=>{

        localStorage.setItem('jwt', response.data.token);
        document.getElementById('username1').value='';
        document.getElementById('password1').value='';
        window.location.href = '/dashboard';
        
    })
    .catch(error=>{
        console.log('1234567800');
       
        document.getElementById('result').innerHTML=`<pre> <h1> ${error.response.data.error} </h1></pre>`;
        document.getElementById('username1').value='';
        document.getElementById('password1').value='';
    })
})

 