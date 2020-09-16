import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import './styles.css'

export default function Main() {
    const [username, setUsername] = useState('')
    const [repos, setRepos] = useState([])
    const [listar, setListar] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setListar(true)
    }, [repos])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.post('/users', {
                username
            })

            if (response.status === 404) {
                setError('Erro ao realizar a busca')
            } else {
                const { data } = response.data
                setRepos(data)
            }
        } catch (error) {
            console.log(error.message)
            setError('Erro ao realizar a busca')
        }
    }

    function handleSair() {
        setListar(false)
    }

    return (
        <>
            {
                listar ? (
                    <div className="list-container">
                        {
                            repos.length > 0 ? (
                                <ul>
                                    {
                                        repos.map(repo => (
                                            <li key={repo.id}>
                                                <strong>{repo.name}</strong>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : (
                                    <div>
                                        Sem Repositórios
                                    </div>
                                )
                        }


                        <button type="button" onClick={handleSair}>
                            Sair
                        </button>
                    </div>
                ) : (
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <input
                                    placeholder="Digite seu usuário no github"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                <button type="submit">Pesquisar</button>
                            </form>
                            {error.length !== '' && (<strong>{error}</strong>)}
                        </div>
                    )
            }
        </>
    )
}