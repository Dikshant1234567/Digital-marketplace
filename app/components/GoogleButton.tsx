import { Box, Button, ButtonProps } from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";

export function GoogleButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    // <Button
    //   // leftSection={<GoogleIcon />}
    //   variant="default"
    //   {...props}
    // >
    <Button radius={"xl"} style={{width : 'max-content'}} variant="default">
      <GoogleLogin 
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse, "this is the success response");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </Button>
    // </Button>
  );
}
