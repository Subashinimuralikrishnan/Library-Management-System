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
function populateTable(books)
{
    const tbody=document.getElementById('borrowedBooksTable').querySelector('tbody');
    tbody.innerHTML='';
    books.forEach(book=>
        {
            const row=document.createElement('tr');
            row.innerHTML=`
            <td>${book.book.title}</td>
            <td>${new Date(book.borrowDate).toLocaleDateString()}</td>
            <td>${book.returnDate ? new Date(book.returnDate).tolocaleString():'Not yet returned!'}</td>
            <td>
                ${book.returnDate ? '':`<button onclick="returnBook('${book.book.id}')">Return Book</button>`}
            </td>`;
            tbody.appendChild(row);
        }
    );
}
async function borrowBook()
{
    const bookId=document.getElementById('bookId').value;
    if(!bookId)
{
    alert("Please enter a Book ID!");
    return;
}

try{
    const response=await fetch(`${url}/borrow-book/${bookId}`,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    });
    const data=await response.json();
    if(response.ok)
    {
        alert(data.message);
        fetchBorrowedBooks();
    }
    else{
        alert(data.message || 'Error borrowing book');

    }
}
catch(error)
{
    console.log('Error:'+error);
}
}
window.onload=function(){
fetchBorrowedBooks();
}

