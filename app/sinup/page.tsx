"use client";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import axios from "axios";
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
import Navbar from "../components/Navbar";

function Sinup() {
  const { setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      userName: "",
      isAdmin: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  // backendUrl
  const backendUrl = "https://digital-marketplace-backend.onrender.com";

  const router = useRouter();
  const { email, userName, password } = form.values;
  console.log(email, password, userName);

  return (
    <Paper radius="md" p="xl" withBorder className="mt-0 lg:mt-[8%]">
      <Text size="35px" fw={500} className="capitalize text-center mb-8">
        Sinup
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          axios
            .post(`${backendUrl}/auth/signup`, form.values)
            .then(function (myformResponse) {
              console.log(myformResponse);
              if (myformResponse?.data?.success == true) {
                console.log(myformResponse.data?.token);
                alert("sumbitted");
                router.push("/login");
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
            label="Name"
            placeholder="Your name"
            value={form.values.userName}
            onChange={(event) =>
              form.setFieldValue("userName", event.currentTarget.value)
            }
            radius="md"
          />

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
              href={"/login"}
              style={{
                color: `${colorScheme === "dark" ? "white" : "blue"}`,
                textDecoration :"underline"
              }}
            >
              Already, have an account? Login
            </Link>
          </Anchor>
          <Button type="submit" radius="xl">
            Sinup
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default Sinup;
