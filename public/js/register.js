document.getElementById('register-form').addEventListener('submit',
    async function(e){
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
    try{
    console.log(regData);
    const response=await fetch('/register',{
        method:'POST',
        headers:
        {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(regData)
    });
    
        if(!response.ok){
            console.log(response);
            const err= await response.json();
            throw new Error(err.error);}
        
    
    const data=await response.json();
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

    }
    catch(error)
    {
        console.error("Error:",error);
    }
    
});