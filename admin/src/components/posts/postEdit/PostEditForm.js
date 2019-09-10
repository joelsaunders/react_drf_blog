import React from 'react';
import {Form, withFormik} from "formik";
import * as Yup from 'yup';
import {Redirect, Route, Switch} from "react-router-dom";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";

const PostEditForm = (props) => {
    return <div className="ui form">
        <Form>
            <Switch>
            <Redirect from="/posts/edit/:slug" exact to="/posts/edit/:slug/page-one"/>
            <Route
                path="/posts/edit/:slug/page-one"
                render={routeProps => (<PageOne {...routeProps} formProps={props} />)}
            />
            <Route
                path="/posts/edit/:slug/page-two"
                render={routeProps => (<PageTwo {...routeProps} formProps={props} />)}
            />
            </Switch>
        </Form>
    </div>
};

const FormikPostEditForm = withFormik({
    mapPropsToValues: (props) => {
        return {
            title: props.post.title,
            description: props.post.description
        }
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().max(50, 'Must be less than 100 characters').required('Required')
    }),
    enableReinitialize: true,
    handleSubmit: (values, {setSubmitting}) => {
        setTimeout(() => {
            console.log(values);
            setSubmitting(false);
        }, 1000);
    }
});

export default FormikPostEditForm(PostEditForm);