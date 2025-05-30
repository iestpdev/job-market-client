import { useAtomValue, useSetAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { authAtom } from "../../../auth/atoms/authAtom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
    const auth = useAtomValue(authAtom);
    const setAuth = useSetAtom(authAtom);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        setAuth({ isAuthenticated: false, token: null, user: null });
        navigate("/login");
    };

    if (!auth.isAuthenticated) return null;

    const role = auth.user?.tipo;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo">IESTP JOBS</div>
                {role === "COMPANY" && (
                    <>
                        <Link to="/publicar" className="navbar-link">
                            Publicar Oferta
                        </Link>
                        <Link to="/postulantes" className="navbar-link">
                            Postulantes
                        </Link>
                    </>
                )}

                {
                    role === "STUDENT" && (
                        <Link to="/inscripciones" className="navbar-link">
                            Postulaciones
                        </Link>
                    )
                }
            </div>

            <div className="navbar-right">
                <div
                    className="navbar-avatar-wrapper"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <img
                        src={`https://ui-avatars.com/api/?name=${auth.user?.username}&background=0358CB&color=FFFFFF`}
                        alt="avatar"
                        className="navbar-avatar"
                    />
                    {dropdownOpen && (
                        <div className="navbar-dropdown">
                            <Link to="/perfil" className="dropdown-item">Mi Perfil</Link>
                            <button onClick={handleLogout} className="dropdown-item">Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
