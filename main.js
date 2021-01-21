//tampilkan array list buku di table
//mengubah status read (setAttribute?)
//function untuk mengambil input user kemudian menyimpan ke array

const addBtn = document.querySelector('#add_btn')
const submitFormBtn = document.getElementById('sub')
const form = document.getElementsByTagName('form')[0];
const table = document.querySelector('#book_list');
const tbHead = document.querySelector('#tb_head')
const tBody = document.querySelector('tbody')
const closeForm = document.getElementById('close');

const inputTitle = document.getElementById('input_title');
const inputAuthor = document.getElementById('input_author');
const inputPages = document.getElementById('input_pages');

const titleMessageError = document.getElementById('title-valid');
const authorMessageError = document.getElementById('author-valid');
const pagesMessageError = document.getElementById('pages-valid');

let myLibrary = [
    {
        title: 'The Road',
        author: 'Comac McCarthy',
        pages: 287,
        read: false
    },
    {
        title: 'The Last Wish',
        author: 'Andrzej Sapkowski',
        pages: 288,
        read: false
    },
    {
        title: 'World War Z',
        author: 'Max Brooks',
        pages: 342,
        read: false
    },
    {
        title: 'To Kill A Mockingbird',
        author: 'Harper Lee',
        pages: 281,
        read: false
    }
]

function display(library){

    refreshTable(table);

    for(let prop of library){   //retrieve all objects inside an array
        var createRow = document.createElement('tr');
        var actionCol = document.createElement('td');
        actionCol.style = 'text-align: center; cursor: pointer'
        actionCol.setAttribute('onclick','removeItem(this)')

        tBody.appendChild(createRow)
        var propValue = Object.keys(prop)   //retrieve all properties inside an object
        for(let i = 0; i < propValue.length; i++){
            var createCol = document.createElement('td')
            // console.log(`${propValue[i]}: ` + prop[`${propValue[i]}`])
            if(i === 2){
                createCol.style = 'text-align: center'
                
            }else if(i === 3){
                createCol.style = 'text-align: center; cursor: pointer'
                createCol.setAttribute('onclick','changeReadStat(this)')
            }       
            createCol.textContent = prop[`${propValue[i]}`]
            createRow.appendChild(createCol)
        }
        actionCol.textContent = '[x]'
        createRow.appendChild(actionCol)

    }
    console.log(myLibrary.map(e => e))
}

function removeItem(row){
    var i = row.parentNode.rowIndex
    table.deleteRow(i)
    myLibrary.splice(i - 1, 1)

    console.log(myLibrary.map(e => e))
}

function changeReadStat(row){
    var i = row.parentNode.rowIndex;
    var readStat = myLibrary[i - 1].read
    !readStat? myLibrary[i - 1].read = true : myLibrary[i - 1].read = false;

    display(myLibrary)
    // console.log('readStat: ' + readStat)
}

function refreshTable(tb){
    while(tb.rows.length > 1){
        tb.deleteRow(1)
    }
}

function addBookToLibrary(){
    let title = document.getElementById('input_title').value
    let author = document.getElementById('input_author').value
    let pages = document.getElementById('input_pages').value
    let read = document.querySelector('input[ name= "read" ]:checked').value

    let book = new Book(title,author,pages,read)
    myLibrary.push(book)

    console.log(read)
    display(myLibrary)
}

closeForm.addEventListener('click', () => {
    form.classList.add('hid');
})

//Object constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

addBtn.onclick = function(){
    form.classList.remove('hid')
    document.querySelector('#input_title').value = ''
    document.querySelector('#input_author').value = ''
    document.querySelector('#input_pages').value = ''
    document.querySelector('#input_title').focus();
}

// submitFormBtn.onclick = function(){
//     addBookToLibrary()
//     form.classList.add('hid')    
        
// }

submitFormBtn.addEventListener('click', (event) => {
    if (!inputTitle.validity.valid) {
        showError(inputTitle);
        event.preventDefault();
    } else if (!inputAuthor.validity.valid) {
        showError(inputAuthor);
        event.preventDefault();
    } else if (!inputPages.validity.valid) {
        showError(inputPages);
        event.preventDefault();
    } else {
        addBookToLibrary();
        form.classList.add('hid');
    }
})

display(myLibrary)


inputTitle.addEventListener('input', () => {
    if (inputTitle.validity.valid) {
        titleMessageError.textContent = '';
    } else {
        showError(inputTitle);
    }
})

inputAuthor.addEventListener('input', () => {
    if (inputAuthor.validity.valid) {
        authorMessageError.textContent = '';
    } else {
        showError(inputAuthor);
    }
})

inputPages.addEventListener('input', () => {
    if (inputPages.validity.valid) {
        pagesMessageError.textContent = '';
    } else {
        showError(inputPages);
    }
})

// inputTitle.addEventListener('input', () => {
//     if (inputTitle.validity.valid) {
//         titleMessageError.textContent = '';
//     } else {
//         showError(inputTitle);
//     }
// })

function showError(el) {
    switch (el) {
        case inputTitle:
            if (inputTitle.validity.valueMissing) {
                titleMessageError.textContent = 'title is required';
            }
            break;
        case inputAuthor:
            if (inputAuthor.validity.valueMissing) {
                authorMessageError.textContent = 'author is required';
            }
            break;
        case inputPages:
            if (inputPages.validity.valueMissing) {
                pagesMessageError.textContent = 'pages is required';
            }
            break;
    }
}