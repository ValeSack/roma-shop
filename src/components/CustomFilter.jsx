import React from "react";
import "../css/customFilter.css";

export const CustomFilter = ({ values, producers, studios, onChange, onSubmit, submitText, onClear }) => {
    return (
        <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
            <select className="form-select" name="producerId" value={values.producerId} onChange={onChange} style={{ marginRight: "10px" }}>
                <option value="">Productores</option>
                {producers.map((producer) => (
                    <option key={producer.id} value={producer.id}>
                        {producer.name}
                    </option>
                ))}
            </select>

            <select className="form-select" name="studioId" value={values.studioId} onChange={onChange} style={{ marginRight: "10px" }}>
                <option value="">Estudios</option>
                {studios.map((studio) => (
                    <option key={studio.id} value={studio.id}>
                        {studio.name}
                    </option>
                ))}
            </select>
            <button type="submit">{submitText}</button>
            <button type="button" onClick={onClear}>
                Limpiar
            </button>
        </form>
    );
};
