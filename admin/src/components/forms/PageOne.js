import React from 'react';
import {ErrorMessage, Field} from "formik";
import {Link} from "react-router-dom";

const PageOne = (props) => {
    const titleErr = props.formProps.errors.hasOwnProperty('title');
    const descriptionErr = props.formProps.errors.hasOwnProperty('description');
    const pictureErr = props.formProps.errors.hasOwnProperty('picture');

    return <>
        <div className="field">
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" placeholder="Title"/>
        </div>
        <div className={`ui error message ${titleErr ? 'visible': null}`}>
            <ErrorMessage className="ui error message visible" name="title" />
        </div>

        <div className="field">
            <label htmlFor="description">Description</label>
            <Field component="textarea" name="description" placeholder="Description"/>
        </div>
        <div className={`ui error message ${descriptionErr ? 'visible': null}`}>
            <ErrorMessage className="ui error message visible" name="description" />
        </div>

        <div className="field">
            <label htmlFor="description">Picture</label>
            <Field type="text" name="picture" placeholder="Picture"/>
        </div>
        <div className={`ui error message ${pictureErr ? 'visible': null}`}>
            <ErrorMessage className="ui error message visible" name="picture" />
        </div>

        <Link to={`${props.rootURL}/page-two`}>
            <div className="ui submit button">
                Next Page
            </div>
        </Link>
    </>
};

export default PageOne;
