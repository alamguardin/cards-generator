import '../styles/Navbar.css'

function Navbar({value, setValue}) {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <span>King&apos;s  Gambit Generator</span>
            </div>
            <div className="navbar-list">
                <button d
                    value="dashboard" 
                    className={value !== 'dashboard' ? 'navbar-item disabled' : 'navbar-item'}
                    onClick={(e) => setValue(e.target.value)}
                >Panel</button>
                <button 
                    value="form" 
                    className={value !== 'form' ? 'navbar-item disabled' : 'navbar-item'}
                    onClick={(e) => setValue(e.target.value)}
                >Crear carta</button>
            </div>
        </div>
    )
} 

export default Navbar