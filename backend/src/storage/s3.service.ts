import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const BUCKET_NAME = Deno.env.get("S3_BUCKET_NAME");
const AWS_REGION = Deno.env.get("AWS_REGION");

if (!BUCKET_NAME) {
  throw new Error("S3_BUCKET_NAME environment variable is not set");
}

if (!AWS_REGION) {
  throw new Error("AWS_REGION environment variable is not set");
}

const s3Client = new S3Client({ region: AWS_REGION });

class S3Service {
  async uploadFile(file: File, prefix = "profile-images"): Promise<string> {
    const ext = file.name.split(".").pop() || "jpg";
    const key = `${prefix}/${crypto.randomUUID()}.${ext}`;

    const buffer = new Uint8Array(await file.arrayBuffer());

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    return key;
  }

  async getFile(
    key: string,
  ): Promise<{ body: ReadableStream; contentType: string }> {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
    );

    return {
      body: response.Body as ReadableStream,
      contentType: response.ContentType || "application/octet-stream",
    };
  }

  async deleteFile(key: string): Promise<void> {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
    );
  }
}

export const s3Service = new S3Service();
