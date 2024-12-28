import React, { useEffect } from "react";

const GoogleSignInButton = () => {
  useEffect(() => {
    // Render the Google button after the SDK loads
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "753145252831-gnn8jceumsuddunbo0d4g4uqq0vu6glm.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large", width: "auto" } // Customizable options
      );
    }
  }, []);

  const handleCredentialResponse = response => {
    console.log("Encoded JWT ID token:", response.credential);
    // Pass this token to your backend for verification
  };
  return (
    <div>
      <div id="google-signin-button"></div>
    </div>
  );
};
export default GoogleSignInButton;
