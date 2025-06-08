import { useState } from "react";
import "./SearchAndFilters.css";

const OfferSearchAndFilters = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [salaryMin, setSalaryMin] = useState("");
    const [salaryMax, setSalaryMax] = useState("");
    const [vacanciesMin, setVacanciesMin] = useState("");
    const [vacanciesMax, setVacanciesMax] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    const handleChange = () => {
        onSearch({
            query,
            salaryMin: Number(salaryMin),
            salaryMax: Number(salaryMax),
            vacanciesMin: Number(vacanciesMin),
            vacanciesMax: Number(vacanciesMax),
            dateFilter,
        });
    };

    return (
        <div className="offer-filters-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Título del empleo, descripción o requisitos..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleChange();
                    }}
                />
                <button type="button" onClick={handleChange}>
                    Buscar empleos
                </button>
            </div>

            <div className="filters-row">
                <input
                    type="number"
                    placeholder="Sueldo mínimo"
                    min={0}
                    max={70000}
                    value={salaryMin}
                    onChange={(e) => {
                        setSalaryMin(e.target.value);
                        handleChange();
                    }}
                />
                <input
                    type="number"
                    placeholder="Sueldo máximo"
                    min={0}
                    max={70000}
                    value={salaryMax}
                    onChange={(e) => {
                        setSalaryMax(e.target.value);
                        handleChange();
                    }}
                />

                <input
                    type="number"
                    placeholder="Vacantes mínimas"
                    min={1}
                    max={255}
                    value={vacanciesMin}
                    onChange={(e) => {
                        setVacanciesMin(e.target.value);
                        handleChange();
                    }}
                />
                <input
                    type="number"
                    placeholder="Vacantes máximas"
                    min={1}
                    max={255}
                    value={vacanciesMax}
                    onChange={(e) => {
                        setVacanciesMax(e.target.value);
                        handleChange();
                    }}
                />

                <select
                    value={dateFilter}
                    onChange={(e) => {
                        setDateFilter(e.target.value);
                        handleChange();
                    }}
                >
                    <option value="">Fecha de publicación</option>
                    <option value="today">Hoy</option>
                    <option value="week">Esta semana</option>
                    <option value="month">Este mes</option>
                    <option value="year">Este año</option>
                </select>
            </div>
        </div>
    );
};

export default OfferSearchAndFilters;
