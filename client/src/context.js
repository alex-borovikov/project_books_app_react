import React, {useEffect, useState} from 'react';

export const BookContext = React.createContext()

export const BookProvider = ({children}) => {
    const [books, setBooks] = useState([])
    const [flag, setFlag] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [fields, setFields] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        id: ''
    })


    useEffect(() => {
        const getBooks = async () => {
            const response = await fetch('http://localhost:5000/books', {
                method: 'GET'
            })
            const json = await response.json()
            setBooks([...json])
        }
        getBooks()
    }, [])

    return (
        <BookContext.Provider value={{books, setBooks, flag, setFlag, fields, setFields, redirect, setRedirect}}>{children}</BookContext.Provider>
    )
}

