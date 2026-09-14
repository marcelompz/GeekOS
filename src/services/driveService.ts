import { DriveFileItem } from "../types";

export async function listDriveFiles(accessToken: string): Promise<DriveFileItem[]> {
  const url = `https://www.googleapis.com/drive/v3/files?pageSize=25&orderBy=modifiedTime%20desc&fields=files(id,name,mimeType,modifiedTime,size,webViewLink,iconLink)&q=trashed=false`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error al listar archivos: ${res.status}`);
  }

  const data = await res.json();
  return data.files || [];
}

export async function createDevLogInDrive(
  accessToken: string,
  title: string,
  markdownBody: string
): Promise<{ id: string; name: string; webViewLink?: string }> {
  const boundary = "-------GeekOSDevLogBoundary" + Math.random().toString(36).substring(2);
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const fileName = `${title.replace(/[/\\?%*:|"<>]/g, "-")}.md`;

  const metadata = {
    name: fileName,
    mimeType: "text/markdown",
    description: "DevLog exportado desde la bitácora técnica de GeekOS",
  };

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: text/markdown; charset=UTF-8\r\n\r\n" +
    markdownBody +
    closeDelimiter;

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error al guardar en Google Drive: ${res.status}`);
  }

  return await res.json();
}

export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status !== 204) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error al eliminar archivo: ${res.status}`);
  }
}
