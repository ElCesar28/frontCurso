import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'

let URL = 'http://localhost:8000/tarjetas_usuario/'

const App = ({ session, setSession }) => {

  const [showModal, setShowModal] = useState(false)

  const [selectedCard, setSelectedCard] = useState(null)

  const handleOpenModal = (card) => {
    setShowModal(true)
    setSelectedCard(card.idTarjeta)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const [tarjetas, setTarjetas] = useState([])

  const getTarjetas = async () => {
    let response = await fetch(URL + session.idUsuario, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      let data = await response.json()
      setTarjetas(data)
    }

  }

  useEffect(() => {
    getTarjetas()
  }, [])

  return (
    <div className='full col'>

      <button onClick={() => setSession(null)}>
        Logout
      </button>

      {tarjetas.map((card, i) =>
        <Card
          key={`C_${i}`}
          data={card}
          onClick={ (event) => handleOpenModal(card) }
        />)
      }
      {
        showModal &&
        <Modal
          selectedCard={selectedCard}
          handleCloseModal={handleCloseModal} />
      }

    </div>
  )
}

export default App
