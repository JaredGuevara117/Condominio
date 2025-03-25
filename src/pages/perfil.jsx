import React, { useEffect, useState } from 'react';

const Perfil = () => {
    const [rol, setRol] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [torre, setTorre] = useState('');
    const [nombre, setNombre] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [cerrarSesionTodos, setCerrarSesionTodos] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setRol(localStorage.getItem('rol') || '');
        setDepartamento(localStorage.getItem('departamento') || '');
        setTorre(localStorage.getItem('torre') || '');
        setNombre(localStorage.getItem('nombre') || '');
    }, []);

    const id  = localStorage.getItem('id');

    const handleChangePassword = async () => {
        const response = await fetch('/api/cambiar-contrasena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                nuevaContrasena,
                cerrarSesionTodos,
            }),
        });

        if (response.ok) {
            alert('Contraseña cambiada exitosamente');
            setModalIsOpen(false);
        } else {
            alert('Error al cambiar la contraseña');
        }
    };

    return (
        <div>
            <h1>Perfil</h1>
            <form>
                <div>
                    <label>Rol:</label>
                    <input type="text" value={rol} readOnly />
                </div>
                <div>
                    <label>Departamento:</label>
                    <input type="text" value={departamento} readOnly />
                </div>
                <div>
                    <label>Torre:</label>
                    <input type="text" value={torre} readOnly />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={nombre} readOnly />
                </div>
                <button type="button" onClick={() => setModalIsOpen(true)}>
                    Cambiar Contraseña
                </button>
            </form>

            {modalIsOpen && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h2>Cambiar Contraseña</h2>
                        <form>
                            <div>
                                <label>Nueva Contraseña:</label>
                                <input 
                                    type="password" 
                                    value={nuevaContrasena} 
                                    onChange={(e) => setNuevaContrasena(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={cerrarSesionTodos} 
                                        onChange={(e) => setCerrarSesionTodos(e.target.checked)} 
                                    />
                                    Cerrar sesión en todos los dispositivos
                                </label>
                            </div>
                            <button type="button" onClick={handleChangePassword}>
                                Cambiar Contraseña
                            </button>
                            <button type="button" onClick={() => setModalIsOpen(false)}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
};

export default Perfil;