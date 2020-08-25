import "bootstrap/dist/css/bootstrap.css";

// wrapps pages components behind the scene, it helps us to propgate custom css ect..
const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
