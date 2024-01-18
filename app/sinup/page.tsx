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
} from "@mantine/core";
import { GoogleButton } from "../components/GoogleButton";
import { TwitterButton } from "../components/TwitterButton";
import Link from "next/link";

export default function Sinup(props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const router = useRouter();
  const { email, password } = form.values;
  console.log(email, name, password);

  return (
    <Paper radius="md" p="xl" withBorder {...props} className="mt-0 lg:mt-[8%]">
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
          alert("sumbitted");
          router.push("/");
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
          1
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" size="xs">
            <Link href="/login">Already have an account? Login</Link>
          </Anchor>
          <Button type="submit" radius="xl">
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
