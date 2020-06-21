import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // Server side
    // call ingress from server side:
    // http://SERVICENAME.NAMESPACE.svc.cluster.local
    return axios.create({
      baseURL: 'http://nginx-ingress-controller.itickets.svc.cluster.local',
      headers: req.headers // assign headers from incomming request
    });
    // Browser side
  } else {
    return axios.create({
      baseURL: '/'
    });
  }
};
