package com.bookstore.service;

import com.bookstore.model.Book;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    private List<Book> books = new ArrayList<>();

    public BookService() {

        books.add(new Book(
                1,
                "Java Programming",
                "James Gosling",
                499,
                "Complete Java Programming Guide"
        ));

        books.add(new Book(
                2,
                "Spring Boot",
                "Rod Johnson",
                599,
                "Learn Spring Boot Development"
        ));

        books.add(new Book(
                3,
                "JavaScript Basics",
                "Brendan Eich",
                399,
                "Frontend JavaScript Concepts"
        ));
    }

    public List<Book> getAllBooks() {
        return books;
    }

    public Book getBookById(int id) {

        for (Book book : books) {

            if (book.getId() == id) {
                return book;
            }
        }

        return null;
    }
}