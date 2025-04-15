import React from "react";
import "../css/movieForm.css";

export const MovieForm = ({ onSubmit, onChange, producers, studios, formData, title }) => {
    return (
        <form className="form-movies" onSubmit={onSubmit} style={{ marginTop: "20px" }}>
            <input
                className="input"
                type="text"
                name="name"
                placeholder="Nombre de la película"
                value={formData.name}
                onChange={onChange}
            />
            <div className="select-group">
                <select className="form-select" name="producerId" value={formData.producerId} onChange={onChange} style={{ marginRight: "10px" }}>
                    <option value="">Seleccionar productor</option>
                    {producers.map((producer) => (
                        <option key={producer.id} value={producer.id}>
                            {producer.name}
                        </option>
                    ))}
                </select>

                <select className="form-select" name="studioId" value={formData.studioId} onChange={onChange}>
                    <option value="">Seleccionar estudio</option>
                    {studios.map((studio) => (
                        <option key={studio.id} value={studio.id}>
                            {studio.name}
                        </option>
                    ))}
                </select>
            </div>
            <button className="button" type="submit">{title}</button>
        </form>
    );
};
