import React from 'react';
import {ErrorMessage, Field} from "formik";
import {Link} from "react-router-dom";

const PageOne = (props) => {
    const err = props.formProps.errors.hasOwnProperty('title');

    return <>
        <div className="field">
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" placeholder="Title"/>
        </div>
        <div className={`ui error message ${err ? 'visible': null}`}>
            <ErrorMessage className="ui error message visible" name="title" />
        </div>
        <Link to={`${props.rootURL}/page-two`}>
            <div className="ui submit button">
                Next Page
            </div>
        </Link>
    </>
};

export default PageOne;
