import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function YelpRecentLoginEmail({
  userFirstName,
      email,
      project_type,
      project_details,
      contact_number,
      max_budget,
      number_of_walls,
      mural_type,
      loginDate
}) {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(loginDate);

  return (
    <Html>
      <Head />
      <Preview>Mural Interior Quotation Request</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img
              src="https://www.muralinterior.com/_next/image?url=%2Fimages%2FLogo1.png&w=1920&q=75"
              width="50"
              height="50"
              alt="Logo"
            />
          </Section>

          <Section style={content}>
            <Heading
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Hi Achint Choudhary
            </Heading>
            
            <Heading
              as="h2"
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              New quotation request from your website has been received 🎉
            </Heading>

            <Text style={paragraph}>
              <strong>Time: </strong>
              {formattedDate}
            </Text>
            
            <Text style={{ ...paragraph, marginTop: "-5px" }}>
              <strong>Customer Name: </strong>
              {userFirstName}
            </Text>
            
            <Text style={{ ...paragraph, marginTop: "-5px" }}>
              <strong>Customer Email: </strong>
              {email}
            </Text>

            <Text style={{ ...paragraph, marginTop: "-5px" }}>
              <strong>Customer Contact Number: </strong>
              {contact_number}
            </Text>

            <Text style={{ ...paragraph, marginTop: "-5px" }}>
              <strong>Mural Type: </strong>
              {mural_type}
            </Text>

            <Text style={{ ...paragraph, marginTop: "-5px" }}>
              <strong>Project Type: </strong>
              {project_type}
            </Text>

            <Text style={{ ...paragraph, marginTop: "-5px" }}>
              <strong>Project Details: </strong>
              {project_details}
            </Text>

            <Text style={{ ...paragraph, marginTop: "-5px" }}>
              <strong>Budget: </strong>
              {max_budget}
            </Text>

            <Text style={{ ...paragraph, marginTop: "-5px" }}>
              <strong>Number of Murals: </strong>
              {number_of_walls}
            </Text>
            
            

            <Button
              style={button}
              href="https://www.muralinterior.com"
            >
              View Request Details
            </Button>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2025 Mural Interior | All rights reserved
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const paragraph = {
  fontSize: "16px",
};

const logo = {
  padding: "30px 20px",
};

const content = {
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "3px",
  padding: "20px",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: "3px",
  color: "#ffffff",
  fontWeight: "bold",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
  textDecoration: "none",
  display: "inline-block",
  textAlign: "center",
  margin: "20px 0",
};