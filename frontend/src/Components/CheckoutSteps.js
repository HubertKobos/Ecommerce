import React from 'react'
import { Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    const user = useSelector(state => state.auth)

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 && !user ? (
                    // <Link to='/login' style={{textDecoration: "none"}}>
                        <Nav.Link style={{color: "black"}} href='/login'>Logowanie</Nav.Link>
                    // </Link> 
                ) : (
                        <Nav.Link disabled href='/login' style={{color: "black"}}>Logowanie</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    //<Link to='/shipping' style={{textDecoration: "none"}}>
                        <Nav.Link style={{color: "black"}} href='/wysylka'>Adres dostawy</Nav.Link>
                    //</Link>
                ) : (
                        <Nav.Link href='/wysylka' disabled>Adres dostawy</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    //<Link to='/payment' style={{textDecoration: "none"}}>
                        <Nav.Link style={{color: "black"}} href='/platnosc'>Sposób płatności</Nav.Link>
                    //</Link>
                ) : (
                        <Nav.Link href='/platnosc' disabled>Sposób płatności</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    //<Link to='/podsumowanie' style={{textDecoration: "none"}}>
                        <Nav.Link style={{color: "black"}} href='/podsumowanie'>Podsumowanie</Nav.Link>
                    //</Link>
                ) : (
                        <Nav.Link href='/podsumowanie' disabled>Podsumowanie</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps