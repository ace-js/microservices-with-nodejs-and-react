const LandingPage = ({ currentUser }) => {
  return (
    <div className="container">
      <h1>Landing Page</h1>
      <p>Hello {currentUser ? currentUser.email : "stranger"} </p>
    </div>
  );
};

export default LandingPage;
