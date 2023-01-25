import React from "react";
import '../Login/login.scss';
import { Navigate } from "react-router-dom";

interface loginFormProps {
    isLogin: boolean
}

export function Login({isLogin}: loginFormProps) {

    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [auth, setAuth] = React.useState(false); // состояние, для редиректа в чат

   async function fetchLogin(login: string, password: string) {
        await fetch('/login', {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                userName: login,
                password: password
            })
        });
    }

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLogin('');
        setPassword('');
        await fetchLogin(login, password);
        setAuth(true);
    }

    if (isLogin && !auth ) {
        return (
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="login-form-element" value={login} onChange={handleChangeLogin} type="text" name="Login" placeholder="Login" required autoFocus/>
                <input className="login-form-element" value={password} onChange={handleChangePassword} type="password" name="password" placeholder="Password" required/>
                <button className="login-btn" type="submit">Вход</button>
            </form>
        );
    } else if (auth) {
        return <Navigate to="/" replace={true} />
    } else {
        return <span></span>
    } // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! делаем тут предупреждения если логин или пароль неправильный
}
