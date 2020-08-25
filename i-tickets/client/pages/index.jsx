import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  const welcomeText = currentUser
    ? `You are logged in as "${currentUser.email}"`
    : "You are not logged in";
  return (
    <div className="container">
      <h1>Landing Page</h1>
      <p>{welcomeText}</p>
    </div>
  );
};

// fetch initial data during server side rendering process and not in the component with didMount lifecycle
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const response = await client.get("/api/users/currentuser");

  return response.data;
};

export default LandingPage;
