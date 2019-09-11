import React from 'react';
import {ErrorMessage, Field} from "formik";


const PageTwo = (props) => {
    const err = props.formProps.errors.hasOwnProperty('description');

    return <>
        <div className="field">
            <label htmlFor="body">Description</label>
            <Field component="textarea" name="body" placeholder="Body"/>
        </div>
        <div className={`ui error message ${err ? 'visible': null}`}>
            <ErrorMessage className="ui error message visible" name="body" />
        </div>
        <button className="ui submit button" type="submit" disabled={props.formProps.isSubmitting}>Submit</button>
    </>
};

export default PageTwo;
