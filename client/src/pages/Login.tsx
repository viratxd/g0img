import config from "../../config";
import { Logo } from "../assets/logo";
import LoginButton from "../components/LoginButton";

export const Login = () => {
  return (
    <div className="login">
      <div className="login__title">
        <Logo width={64} height={64} />
        <h1>{config.siteName}</h1>
        <p>Your personal image collection starts here.</p>
      </div>
      <LoginButton />
      <div className="login__warning">
        <p>
          <strong>Important:</strong> By logging in, you agree to share your
          login data with Auth0, a third-party authentication provider. Your
          data will be processed according to{" "}
          <a href="https://auth0.com/docs/secure/data-privacy-and-compliance" target="_blank">
            their privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
