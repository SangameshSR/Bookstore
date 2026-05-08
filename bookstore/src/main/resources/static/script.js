const API = "http://localhost:8080";

async function loadBooks() {

    const response = await fetch(`${API}/books`);

    const books = await response.json();

    const bookList =
        document.getElementById("book-list");

    if(!bookList) return;

    bookList.innerHTML = "";

    books.forEach(book => {

        bookList.innerHTML += `
            <div class="book">

                <h3>${book.title}</h3>

                <p><strong>Author:</strong>
                ${book.author}</p>

                <p><strong>Price:</strong>
                ₹${book.price}</p>

                <a href="book.html?id=${book.id}">
                    <button>
                        View Details
                    </button>
                </a>

            </div>
        `;
    });
}

async function loadBookDetails() {

    const params =
        new URLSearchParams(window.location.search);

    const id = params.get("id");

    if(!id) return;

    const response =
        await fetch(`${API}/books/${id}`);

    const book = await response.json();

    const div =
        document.getElementById("book-details");

    if(!div) return;

    div.innerHTML = `
        <div class="book">

            <h1>${book.title}</h1>

            <p><strong>Author:</strong>
            ${book.author}</p>

            <p>${book.description}</p>

            <h2>₹${book.price}</h2>

            <button onclick="addToCart(${book.id})">
                Add To Cart
            </button>

        </div>
    `;
}

async function addToCart(id) {

    await fetch(`${API}/cart/${id}`, {
        method:"POST"
    });

    alert("Book Added To Cart");
}

async function loadCart() {

    const response =
        await fetch(`${API}/cart`);

    const books = await response.json();

    const cartDiv =
        document.getElementById("cart-items");

    const totalDiv =
        document.getElementById("total");

    if(!cartDiv) return;

    cartDiv.innerHTML = "";

    let total = 0;

    books.forEach(book => {

        total += book.price;

        cartDiv.innerHTML += `
            <div class="book">

                <h3>${book.title}</h3>

                <p>₹${book.price}</p>

                <button onclick="removeBook(${book.id})">
                    Remove
                </button>

            </div>
        `;
    });

    totalDiv.innerHTML =
        `Total: ₹${total}`;
}

async function removeBook(id) {

    await fetch(`${API}/cart/${id}`, {
        method:"DELETE"
    });

    loadCart();
}

async function checkout() {

    await fetch(`${API}/checkout`, {
        method:"POST"
    });

    window.location.href =
        "checkout.html";
}

loadBooks();
loadBookDetails();
loadCart();