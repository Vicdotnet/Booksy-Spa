// datos de ejemplo de libros
const books = [
    {
        id: 1,
        title: "cien años de soledad",
        author: "gabriel garcia marquez",
        category: "novela",
        price: 15990,
        icon: "📖",
        imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg"
    },
    {
        id: 2,
        title: "el principito",
        author: "antoine de saint exupery",
        category: "infantil",
        price: 8990,
        icon: "🌟",
        imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/dc/12/dc12a93fc08e81c356b5c1564393bcef.jpg"
    },
    {
        id: 3,
        title: "sapiens",
        author: "yuval noah harari",
        category: "divulgacion",
        price: 18990,
        icon: "🧠",
        imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/5d/8d/5d8d3ee1be6b8e9b36d4e4aa9a6c7507.jpg"
    },
    {
        id: 4,
        title: "1984",
        author: "george orwell",
        category: "novela",
        price: 12990,
        icon: "📕",
        imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/ee/e6/eee638bb0ad93c67ddcc573c839de05e.jpg"
    },
    {
        id: 5,
        title: "donde viven los monstruos",
        author: "maurice sendak",
        category: "infantil",
        price: 9990,
        icon: "👹",
        imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/ff/17/ff17c0b7d8a3ed17e8d0c41d13c3c7e0.jpg"
    },
    {
        id: 6,
        title: "breve historia del tiempo",
        author: "stephen hawking",
        category: "divulgacion",
        price: 16990,
        icon: "🌌",
        imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/d5/5e/d55e4a0a1a3c5a8fb7e9b2c4d6f8a0b1.jpg"
    },
    {
        id: 7,
        title: "rayuela",
        author: "julio cortazar",
        category: "novela",
        price: 14990,
        icon: "📗",
        imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/a1/92/a192e4d5f7c8b9a3e6d4f2c1b8a5e7d9.jpg"
    },
    {
        id: 8,
        title: "el patito feo",
        author: "hans christian andersen",
        category: "infantil",
        price: 7990,
        icon: "🦆",
        imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/b3/c4/b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8.jpg"
    },
    {
        id: 9,
        title: "cosmos",
        author: "carl sagan",
        category: "divulgacion",
        price: 19990,
        icon: "🚀",
        imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/c5/d6/c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0.jpg"
    },
    {
        id: 10,
        title: "pedro paramo",
        author: "juan rulfo",
        category: "novela",
        price: 11990,
        icon: "📘",
        imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/d7/e8/d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2.jpg"
    },
    {
        id: 11,
        title: "la oruga muy hambrienta",
        author: "eric carle",
        category: "infantil",
        price: 8990,
        icon: "🐛",
        imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/e9/f0/e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4.jpg"
    },
    {
        id: 12,
        title: "el gen egoista",
        author: "richard dawkins",
        category: "divulgacion",
        price: 17990,
        icon: "🧬",
        imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/f1/a2/f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6.jpg"
    }
];

let currentFilter = 'todos';

// funcion para renderizar libros
function renderBooks(filter = 'todos') {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    
    // filtrar libros segun categoria
    const filteredBooks = filter === 'todos' 
        ? books 
        : books.filter(book => book.category === filter);
    
    // crear tarjetas de libros
    filteredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        // crear imagen o icono
        let mediaContent = '';
        if (book.imagen) {
            mediaContent = `<img src="${book.imagen}" alt="${book.title}" class="book-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                           <div class="book-icon" style="display:none;">${book.icon}</div>`;
        } else {
            mediaContent = `<div class="book-icon">${book.icon}</div>`;
        }
        
        bookCard.innerHTML = `
            ${mediaContent}
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <span class="category">${book.category}</span>
            <p class="price">$${book.price.toLocaleString('es-CL')}</p>
        `;
        bookList.appendChild(bookCard);
    });
}

// funcion para filtrar libros
function filterBooks(category, event) {
    currentFilter = category;
    
    // actualizar botones activos
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // renderizar libros filtrados
    renderBooks(category);
}

// funcion para scroll suave al catalogo
function scrollToCatalog() {
    document.getElementById('catalogo').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// validacion y manejo del formulario
function handleSubmit(event) {
    event.preventDefault();
    
    // limpiar errores previos
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('successMessage').style.display = 'none';
    
    // obtener valores
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // validar nombre
    if (name === '') {
        document.getElementById('nameError').textContent = 'el nombre es obligatorio';
        isValid = false;
    }
    
    // validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'el correo es obligatorio';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'el formato del correo no es valido';
        isValid = false;
    }
    
    // validar mensaje
    if (message === '') {
        document.getElementById('messageError').textContent = 'el mensaje es obligatorio';
        isValid = false;
    }
    
    // si todo es valido
    if (isValid) {
        document.getElementById('successMessage').textContent = 
            'gracias por contactarnos! te responderemos pronto';
        document.getElementById('successMessage').style.display = 'block';
        
        // limpiar formulario
        document.getElementById('contactForm').reset();
        
        // ocultar mensaje despues de 5 segundos
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }
}

// navegacion suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// cargar libros al iniciar
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
});
