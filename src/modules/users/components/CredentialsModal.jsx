import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { Alerts } from "../../shared/components/alerts/Alerts";

export const CredentialsModal = ({ onClose }) => {
    const { user } = useAtomValue(authAtom);
    const [errors, setErrors] = useState([]);
    const { mutate, isLoading } = useUpdateUser(setErrors);

    const [form, setForm] = useState({
        username: user?.username || "",
        currentPassword: "",
        newPassword: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            username: form.username || user.username,
        };

        if (form.currentPassword && form.newPassword) {
            payload.currentPassword = form.currentPassword;
            payload.newPassword = form.newPassword;
        }

        if (Object.keys(payload).length > 0) {
            mutate(payload);
        } else {
            onClose();
        }
    };


    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Actualizar Credenciales</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block font-medium mb-1">Nombre de usuario</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        {/* Contraseña actual */}
                        <div>
                            <label className="block font-medium mb-1">Contraseña actual</label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    name="currentPassword"
                                    value={form.currentPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                                >
                                    {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Contraseña nueva */}
                        <div>
                            <label className="block font-medium mb-1">Nueva contraseña</label>
                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                                >
                                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? "Actualizando..." : "Actualizar"}
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-black"
                    >
                        ✕
                    </button>
                </div>
            </div>
            {errors.length > 0 && <Alerts messages={errors} />}
        </>
    );
};
