import { useAtomValue, useSetAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { authAtom } from "../../../auth/atoms/authAtom";
import usePermissions from "../../../shared/hooks/usePermissions";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
    const auth = useAtomValue(authAtom);
    const setAuth = useSetAtom(authAtom);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { canPublishOffers, canViewCandidacies, canViewPostulations, isCompany, isStudent, companyId, studentId } = usePermissions();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        setAuth({ isAuthenticated: false, token: null, user: null });
        navigate("/login");
    };

    if (!auth.isAuthenticated) return null;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">IESTP JOBS</Link>
                {canPublishOffers && (
                    <Link to="/createOffer" className="navbar-link">
                        Nueva oferta
                    </Link>
                )}

                {canViewCandidacies && (
                    <Link to="/your-candidates" className="navbar-link">
                        Tus postulantes
                    </Link>
                )}

                {canViewPostulations && (
                    <Link to="/" className="navbar-link">
                        Tus postulaciones
                    </Link>
                )}
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
                            {isCompany && companyId && (
                                <Link to={`/company/edit/${companyId}`} className="dropdown-item">
                                    Mi Empresa
                                </Link>
                            )}
                            <button onClick={handleLogout} className="dropdown-item">Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
