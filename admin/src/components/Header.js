import React, {useState} from 'react';
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {signOut} from "../actions";
import {Link} from "react-router-dom";

const Header = (props) => {
    const[logInOpen, setLoginOpen] = useState(false);

    const onLogInClick = () => {
        setLoginOpen(true);
    };

    const onLogOutClick = () => {
        props.signOut()
    };

    const onDismissLogIn = () => {
        setLoginOpen(false);
    };

    const renderLogButton = () => {
        if (!props.loggedIn) {
            return <button onClick={onLogInClick} className="ui right floated button">
                Log In
            </button>;
        } else {
            return <button onClick={onLogOutClick} className="ui right floated button">
                Log Out
            </button>;
        }
    };

    const renderLoginModal = () => {
        return <Modal onDismiss={onDismissLogIn}>
            <LoginForm onDismiss={onDismissLogIn} />
        </Modal>
    };

    return <div className="ui header">
        <Link to="/">Blog Admin</Link>
        {renderLogButton()}
        {logInOpen? renderLoginModal() : null}
    </div>;
};

const mapStateToProps = (state) => {
    return {loggedIn: state.auth.token !== null}
};

export default connect(mapStateToProps, {signOut})(Header);
