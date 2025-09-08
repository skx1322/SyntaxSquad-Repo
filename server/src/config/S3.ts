import { S3Client } from "bun";

export const bucket_config = {
    accessKeyId: Bun.env.DO_ACCESS_KEY_ID,
    secretAccessKey: Bun.env.DO_SECRET_ACCESS_KEY,
    bucket: Bun.env.DO_BUCKET,
    region: Bun.env.DO_REGION,
    endpoint: Bun.env.ENDPOINT,
    S3: function () {
        if (!this.accessKeyId || !this.secretAccessKey || !this.bucket || !this.region || !this.endpoint) {
            console.warn("Space Bucket is not properly set up in .env");
        };
        const s3 = new S3Client({
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
            bucket: this.bucket,
            region: this.region,
            endpoint: this.endpoint,
        });

        return s3;
    }
};