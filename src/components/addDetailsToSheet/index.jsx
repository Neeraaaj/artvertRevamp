import { google } from 'googleapis';
import { Readable } from 'stream';
import fs from "fs";

// Initialize Google Sheets API
const initializeGoogleSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
};

// Upload image to Google Drive and get shareable link
const uploadToGoogleDrive = async (file) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });
  console.log("inside the uploadToGoogleDrive function", process.env.GOOGLE_DRIVE_FOLDER_ID);
  const fileMetadata = {
    name: file.originalFilename,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Specify folder ID
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.filepath), // Use the correct file path
  };

  try {
    const driveResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: driveResponse.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return `https://drive.google.com/file/d/${driveResponse.data.id}/view`;
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    throw error;
  }
};

// Add row to Google Sheet
const addQuotationToSheet = async (quotationData, imageLinks) => {
  console.log("inside the addQuotationToSheet function");
  const sheets = await initializeGoogleSheets();
  
  const flatten = (value) => (Array.isArray(value) ? value[0] : value) || ''; // Use the first element or an empty string

  const values = [[
    new Date().toISOString(), // Timestamp
    flatten(quotationData.name),
    flatten(quotationData.email),
    flatten(quotationData.contact_number),
    flatten(quotationData.project_type),
    flatten(quotationData.mural_type),
    flatten(quotationData.number_of_walls),
    flatten(quotationData.max_budget),
    flatten(quotationData.project_details),
    flatten(quotationData.company_name),
    flatten(quotationData.address),
    flatten(quotationData.city),
    flatten(quotationData.state),
    flatten(quotationData.pincode),
    imageLinks.join(', ') // Comma-separated image links
  ]];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:O', // Adjust range based on your columns
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });
    
    return true;
  } catch (error) {
    console.error('Error adding to sheet:', error);
    throw error;
  }
};

export { initializeGoogleSheets, uploadToGoogleDrive, addQuotationToSheet };