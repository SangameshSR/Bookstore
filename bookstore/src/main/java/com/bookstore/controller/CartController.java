package com.bookstore.controller;

import com.bookstore.model.Book;
import com.bookstore.service.BookService;
import com.bookstore.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;
    private final BookService bookService;

    public CartController(CartService cartService,
                          BookService bookService) {

        this.cartService = cartService;
        this.bookService = bookService;
    }

    @PostMapping("/cart/{id}")
    public String addToCart(@PathVariable int id) {

        Book book = bookService.getBookById(id);

        if (book != null) {
            cartService.addToCart(book);
            return "Book Added To Cart";
        }

        return "Book Not Found";
    }

    @GetMapping("/cart")
    public List<Book> getCart() {
        return cartService.getCartItems();
    }

    @DeleteMapping("/cart/{id}")
    public String removeBook(@PathVariable int id) {

        cartService.removeFromCart(id);

        return "Book Removed";
    }

    @PostMapping("/checkout")
    public String checkout() {

        cartService.clearCart();

        return "Order Placed Successfully";
    }
}