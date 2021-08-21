import { Link } from "react-router-dom"
import './header.scss'
const Header = () => {
    return (
        <header className="header">
            <div className="title">
                <span className="part_first">Stop to Remember </span>
                <span className="part_Second">your Ongoing Thoughts</span>
            </div>
            <nav className="navbar">
                <ul className="btn_row">
                    <li>
                        <button type="button" to="/voice-recorder" className="btn_nav_links">Voice Record</button>
                    </li>
                    <li>
                        <button type="button" to="/voice-list" className="btn_nav_links">Voice List</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header