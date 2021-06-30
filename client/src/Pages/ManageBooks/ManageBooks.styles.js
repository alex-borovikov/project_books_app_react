import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {

    },
    submit: {
        background: '#9CE275',
        color: '#fff',
        '&:hover': {
            background: '#5CE288',
        }
    },
    fieldSelect: {
        '& input ~ fieldset': {
            border: '1px solid red !important'
        }
    },
    input: {
        width: '50vw',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    formControl: {
        width: '50vw',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    backButton: {
        marginTop: '40px'
    },
    backLink: {
        color: '#000',
        fontSize: '2em',
        display: 'flex',
        width: 'fit-content',
        padding: '5px 10px',
        transition: 'background .3s',
        borderRadius: '10px',
        '&:hover': {
            background: '#F1F3F4'
        }
    },
    arrow: {
        transform: 'rotate(180deg) translateY(-3px)',
        marginRight: '10px'
    }
}))

export default useStyles;