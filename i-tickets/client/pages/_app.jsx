import buildClient from "../api/build-client";
import Header from "../components/header";
import "bootstrap/dist/css/bootstrap.css";

// wrapps pages components behind the scene, it helps us to propgate custom css ect..
const AppComponent = ({ Component, pageProps, currentUser }) => (
  <div>
    <Header currentUser={currentUser} />
    <Component {...pageProps} currentUser={currentUser} />
  </div>
);

// fetch initial data during server side rendering process and not in the component with didMount lifecycle
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx); // context from CustomApp (_app) got {Component, ctx: { req, res}} instead of context: { req, res }
  const { data } = await client.get("/api/users/currentuser");

  let pageProps;
  if (appContext.Component.getInitialProps) {
    // to allow getInitialProps from other pages when it's defined
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    currentUser: data.currentUser,
  };
};

export default AppComponent;
