import React, { useState } from 'react'

const Modal = ({
    selectedCard,
    handleCloseModal
}) => {

    const [login, setLogin] = useState(false)

    const [txtNumTarjeta, setTxtNumTarjeta] = useState('')

    const [destinoDatos, setDestinoDatos] = useState(null)

    const [cantidad, setCantidad] = useState('')

    const handleBuscarTarjeta = async () => {
        try {
            setLogin(true)
            let response = await fetch('http://localhost:8000/tarjeta_numero/' + txtNumTarjeta + '/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.ok) {
                let data = await response.json()
                console.log(data)
                setDestinoDatos(data)
            } else {
                throw new Error('Tarjeta no encontrada')
            }

        } catch (err) {
            console.log(err)
        } finally {
            setLogin(false)
        }


    }

    const handleTransferir = async () => {
        try {
            setLogin(true)
            let response = await fetch('http://localhost:8000/transferir/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    origen: selectedCard,
                    destino: destinoDatos.idTarjeta,
                    cantidad: cantidad
                })
            })
            if (response.ok) {
                let data = await response.json()
                console.log(data)
            } else {
                throw new Error('Tarjeta no encontrada')
            }

        } catch (err) {
            console.log(err)
        } finally {
            setLogin(false)
        }
    }

    return (
        <div className='modal-container'>
            <div className='modal'>
                <button onClick={handleCloseModal}>
                    X
                </button>

                <label htmlFor="">Destino</label>

                <input
                    value={txtNumTarjeta}
                    onChange={(e) => setTxtNumTarjeta(e.target.value)}
                    type="text" />

                <button
                    disabled={login}
                    onClick={handleBuscarTarjeta}>
                    {login ? 'Buscando...' : 'Buscar'}
                </button>
                {
                    destinoDatos &&
                    <>
                        <h3>{destinoDatos?.propietario?.nombre} {destinoDatos?.propietario?.apellido}</h3>
                        <label htmlFor="">Cantidad</label>

                        <input
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            type="numero" />

                        <button onClick={handleTransferir}>
                            Transferir
                        </button>
                    </>
                }

            </div>
        </div>
    )
}

export default Modal