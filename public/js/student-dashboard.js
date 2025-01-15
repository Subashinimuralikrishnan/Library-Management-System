document.getElementById("view-books").addEventListener("click",function()
{
fetch('/books',{
    headers:
    {
        'Authorization':"Bearer "+localStorage.getItem('token')

    }
})
.then(response=>{ 
    if(!response.ok)
    {
        console.log("no 200!");
    }
    console.log(response);
    return response.json()})
.then(data=>
{
    const res=document.getElementById('results');
    res.innerHTML="<h3>Available Books:</h3>";
    console.log(data);
    data.books.forEach(book=>
    {
        res.innerHTML+='<p>'+book.id+"   "+book.title+"   "+book.author+"</p>";

    });
});
});
document.getElementById('view-borrowed').addEventListener('click',function()
{
    fetch('/borrowed-books',{
        headers:
        {
            'Authorization': ` Bearer ${localStorage.getItem('token')}`
        },
        body:
        {
            'studentId':localStorage.getItem("_id")
        }
        
    })
    .then(response=>response.json())
    .then(data=>
    {
        const res=document.getElementById('results');
        res.innerHTML="<h3>Available Books:</h3>";
        data.books.forEach(book=>
            {
                res.innerHTML+=`<p>${book.title}-${book.author}</p>`;

            });
    }
    );

});
/*document.getElementById("borrow").addEventListener("click",function()
{
const url="http://localhost:5000/student";
const token=localStorage.getItem('authToken');
async function fetchBorrowedBooks()
{
    try{
        const response=await fetch(url+"/borrowed-books",{
                method:'GET',
                headers:{
                    'Authorization':"Bearer "+token
                }
        });
        const data=await response.json();
        populateTable(data);

    }
    catch(error)
    {
        console.error('Error fetching borrowed books:',error);

    }
}
});*/