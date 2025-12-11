import {
  Body,
  Heading,
  Tailwind,
  Text,
  Container,
  Section,
} from "@react-email/components";
import { Html } from "@react-email/html";
import * as React from "react";

interface TwoFactorAuthTemplateProps {
  token: string;
}

export function TwoFactorAuthTemplate({ token }: TwoFactorAuthTemplateProps) {
  return (
    <Tailwind>
      <Html>
        <Body className="bg-gray-100 text-black font-sans">
          <Container className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto mt-10">
            <Section className="text-center mb-6">
              <Heading className="text-2xl font-bold text-blue-600">
                Two-Factor Authentication Code
              </Heading>
            </Section>

            <Text className="text-gray-700 leading-6 text-center">
              Use the verification code below to complete your login:
            </Text>

            <Section className="text-center my-6">
              <div className="inline-block bg-blue-100 text-blue-700 px-6 py-3 rounded-lg text-xl font-semibold tracking-widest">
                {token}
              </div>
            </Section>

            <Text className="text-gray-700 leading-6">
              Please enter this code in the application to finish the authentication process.
            </Text>

            <Text className="text-gray-700 leading-6">
              If you didn’t request this code, you can safely ignore this email.
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