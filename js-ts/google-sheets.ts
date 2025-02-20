import { google } from "googleapis";

export async function appendDataToSheet(data: string[][]) {
  try {
    const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH;
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const sheetName = process.env.SHEET_NAME;
    const range = process.env.RANGE;

    if (!credentialsPath || !spreadsheetId || !sheetName || !range) {
      console.error(
        "Environment variables are missing. Please check your .env.local file.",
      );
      return { success: false, error: "Missing environment variables" };
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!${range}`, // e.g., 'Sheet1!A1'
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: data,
      },
    });

    if (response.status === 200 || response.status === 201) {
      return { success: true, updates: response.data.updates };
    } else {
      console.error(
        "Error appending data:",
        response.status,
        response.statusText,
      );
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }
  } catch (error: unknown) {
    console.error("Failed to append data to sheet:", error);
    return {
      success: false,
      error: (error as Error).message || "Unknown error",
    };
  }
}
