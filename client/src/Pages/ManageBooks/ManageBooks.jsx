import React, {useContext, useState, Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import useDashboardStyles from '../DashBoard/Dashboard.styles'
import useStyles from "./ManageBooks.styles";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {BookContext} from "../../context";
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from "@material-ui/lab";




const ManageBooks = () => {
    const classes_dashboard = useDashboardStyles()
    const classes = useStyles()
    const {flag, books, setBooks, setFlag, setFields, fields, redirect, setRedirect} = useContext(BookContext)


    const [openSucces, setSuccess] = useState(false);
    const [openError, setError] = useState(false);

    const [validator, setValidator] = useState({
        title: false,
        author: false,
        isbn: false,
        category: false
    })

    const handleSubmit = e => {
        e.preventDefault();

        //Fields validation / if fields is not empty
        if(fields.title.length > 0 && fields.author.length > 0 && fields.isbn.length > 0 && fields.category.length > 0){
            setSuccess(true);
            setValidator({
                title: false,
                author: false,
                isbn: false,
                category: false
            })

            //Add books to data
            const addBook = async () => {
                const response = await fetch('http://localhost:5000/books', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: fields.title,
                        author: fields.author,
                        isbn: fields.isbn,
                        category: fields.category,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const json = await response.json()
                setBooks([...books, json])
                setFields({
                    title: '',
                    author: '',
                    isbn: '',
                    category: '',
                    id: ''
                })
            }
            //Update books
            const updateBook = async (id) => {
                const response = await fetch('http://localhost:5000/books/' + fields.id, {
                    method: 'PUT',
                    body: JSON.stringify({title: fields.title, author: fields.author, isbn: fields.isbn, category: fields.category}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const json = await response.json()
                setBooks([...books.filter(book => book.id !== fields.id), json])
                setRedirect(true)
            }

            //If flag true we must update the book and if false we add the book to data
            if(flag){
                updateBook()
            } else {
                addBook()
            }



        } else {
            setError(true);
            //If one of fields is empty we set the flag and highlight them with color
            setValidator({
                title: fields.title.length < 1 ,
                author: fields.author.length < 1 ,
                isbn: fields.isbn.length < 1 ,
                category: fields.category.length < 1
            })
        }
    }
    //Select change handler
    const handleChange = (event) => {
        setFields({...fields , category: event.target.value});
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);
        setError(false);
    };
    const handleBack = () => {
        setFlag(false)
    }


    return redirect ? (
        <Redirect to='/' />
    ) : (
        <Fragment>
            <Snackbar open={openSucces} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal: "right", vertical: "top"}}>
                <Alert onClose={handleClose} severity="success">
                    {flag ? 'Changing has been saved!' : 'Book has been added!'}
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal: "right", vertical: "top"}}>
                <Alert onClose={handleClose} severity="error">
                    Fields cant be empty!
                </Alert>
            </Snackbar>

            <div className={classes_dashboard.root}>
                <div className={classes_dashboard.title}>
                    {flag ? 'Edit book' : 'Add book'}
                </div>
                <form onSubmit={handleSubmit} >
                    <Grid container direction='column' spacing={2} >
                        {/*if the field is empty -> change border color*/}
                        <Grid item className={ validator.title ? classes.fieldSelect : null }>
                            <TextField
                                className={classes.input}
                                id="outlined-basic"
                                label="Title *"
                                value={fields.title}
                                onChange={e => setFields({...fields, title: e.target.value})}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item className={ validator.author ? classes.fieldSelect : null }>
                            <TextField
                                className={classes.input}
                                id="outlined-basic"
                                label="Author *"
                                value={fields.author}
                                onChange={e => setFields({ ...fields, author: e.target.value})}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item className={ validator.isbn ? classes.fieldSelect : null }>
                            <TextField
                                className={classes.input}
                                id="outlined-basic"
                                label="ISBN *"
                                value={fields.isbn}
                                onChange={e => setFields({...fields, isbn: e.target.value})}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item className={ validator.category ? classes.fieldSelect : null }>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={fields.category}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='1 category'>1 category</MenuItem>
                                    <MenuItem value='2 category'>2 category</MenuItem>
                                    <MenuItem value='3 category'>3 category</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" className={classes.submit} type='submit'>
                                {flag ? 'Save' : 'Add book'}
                            </Button>
                        </Grid>
                    </Grid>


                </form>
                <div className={classes.backButton}>

                    <NavLink to='/' className={classes.backLink} onClick={handleBack}>
                        <ArrowForwardIcon className={classes.arrow} />
                        <p>Back to Dashboard</p>
                    </NavLink>
                </div>
            </div>
        </Fragment>

    );
};

export default ManageBooks;