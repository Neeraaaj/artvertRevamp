import { formidable } from 'formidable';
import { Readable } from 'stream';
import fs from "fs";
import path from "path";
import { render } from "@react-email/render";
import YelpRecentLoginEmail from "../../../../emails";
import { Resend } from "resend";
import { uploadToGoogleDrive, addQuotationToSheet } from "@/components/addDetailsToSheet";
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser to handle FormData
  },
};

// export async function POST(req) {
  
//   try {
//     const body = await req.json();
//     console.log("Received body:", body); // Debug log

//     const { email, name, project_type, mural_type, number_of_walls, max_budget, project_details, contact_number, company_name, address, city, state, pincode, reference_images} = body;

//     // console.log(email, name, project_details, contact_number, max_budget, number_of_walls, mural_type, project_type); // Debug log
//     console.log("Attempting to add to Google Sheet..."); // Debug log

//     try {
//       const sheetData = {
//         name,
//         email,
//         contact_number,
//         project_type,
//         mural_type,
//         number_of_walls,
//         max_budget,
//         project_details,
//         company_name,
//         address,
//         city,
//         state,
//         pincode,
//         reference_images
//       };

//       console.log("Sheet data being sent:", sheetData); // Debug log
      
//       const sheetResult = await addQuotationToSheet(sheetData, []);
//       console.log("Sheet result:", sheetResult); // Debug log
//     } catch (sheetError) {
//       console.error('Error adding to Google Sheet:', sheetError);
//       // Continue with email sending even if sheet update fails
//     }
//     // Create email props
//     const emailProps = {
//       userFirstName: name,
//       email: email,
//       project_type: project_type,
//       project_details: project_details,
//       contact_number: contact_number,
//       max_budget: max_budget,
//       number_of_walls: number_of_walls,
//       mural_type: mural_type,
//       loginDate: new Date(), // Added loginDate
//     };

//     // Create the email component
//     const emailComponent = <YelpRecentLoginEmail {...emailProps} />;
    
//     try {
//       // Await the render process
//       const emailHtml = await render(emailComponent);
//       console.log('Rendered HTML:', emailHtml); // Debug log

//       const { data, error } = await resend.emails.send({
//         from: "Mural Interior <info@muralinterior.com>",
//         to: ["achintchoudharyex@gmail.com", "patilneeraj2003@gmail.com"],
//         subject: "Quotation Received",
//         html: emailHtml,
//         text: `Hi Achint Choudhary, 
//                A new quotation request from your website has been received.
//                Time: ${new Date().toLocaleString()}
//                Customer Name: ${name},
//                Customer Email: ${email},
//                Contact Number: ${contact_number},
//                 Project Type: ${project_type},
//                 Mural Type: ${mural_type},
//                 Number of Walls: ${number_of_walls},
//                 Max Budget: ${max_budget},
//                 Project Details: ${project_details},
//                `
//       });

//       if (error) {
//         console.error('Resend API error:', error);
//         return Response.json(
//           { error: error.message },
//           { status: 400 }
//         );
//       }

//       return Response.json(
//         { message: "Email sent successfully", data },
//         { status: 200 }
//       );

//     } catch (renderError) {
//       console.error('Email rendering error:', renderError);
//       return Response.json(
//         { error: 'Failed to render email template' },
//         { status: 500 }
//       );
//     }

//   } catch (err) {
//     console.error('Email sending error:', err);
//     return Response.json(
//       { error: err.message },
//       { status: 500 }
//     );
//   }
// }

const parseForm = async (req) => {
  const form = formidable({
    multiples: true, // Allow multiple file uploads
    uploadDir: "/tmp", // Temporary upload directory
    keepExtensions: true, // Preserve file extensions
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export async function POST(req) {
  try {
    // Convert `NextRequest` to a mock `IncomingMessage`
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
    const stream = Readable.from(buffer);

    // Attach required headers to the mock stream
    stream.headers = {
      ...req.headers,
      "content-type": req.headers.get("content-type") || "application/octet-stream", // Ensure content-type is set
      "content-length": buffer.length, // Set content-length explicitly
    };

    const { fields, files } = await parseForm(stream);

    console.log("Parsed fields:", fields);
    console.log("Uploaded files:", files);

    // Process uploaded files and upload to Google Drive
    const imageLinks = [];
    for (const fileKey in files) {
      const fileArray = Array.isArray(files[fileKey]) ? files[fileKey] : [files[fileKey]]; // Handle multiple files
      for (const file of fileArray) {
        const link = await uploadToGoogleDrive(file);
        imageLinks.push(link);
      }
    }

    console.log("Image links:", imageLinks);

    // Add data to Google Sheets
    await addQuotationToSheet(fields, imageLinks);

    const emailProps = {
            userFirstName: fields.name,
            email: fields.email,
            project_type: fields.project_type,
            project_details: fields.project_details,
            contact_number: fields.contact_number,
            max_budget: fields.max_budget,
            number_of_walls:fields. number_of_walls,
            mural_type: fields.mural_type,
            loginDate: new Date(), // Added loginDate
          };
      
          // Create the email component
          const emailComponent = <YelpRecentLoginEmail {...emailProps} />;
          
          try {
            // Await the render process
            const emailHtml = await render(emailComponent);
            console.log('Rendered HTML:', emailHtml); // Debug log
      
            const { data, error } = await resend.emails.send({
              from: "Mural Interior <info@muralinterior.com>",
              to: ["achintchoudharyex@gmail.com", "patilneeraj2003@gmail.com"],
              subject: "Quotation Received",
              html: emailHtml,
              text: `Hi Achint Choudhary, 
                     A new quotation request from your website has been received.
                     Time: ${new Date().toLocaleString()}
                     Customer Name: ${fields.name},
                     Customer Email: ${fields.email},
                     Contact Number: ${fields.contact_number},
                      Project Type: ${fields.project_type},
                      Mural Type: ${fields.mural_type},
                      Number of Walls: ${fields.number_of_walls},
                      Max Budget: ${fields.max_budget},
                      Project Details: ${fields.project_details},
                     `
            });
      
            if (error) {
              console.error('Resend API error:', error);
              return Response.json(
                { error: error.message },
                { status: 400 }
              );
            }
      
            return Response.json(
              { message: "Email sent successfully", data },
              { status: 200 }
            );
      
          } catch (renderError) {
            console.error('Email rendering error:', renderError);
            return Response.json(
              { error: 'Failed to render email template' },
              { status: 500 }
            );
          }

    return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}