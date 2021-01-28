import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "../../assets/jss/material-dashboard-react/loginPage";

import image from "../../assets/img/bg7.jpg";
import {TextField} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogIn = () => {
        {

            const url = new URL('http://localhost:5000/api/user/us/' + username);
            fetch(url.toString())
                .then(response => {
                    if (!response.ok) {
                        console.log('error');
                    }
                    return response.json();
                })
                .then((data) => {
                    if(data.password && data.password === password) {
                        let org = data.org;
                        document.location.href="/home";
                        localStorage.setItem("isAuth", "xS1tnMgfDt");
                        localStorage.setItem("user", username);
                        localStorage.setItem("org", org);
                    }
                })
        }
    }

    const handleChangeName = e => {
        console.log('login' + e.target.value);
        setUsername(e.target.value);
    }

    const  handleChangeEmail = e => {
        console.log('login' + e.target.value);
        setEmail(e.target.value);
    }

    const  handleChangePass = e => {
        console.log('login' + e.target.value);
        setPassword(e.target.value);
    }


    return (
        <div>
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h3>Login</h3>
                                        <div className={classes.socialLine}>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <i className={"fab fa-twitter"} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <i className={"fab fa-facebook"} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <i className={"fab fa-google-plus-g"} />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <p>
                                            <TextField
                                                style={{ width: "100%", color: "red" }}
                                                label="First Name..."
                                                value={username}
                                                onChange={handleChangeName}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <People />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </p>
                                        <p>
                                            <TextField
                                                style={{ width: "100%" }}
                                                label="Email.."
                                                value={email}
                                                onChange={handleChangeEmail}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <Email />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </p>
                                    <p>
                                        <TextField
                                            style={{ width: "100%" }}
                                            type="password"
                                            label="Password"
                                            value={password}
                                            onChange={handleChangePass}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <LockIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </p>

                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="primary" size="lg" onClick={onLogIn}>
                                            Get started
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
