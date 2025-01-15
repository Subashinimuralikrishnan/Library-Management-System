document.getElementById('manage-books').addEventListener('click', function() {
    window.location.href = '/manage-books.html';
});

document.getElementById('view-students').addEventListener('click', function() {
    fetch('/students', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = "<h3>Registered Students:</h3>";
        data.students.forEach(student => {
            resultsDiv.innerHTML += `<p>${student.name} - ${student.email}</p>`;
        });
    });
});
function adder()
    {
        try
        {
        var id=parseInt(document.getElementById('bid').value);
        var title=document.getElementById('title').value;
        var author=document.getElementById('author').value;
        var copies=parseInt(document.getElementById('copies').value);
        const regData={
            id:id,
            title:title,
            author:author,
            copies:copies
        };
        console.log(regData);
        fetch('/books',{
            method:'POST',
            headers:
            {
                'Authorization': ` Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(regData)
        })
        .then(response=>{
            if(!response.ok){
                console.log(response)
                throw new Error("HTTP error!");}
            return response.json()})
        
        .then(data=>
        {
            alert("Succesfully Added the Books!")
    
        })
        .catch(error=>
        {
            console.error("Error:",error);
        });
        

        }
        catch(err)
        {

            console.error("Error:",err);
        }
    }

document.getElementById("add-book").addEventListener("click",function()
{
    console.log('clicked');
    var form=document.createElement('form');
    var ip1=document.createElement('input');
    ip1.type='text';
    ip1.id='title';
    ip1.class='myip';
    ip1.placeholder='Enter title';
    var ip2=document.createElement('input');
    ip2.type='text';
    ip2.id='bid';
    ip2.class='myip';
    ip2.placeholder='Enter book id';
    var ip3=document.createElement('input');
    ip3.type='text';
    ip3.id='author';
    ip3.class='myip';
    ip3.placeholder='Enter author';
    var ip4=document.createElement('input');
    ip4.type='text';
    ip4.id='copies';
    ip4.class='myip';
    ip4.placeholder='Enter no. of copies available';
    form.appendChild(ip1);form.appendChild(ip2);form.appendChild(ip3);form.appendChild(ip4);
    document.body.appendChild(form);
    var b=document.createElement("button");
    b.value="ADD";
    document.body.appendChild(b);
    b.addEventListener("click",adder);
    
    
});