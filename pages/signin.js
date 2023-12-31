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
import { getProviders, signIn } from "next-auth/react";
const initialValues = {
  login_email: "",
  login_password: "",
  full_name:"",
  email:"",
  password:"",
  conf_password:"",
};

export default function Signin({providers}) {
  // console.log(providers)
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password, full_name,
    email,
    password,
    conf_password} = user;
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
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
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
                  <CircledIconBtn type="submit" text="Sign In"/>
                   <div className={styles.forgot}>
                     <Link href="/forget">Forgot Password</Link>
                   </div>
                  </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1> Sign Up </h1>
            <p> Go Till Infinity With these Deals. </p>
            <Formik 
            enableReinitialize
            initialValues={{
              full_name,
              email,
              password,
              conf_password
            }}
            validationSchema={registerValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput 
                  type = "text"
                  name = "full_name"
                  icon="user" 
                  placeholder="Full Name" 
                  onChange = {handleChange}
                  />
                  <LoginInput 
                  type = "text"
                  name = "email"
                  icon="email" 
                  placeholder="Email Address" 
                  onChange = {handleChange}
                  />
                  <LoginInput 
                  type = "password"
                  name = "password"
                  icon="password" 
                  placeholder="Password" 
                  onChange = {handleChange}
                  />
                  <LoginInput 
                  type = "password"
                  name = "conf_password"
                  icon="password" 
                  placeholder="Confirm Password" 
                  onChange = {handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign Up"/>
                  </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="india" />
    </>
  );
}

export async function getServerSideProps(context){
  const providers = Object.values(await getProviders())
  return {
    props : {providers}
  }
}
