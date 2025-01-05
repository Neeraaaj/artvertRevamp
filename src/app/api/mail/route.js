import { formidable } from 'formidable';
import { Readable } from 'stream';
import { render } from '@react-email/render';
import YelpRecentLoginEmail from '../../../../emails';
import { Resend } from 'resend';
import { uploadToGoogleDrive, addQuotationToSheet } from '@/components/addDetailsToSheet';

const resend = new Resend(process.env.RESEND_API_KEY);

// Use runtime for Node.js
export const runtime = 'nodejs'; // Use 'edge' for lightweight serverless functions

// Parse Form Data
const parseForm = async (req) => {
  const form = formidable({
    multiples: true, // Allow multiple file uploads
    uploadDir: '/tmp', // Temporary upload directory
    keepExtensions: true, // Preserve file extensions
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

// POST Handler
export async function POST(req) {
  try {
    // Convert NextRequest to IncomingMessage for parsing FormData
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    stream.headers = {
      ...req.headers,
      'content-type': req.headers.get('content-type') || 'application/octet-stream',
      'content-length': buffer.length,
    };

    const { fields, files } = await parseForm(stream);

    // Upload files to Google Drive
    const imageLinks = [];
    for (const fileKey in files) {
      const fileArray = Array.isArray(files[fileKey]) ? files[fileKey] : [files[fileKey]];
      for (const file of fileArray) {
        const link = await uploadToGoogleDrive(file);
        imageLinks.push(link);
      }
    }

    // Add data to Google Sheets
    await addQuotationToSheet(fields, imageLinks);

    // Email properties
    const emailProps = {
      userFirstName: fields.name,
      email: fields.email,
      project_type: fields.project_type,
      project_details: fields.project_details,
      contact_number: fields.contact_number,
      max_budget: fields.max_budget,
      number_of_walls: fields.number_of_walls,
      mural_type: fields.mural_type,
      loginDate: new Date(),
    };

    const emailComponent = <YelpRecentLoginEmail {...emailProps} />;
    const emailHtml = await render(emailComponent);

    const { data, error } = await resend.emails.send({
      from: 'Mural Interior <info@muralinterior.com>',
      to: ['achintchoudharyex@gmail.com', 'patilneeraj2003@gmail.com'],
      subject: 'Quotation Received',
      html: emailHtml,
      text: `
        Hi Achint Choudhary, 
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
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully', data }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

