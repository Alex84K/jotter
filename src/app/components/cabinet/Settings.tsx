import React from "react"
import {  useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { edditUserAsync, selectUser } from "../../../features/user/userSlice"
import { UserEddit } from "../../../features/user/type"
import { Field, Form, Formik } from "formik"
import { Button } from "react-bootstrap"
import styles from "./Cabinet.module.css"

const Settings = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  function handleEdditProfile(firstname: string, lastname: string, email: string) {
    const usUp: UserEddit = {
      userId: Number(user?.id),
      firstName: firstname,
      lastName: lastname,
      email: email
    }
    dispatch(edditUserAsync(usUp))
    navigate("/cabinet")
  }

  function validateFirstname(value: string) {
    let error
    if (value === "admin") {
      error = "Nice try!"
    } else if (!/^[a-zA-Z]+$/i.test(value)) {
      error = "Name must contain only letters"
    }
    return error
  }

  function validateLastname(value: string) {
    let error
    if (value === "admin") {
      error = "Nice try!"
    } else if (!/^[a-zA-Z]+$/i.test(value)) {
      error = "Name must contain only letters"
    }
    return error
  }

  function validateEmail(value: string) {
    let error
    if (!value) {
      error = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address"
    }
    return error
  }

  return (
    <div className="container">
      <h5 className="p-4">Edit profile</h5>
      <div className={`p-3 col-sm-12 col-lg-6 mx-auto ${styles.formbox}`}>
      <Formik
            id="form"
            initialValues={{
              firstname: "",
              lastname: "",
              email: ""
            }}
            onSubmit={values => {
              // same shape as initial values
              handleEdditProfile(values.firstname, values.lastname, values.email)
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="firstname"
                  validate={validateFirstname}
                  className={` mt-4 mb-1 ${styles.form_my} ${errors.firstname && touched.firstname ? `${styles.errorShake}` : ""}`}
                  placeholder="First name"
                  id="firstname"
                />
                {errors.firstname && touched.firstname && (
                  <p className="mt-4 txtRed">{errors.firstname}</p>
                )}
                <Field
                  name="lastname"
                  validate={validateLastname}
                  className={` mt-4 mb-1 ${styles.form_my} ${errors.firstname && touched.firstname ? `${styles.errorShake}` : ""}`}
                  placeholder="Last name"
                  id="lastname"
                />
                {errors.lastname && touched.lastname && (
                  <p className="mt-4 txtRed">{errors.lastname}</p>
                )}
                <Field
                  name="email"
                  validate={validateEmail}
                  className={` mt-4 mb-1 ${styles.form_my} ${errors.firstname && touched.firstname ? `${styles.errorShake}` : ""}`}
                  placeholder="Email"
                  id="email"
                />
                {errors.lastname && touched.lastname && (
                  <p className="mt-4 txtRed">{errors.lastname}</p>
                )}
                <Button
                  variant="warning"
                  type="submit"
                  className="w-100 btnGreen mt-4"
                  id="submit"
                >
                  Edit
                </Button>
              </Form>
            )}
          </Formik>
      </div>
    </div>
  )
}

export default Settings
