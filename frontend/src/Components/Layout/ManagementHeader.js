import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ManagmentHeader() {
  return (
    <div>
        <Link to='/dodaj_produkt'><Button variant='dark' className='my-3 mx-2'>Dodaj produkt</Button></Link>
        <Link to='/wyswietl_produkty'><Button variant='dark' className='my-3'>Pokaż listę produktów</Button></Link>
        <Link to='/wyswietl_pracownikow'><Button variant='dark' className='my-3 mx-2'>Pokaż listę pracowników oraz pojazdów</Button></Link>
        <Link to='/zlozone_zamowienia'><Button variant='dark' className='my-3'>Zamówienia</Button></Link>
    </div>
  )
}

export default ManagmentHeader