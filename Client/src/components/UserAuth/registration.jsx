import { NavLink, useNavigate } from "react-router-dom";
import "./userauth.css";
import { useState,useEffect } from "react";
import axios from "axios";
import authService from "../../service/authService";
export default function Registration() {

    const navigate = useNavigate();
    const token = authService.getToken();
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, []);
    const [message, setMessage] = useState("");
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the data object
        const userData = {
            fullname,
            email,
            password,
        };

        try {
            // Send the JSON data directly to your backend
            const response = await axios.post("http://127.0.0.1:8000/register", userData, {
                headers: {
                    "Content-Type": "application/json" // Set the correct content type for JSON data
                }
            });
            setFullName("");
            setPassword("");
            setEmail("");
            setMessage(" ")
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong. Please try again later.");
            }
        }
    };
    return (
        <div className="userAuthContainer">
            <div className="max-width">
                <form onSubmit={handleSubmit}>
                    <div className="userauthbox">
                        <div className="userAuthLogo_section">
                            <div className="userauthLogo_imgae">
                                <img src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"></img>
                            </div>
                        </div>
                        {message && (
                            <div className="error_message">{message}</div>
                        )}
                        <div className="userauth_input">
                            <div className="each_userauth_input">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="auth_user_inp"
                                    onChange={(e) => setFullName(e.target.value)}
                                    value={fullname}
                                    required
                                />
                            </div>
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
                                <button type="submit" className="auth_action">Register</button>
                                <div>
                                    <NavLink to="/login" className="login_page_back">
                                        already you have an account
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}