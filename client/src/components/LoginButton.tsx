import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="login__button" onClick={() => loginWithRedirect()}>Log in (or sign up)</button>;
};

export default LoginButton;