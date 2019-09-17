import React from 'react';
import Modal from "../Modal";
import LoginForm from "../forms/LoginForm";
import {Link} from "react-router-dom";
import {LogInButton} from "./LogInButton";
import HeaderMenu from "./HeaderMenu";


const renderLoginModal = (onDismissLogIn) => {
    return <Modal onDismiss={onDismissLogIn}>
        <LoginForm onDismiss={onDismissLogIn} />
    </Modal>
};

const Header = (props) => {
    const {menuOpen, onMenuClick} = props;

    return <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/">
                <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" width="24" height="24"
                     stroke="currentColor" strokeWidth="2" fill="none"
                     strokeLinecap="round" strokeLinejoin="round"
                >
                    <circle cx="12" cy="5" r="3"/>
                    <line x1="12" y1="22" x2="12" y2="8"/>
                    <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
                </svg>
            </Link>
            <Link to="/">
                <span className="font-semibold text-xl tracking-tight">Joel Saunders</span>
            </Link>
        </div>
        <div className="block md:hidden">
            <button
                className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                onClick={onMenuClick}
            >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
            </button>
        </div>
        <div className={`w-full block flex-grow md:flex md:items-center md:w-auto ${menuOpen? null: 'hidden'}`}>
            <HeaderMenu currentPath={props.currentPath} />
        </div>
        <div className={menuOpen? '': 'hidden md:block'}>
            <LogInButton
                loggedIn={props.loggedIn}
                handleLogInClick={props.handleLogInClick}
                handleLogOutClick={props.handleLogOutClick}
            />
        </div>
        {props.renderLogInModal? renderLoginModal(props.onDismissLogIn) : null}
    </nav>;
};

export default Header
