document.getElementById("view-books").addEventListener("click",function()
{
fetch('/books',{
    headers:
    {
        'Authorization':"Bearer"+localStorage.getItem('token')

    }
})
.then(response=> response.json())
.then(data=>
{
    const res=document.getElementById('results');
    res.innerHTML="<h3>Available Books:</h3>";
    data.books.forEach(book=>
    {
        res.innerHTML+='<p>'+book.title+"     -      "+book.author+"</p>";

    });
});
});
document.getElementById('view-borrowed').addEventListener('click',function()
{
    fetch('/borrowed-books',{
        headers:
        {
            'Authorization': ` Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response=>response.json())
    .then(data=>
    {
        const res=document.getElementById('results');
        res.innerHTML="<h3>Available Books:</h3>";
        data.books.forEach(book=>
            {
                res.innerHTML+=`<p>${book.title}     -      ${book.author}</p>`;

            });
    }
    );

});

