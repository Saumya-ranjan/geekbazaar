import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import styles from "../styles/signin.module.scss";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import LoginInput from "@/components/inputs/loginInput.js";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
const initialValues = {
  login_email: "",
  login_password: "",
};

export default function Signin() {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;
  const handleChange = (e)=>{
    // console.log(user)
    const {name, value} = e.target
    setUser({...user,[name]:value})
  }
  const loginValidation = Yup.object(
    {
      login_email: Yup.string().required("Email Address is Required.").email('Please Enter a Valid Email Address'),
      login_password: Yup.string().required("Please Enter a Password")
    }
  )
  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
            We&apos;d be happy to join You ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1> Sign In </h1>
            <p> Get Access to all the things GeekBazaar has to Offer </p>
            <Formik 
            enableReinitialize
            initialValues={{
              login_email,
              login_password
            }}
            validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput 
                  type = "text"
                  name = "login_email"
                  icon="email" 
                  placeholder="Email Address" 
                  onChange = {handleChange}
                  />
                  <LoginInput 
                  type = "password"
                  name = "login_password"
                  icon="password" 
                  placeholder="Password" 
                  onChange = {handleChange}
                  />
                </Form>
              )}
            </Formik>
            <CircledIconBtn type="submit" text="Sign In"/>
            <div className={styles.forgot}>
              <Link href="/forget">Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer country="india" />
    </>
  );
}
