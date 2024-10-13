document.getElementById('register-form').addEventListener('submit',function(e){
    e.preventDefault();
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const role=document.getElementById('role').value;

    const regData={
        name:name,
        email:email,
        password:password,
        role:role
    };
    console.log(regData);
    fetch('http://localhost:5000/register',{
        method:'POST',
        headers:
        {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(regData)
    })
    .then(response=>{
        if(!response.ok){
            console.log(response.error)
            throw new Error("HTTP error!");}
        return response.json()})
    
    .then(data=>
    {
        if(data.token)
        {
            localStorage.setItem('token',data.token);
            if(role=='student'){
                window.location.href='/student-dashboard.html';
            }
            else
            {
                window.location.href='/admin-dashboard.html';
            }

        }
        else{
            alert("Login failed!");
        }

    })
    .catch(error=>
    {
        console.error("Error:",error);
    });
    
});