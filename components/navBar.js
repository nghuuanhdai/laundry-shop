import Link from "next/link"

export default function NavBar({fixed=true}) {
    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${fixed?'navbar-fixed-top':''}`}>
          <div className="container">
            <Link href='/'>
              <a className="navbar-brand fw-bold text-gunmetal">
                easy laundry
              </a>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-medium">
                <li className="nav-item">
                  <Link href="/"><a className="nav-link active">Home</a></Link>
                </li>
                <li className="nav-item">
                  <Link href="/shop"><a className="nav-link">Shop</a></Link>
                </li>
                <li className="nav-item">
                  <Link href="/login"><a className="nav-link">Login</a></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}