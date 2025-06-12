import "./login-page.css"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="login-container">
            {/* Top Header */}
            <div className="top-header">
                <span>Inloggen</span>
            </div>

            {/* Green Header */}
            <div className="green-header">
                <ArrowLeft size={24} className="back-arrow" />
                <h1>Inloggen</h1>
            </div>

            {/* Login Form */}
            <div className="login-form">
                <h2>Inloggen</h2>

                <div className="form-group">
                    <input type="text" placeholder="E-mailadres of telefoonnummer" className="form-input" />
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Wachtwoord" className="form-input" />
                </div>

                <button className="login-btn">Log in!</button>

                <div className="divider"></div>

                <p className="register-text">Heeft u nog geen account?</p>

                <button className="register-btn">Registreren</button>
            </div>
        </div>
    )
}
