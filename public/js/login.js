document.getElementById('login-form').addEventListener('submit',function(e){
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const role=document.getElementById('role').value;

    const loginData={
        email:email,
        password:password,
        role:role
    };
    fetch('/login',{
        method:'POST',
        headers:
        {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(loginData)
    })
    .then(response=>{
        if(!response.ok){
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