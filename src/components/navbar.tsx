import innerstepsLogo from "../assets/innersteps_logo.png";

function Navbar() {
  return (
    <>
      <header className="header">
        <img className="nav-logo" src={innerstepsLogo} alt="Logo" />
        <h1>InnerSteps</h1>
      </header>
    </>
  );
}

export default Navbar;
