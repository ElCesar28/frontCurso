import React from 'react'

const Card = ({ data, onClick }) => {
    return (
        <div
            className='card-container'>
            <button
                type='button'
                onClick={onClick}
                className='card'>
                <h3>
                    {data.compania}
                </h3>
                <h4>
                    {data.numero}
                </h4>
                <h2>
                    ${data.saldo}
                </h2>
                <h5 style={{ textAlign: 'end' }}>
                    {data.fechaVencimiento}
                </h5>
            </button>
        </div>
    )
}

export default Card