import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // Server side
    // call ingress from server side:
    // http://SERVICENAME.NAMESPACE.svc.cluster.local
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers, // assign headers from incomming request
    });
    // Browser side
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
