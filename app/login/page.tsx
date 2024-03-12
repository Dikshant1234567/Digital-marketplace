"use client";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { GoogleButton } from "../components/GoogleButton";
import { TwitterButton } from "../components/TwitterButton";
import Link from "next/link";
import axios from "axios";

function Login() {
  const { setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? `Password should include at least 6 characters`
          : null,
    },
  });
  // backend url
  const backendUrl = "https://digital-marketplace-backend.onrender.com";

  const router = useRouter();
  const { email, password } = form.values;
  // console.log(email, password);
  return (
    <Paper radius="md" p="xl" withBorder className="mt-0 lg:mt-[8%]">
      <Text size="35px" fw={500} className="capitalize text-center mb-8">
        Login
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          alert("sumbitted");

          axios
            .post(`${backendUrl}/auth/login`, form.values)
            .then(function (myformResponse) {
              console.log(myformResponse);
              if (myformResponse?.data?.success == true) {
                alert("sumbitted");
                console.log(myformResponse?.data?.token);

                const userAuntheticated =
                  (document.cookie = `userToken = ${myformResponse?.data?.token}`);
                if (userAuntheticated) router.push("/");
                else console.log("Something went wrong");
              } else {
                alert("Something went wrong try again..");
              }
            })
            .catch(function (error) {
              console.log(error);
              alert("There is some error in the sinup page");
            });
        })}
      >
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="abc@gmail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" size="xs">
            <Link
              href="/sinup"
              style={{
                color: `${colorScheme === "dark" ? "white" : "blue"}`,
                textDecoration: "underline",
              }}
            >
              Do not have an account? Register
            </Link>
          </Anchor>
          <Button type="submit" radius="xl">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default Login;
