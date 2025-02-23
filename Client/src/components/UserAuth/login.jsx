import { NavLink, useNavigate } from "react-router-dom";
import "./userauth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import authService from "../../service/authService"
export default function Login({setToken}) {
    const navigate = useNavigate();
    const token = authService.getToken();
    useEffect(()=>{
        if(token){
            navigate("/")
        }
    },[]);
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/login", {
                email,
                password
            });
            authService.setToken(response.data.token);
            authService.setUserId(response.data._id);
            setMessage("")
            setEmail("")
            setPassword("");
            setToken(authService.getToken());
            navigate("/");
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong. Please try again later.");
            }
        }
    }
    return (
        <div className="userAuthContainer">
            <div className="max-width">
                <div className="userauthbox">
                    <div className="userAuthLogo_section">
                        <div className="userauthLogo_imgae">
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"></img>
                        </div>
                    </div>
                    {message && (
                        <div className="error_message">{message}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="userauth_input">
                            <div className="each_userauth_input">
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="auth_user_inp"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required    
                                />
                            </div>
                            <div className="each_userauth_input">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="auth_user_inp"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>
                            <div className="auth_user_action_btn">
                                <button type="submit" className="auth_action">Login</button>
                                <div>
                                    <NavLink to="/register" className="login_page_back">
                                        create new account
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}