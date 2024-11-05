import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TareasArea() {
    // Estado para almacenar las tareas
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        // Función para obtener las tareas desde el backend
        const fetchTareas = async () => {
            try {
                const res = await axios.get('/api/tareas');
                setTareas(res.data);
            } catch (err) {
                console.error(err.response.data.msg);
            }
        };

        fetchTareas();
    }, []);

    // Manejar cambio de estado de una tarea
    const handleChangeEstado = async (tareaId, nuevoEstado) => {
        try {
            await axios.put(`/api/tareas/${tareaId}/estado`, { estado: nuevoEstado });
            // Actualizar el estado localmente
            setTareas(
                tareas.map((tarea) =>
                    tarea._id === tareaId ? { ...tarea, estado: nuevoEstado } : tarea
                )
            );
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    // Manejar agregar comentario a una tarea
    const handleAgregarComentario = async (tareaId, contenido) => {
        try {
            await axios.post(`/api/tareas/${tareaId}/comentarios`, { contenido });
            // Actualizar los comentarios localmente (puedes optar por volver a obtener las tareas)
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Tareas del Área</h2>
            <table>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.map((tarea) => (
                        <tr key={tarea._id}>
                            <td>{tarea.descripcion}</td>
                            <td>{tarea.estado}</td>
                            <td>
                                <select
                                    value={tarea.estado}
                                    onChange={(e) => handleChangeEstado(tarea._id, e.target.value)}
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="en proceso">En Proceso</option>
                                    <option value="completada">Completada</option>
                                    <option value="inconveniente">Inconveniente</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Agregar comentario"
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                />
                                <button onClick={() => handleAgregarComentario(tarea._id, comentario)}>
                                    Enviar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TareasArea;
