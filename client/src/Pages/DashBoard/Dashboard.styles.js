import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( theme => ({
    root: {
        padding: '30px'
    },
    table: {
        minWidth: 650,
    },
    title: {
        fontSize: '2.8em',
        fontWeight: '800',
        marginBottom: '30px'
    },
    tableRow: {
        '& > th': {
            fontWeight: '700',
            letterSpacing: '.7px'
        }
    },
    addBook: {
        marginBottom: '20px'
    },
    [theme.breakpoints.down('lg')]: {
        gridButtons: {
            flexWrap: 'nowrap'
        }
    },
    addBookButton: {
        background: '#9CE275',
        color: '#fff',
        '&:hover': {
            background: '#5CE288',
        }
    },

}))
export default useStyles;