import React from "react";
import {Field, Form, Formik} from "formik";
import {connect} from "react-redux";
import {signIn} from "../actions";
import theBookOfJoel from "../apis/theBookOfJoel";

const LoginForm = (props) => {
    const handleSubmit = async (values, actions) => {
        let response;
        try {
            response = await theBookOfJoel.post(
                '/api-token-auth/',
                values
            );
        } catch (e) {
            if (e.response.status === 400) {
                actions.setErrors(e.response.data);
            }
            actions.setSubmitting(false);
            actions.setStatus({ msg: JSON.stringify(e.response.data)});
            return
        }
        actions.setSubmitting(false);
        props.setAuth(values.username, response.data.token);
        props.onDismiss();
        return response
    };

    return <div>
        <Formik
            initialValues={{username: "", password:""}}
            onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
            { props => {
                const { status, errors, touched, isSubmitting} = props;

                return (
                    <Form className="ui form">
                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <Field type="text" name="username" />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" />
                            {status && status.msg && <div>{status.msg}</div>}
                        </div>
                        <button className="ui button" type="submit" disabled={isSubmitting} >
                            Login
                        </button>
                    </Form>
                );
            }}
        </Formik>
    </div>
};

export default connect(null, {setAuth: signIn})(LoginForm);