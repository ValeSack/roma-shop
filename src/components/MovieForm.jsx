import { useState, useEffect } from "react";
import { fetchProducers, fetchStudios } from "../api/producersAndStudios";
import "../css/movieForm.css";

const MovieForm = ({ movie = {}, onSubmit }) => {
    const [name, setName] = useState(movie.name || "");
    const [producerId, setProducerId] = useState(movie.producerId || "");
    const [studioId, setStudioId] = useState(movie.studioId || "");
    const [producers, setProducers] = useState([]);
    const [studios, setStudios] = useState([]);

    // console.log(producers, studios);
    

    useEffect(() => {
        const loadData = async () => {
            try {
                const [producersData, studiosData] = await Promise.all([
                    fetchProducers(),
                    fetchStudios(),
                ]);
                console.log("Producers loaded:", producersData);
                console.log("Studios loaded:", studiosData);
                setProducers(producersData);
                setStudios(studiosData);
            } catch (error) {
                console.error("Error al cargar productores o estudios:", error);
                setProducers([]);
                setStudios([]);
            }
        };
        loadData();
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, producerId, studioId });
    };

    return (
        <form onSubmit={handleSubmit} className="movie-form">
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // required
                />
            </div>
            <div>
                <label>Productor:</label>
                <select
                    value={producerId}
                    onChange={(e) => setProducerId(e.target.value)}
                    // required
                >
                    <option value="">Seleccionar...</option>
                    {Array.isArray(producers) &&
                       producers.map((producer) => (
                            <option key={producer.id} value={producer.id}>
                                {producer.name}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <label>Estudio:</label>
                <select
                    value={studioId}
                    onChange={(e) => setStudioId(e.target.value)}
                    // required
                >
                    <option value="">Seleccionar...</option>
                    {Array.isArray(studios) &&
                        studios.map((studio) => (
                            <option key={studio.id} value={studio.id}>
                                {studio.name}
                            </option>
                        ))}
                </select>
            </div>
            <button type="submit">Filtrar</button>
        </form>
    );
};

export default MovieForm;