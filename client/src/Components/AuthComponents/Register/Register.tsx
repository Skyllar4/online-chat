import React from "react";
import '../Register/register.scss';
import { Navigate } from "react-router-dom";

interface registerFormProps {
    isRegister: boolean
}

export function Register({isRegister}: registerFormProps) {

    const [login, setLogin] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [reg, setReg] = React.useState(false);


    function fetchReg(userName: string, email: string, password: string) {
        fetch('/register', {
            headers: { "Content-Type": "application/json", },
            method: "POST",
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password
            })
        });
    }

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const inputElementsClean = () => {
        setLogin('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = (event: React.FormEvent) => {
        fetchReg(login, email, password);
        inputElementsClean();
        setReg(true);
        event.preventDefault();
    }


    if (reg) {
        return <Navigate to="/chat" />
    } else if (isRegister) {
        return (
        <>
            <form className="authForm" onSubmit={handleSubmit}>
                <input className="reg-form-elements" value={login} onChange={handleChangeLogin} type="text" placeholder="Login" required autoFocus/>
                <input className="reg-form-elements" value={email} onChange={handleChangeEmail} type="email" placeholder="Email" required/>
                <input className="reg-form-elements" value={password} onChange={handleChangePassword} type="password" placeholder="Password" required/>
                <button className="regFormBtn" type="submit">Зарегистрироваться</button>
            </form>
        </>
    );
    } else {
        return <span></span> // может display none?
    }
}
