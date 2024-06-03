import { useState } from 'react'

function ListaNome(props) { 
    const [nome, setNome] = useState('')
    const [nomes, setNomes] = useState(props.lista)
    
    function adicionaNome() { 
        if(nome !== '') { 
            setNomes([...nomes, nome])
            setNome('')
        }
    }

    return (
        <>
            <ul>
                {
                    nomes.map( (nome, index) => <li key={index}>{nome}</li> )
                }
            </ul>
            <input value={nome} onChange={ e => setNome(e.target.value) }  type="text" />
            <p>{nome}</p>
            <button onClick={adicionaNome}>Adicionar</button>
        </>
    )
}

export default ListaNome