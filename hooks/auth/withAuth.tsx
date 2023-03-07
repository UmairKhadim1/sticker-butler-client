import { useRouter } from 'next/router';
import auth from '../../auth/auth';

// @ts-ignore
const withAuth = (Component) => {
  // @ts-ignore
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname.indexOf('auth') == -1 &&
        window.location.pathname.indexOf('verification') == -1 &&
        window.location.pathname.indexOf('faqs') == -1 &&
        window.location.pathname.indexOf('privacy-policies') == -1 
        // &&        window.location.pathname.indexOf('shopify-link') == -1
      ) {
        console.log('with Auth Enabled');
        const Router = useRouter();
        const authToken =
          typeof window !== 'undefined'
            ? auth.getToken() && auth.getToken().accessToken
            : undefined;
        // If there is no access token we redirect to "/" page.
        console.log("Router",Router)
        if (!authToken) {
          Router.replace('/auth/sign-in?callback='+encodeURIComponent(Router.asPath));
          return null;
        }
        return <Component {...props} />;
      } else {
        return <Component {...props} />;
      }
    }
    // If we are on server, return null
    return null;
  };
};

export default withAuth;
