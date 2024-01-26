import { Button, ButtonProps } from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";



export function GoogleButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
 

  return (
    <Button
      // leftSection={<GoogleIcon />}
      variant="default"
      {...props}
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </Button>
  );
}
