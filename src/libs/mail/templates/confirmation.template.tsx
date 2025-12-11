import { Body, Heading, Link, Tailwind, Text, Container, Section } from "@react-email/components";
import { Html } from "@react-email/html";
import * as React from "react";

interface ConfirmationTemplateProps {
  domain: string;
  token: string;
}

export function ConfirmationTemplate({ domain, token }: ConfirmationTemplateProps) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Body className="bg-gray-100 text-black font-sans">
          <Container className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto mt-10">
            <Section className="text-center mb-6">
              <Heading className="text-2xl font-bold text-blue-600">
                Email Confirmation
              </Heading>
            </Section>

            <Text className="text-gray-700 leading-6">
              Hello! Thank you for registering. To verify your email address,
              please click the button below:
            </Text>

            <Section className="text-center my-6">
              <Link
                href={confirmLink}
                className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg text-base font-medium no-underline"
              >
                Confirm Email
              </Link>
            </Section>

            <Text className="text-gray-700 leading-6">
              This verification link will remain valid for <strong>1 hour</strong>.
              If you didn’t request this action, you can safely ignore this email.
            </Text>

            <Text className="text-gray-400 text-sm mt-10 text-center">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}