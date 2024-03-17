import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "../../axios";

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    palette: {
        type: "dark"
    },
    root: {
        width: "85%",
        marginTop: theme.spacing(3),
        overflowX: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto"
    },
    table: {
        minWidth: 650
    },
    text: {
        textAlign: "center"
    },
    button: {
        margin: theme.spacing(1),
        margin: "auto",
        left:"47%"
      },
    formControl: {
        margin: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(1),
        margin: "auto"
    },
    group: {
        margin: theme.spacing(1, 0)
    }
});

class StudentReport extends Component {


    constructor(props) {
        super(props);

        axios.post("/industry/findById", null, { params: { id: this.props.match.params.id } })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.post("/sortbyskills", null, { params: { id: this.props.match.params.id } })
            .then(response => {
                console.log(response.data);
                this.setState({
                    ...this.state,
                    students: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    printDocument = () => {
        document.getElementById("printbtn").style.display="none";
        window.print();
        document.getElementById("printbtn").style.display="none";
      }
    state = {
        students: [],
        company: '',
        branch: 'computer'
    };

    handleChange = event => {
        this.setState({
            ...this.state,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div>
                
                <br></br>
                <Paper className={classes.root}>
                
                    <Grid container>
                        <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom style={{ marginTop: '10vh', marginLeft:'auto',marginRight:'auto',textAlign:'center' }}>
                        <Button
                    variant="contained"
                    color="primary"
                    id="printbtn"
                    className={classes.button}
                    onClick={this.printDocument}
                >
                    Print
                </Button>
                            </Typography>
                            <Typography variant="h6" gutterBottom style={{ marginTop: '10vh', marginLeft:'auto',marginRight:'auto',textAlign:'center' }}>
                                Company Name: {this.state.company.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Roll Number</TableCell>
                                        <TableCell align="right">SGPA</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.students.map(s => (
                                        <TableRow key={s.student.rollno}>
                                            <TableCell component="th" scope="row">
                                                {s.student.rollno}
                                            </TableCell>
                                            <TableCell align="right">{s.student.firstname}</TableCell>
                                            <TableCell align="right">{s.student.rollno}</TableCell>
                                            <TableCell align="right">{s.sgpaAggregate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(StudentReport);
