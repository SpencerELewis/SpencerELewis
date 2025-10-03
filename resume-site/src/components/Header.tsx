import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function Header() {
    return (
        <header>
            <h1>Header</h1>
            <Button variant="primary">Click me!</Button>
        </header>
    );
}

export default Header;