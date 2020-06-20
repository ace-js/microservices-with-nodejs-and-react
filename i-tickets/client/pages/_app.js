import "bootstrap/dist/css/bootstrap.css";

// wrapps pages components behind the scene, it helps us to propgate custom css ect..
export default ({ Component, pageProps }) => <Component {...pageProps} />;
