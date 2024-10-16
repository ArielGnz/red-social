import React from 'react'
import avatar from '../../assets/img/user.png'

export const Feed = () => {

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button">Mostrar nuevas</button>
            </header>

            <PublicationList 
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />
        </>
    )
}
