import React, {useContext} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Grid} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import useStyles from "./Dashboard.styles";
import {BookContext} from "../../context";




const Dashboard = () => {
    const classes = useStyles();

    const {books, setBooks, setFlag, setFields, setRedirect} = useContext(BookContext)


    const deleteBook = async (id) => {
        await fetch('http://localhost:5000/books/' + id, {
            method: 'DELETE',
        })
        setBooks([...books.filter(book => book.id !== id)])
    }

    const editHandler = (title, author, isbn, category, id) => {
        setFlag(true);
        setRedirect(false)
        setFields({title, author, isbn, category, id})

    }
    const addBookHandler = () => {
        setFields({
            title: '',
            author: '',
            isbn: '',
            category: '',
            id: ''
        })
        setRedirect(false)
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>Books App</div>
            <div className={classes.addBook}>
                <NavLink to='/manage' onClick={addBookHandler}>
                    <Button variant="contained" className={classes.addBookButton}>
                        Add book
                    </Button>
                </NavLink>
            </div>
            <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow className={classes.tableRow}>
                                <TableCell align="center">#</TableCell>
                                <TableCell>Book Title</TableCell>
                                <TableCell align="center">Author name</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">ISBN</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book, index) => (

                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell component="th" scope="row">{book?.title}</TableCell>
                                    <TableCell align="center">{book?.author}</TableCell>
                                    <TableCell align="center">{book?.category}</TableCell>
                                    <TableCell align="center">{book?.isbn}</TableCell>
                                    <TableCell align="right" >
                                        <Grid container spacing={2} justify={"center"} className={classes.gridButtons}>
                                            <Grid item>
                                                <NavLink to='/manage' >
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => editHandler(book.title, book.author, book.isbn, book.category, book.id)}>
                                                        Edit
                                                    </Button>
                                                </NavLink>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => deleteBook(book.id)
                                                    }>
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
};

export default Dashboard;