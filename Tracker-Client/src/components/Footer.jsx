import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h5 className="footer-app-name">Simple Expense Tracker</h5>
            <p className="footer-tagline">Manage your expenses smartly</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="footer-copyright">
              © {currentYear} Simple Expense Tracker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


