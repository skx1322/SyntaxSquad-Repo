import { bucket_config } from "../config/S3";
import { acl } from "../types/other.type";
import { FileUtil } from "./Buffer"
import { IDUtil } from "./UUID";

export namespace BucektUtil {
    const s3 = bucket_config.S3();

    export async function uploadImage(image: File, perm: acl): Promise<string> {
        const buffer = await FileUtil.getFileBuffer(image);
        const fileExtension = image.name.split(".").pop();
        const uploadName = `${await IDUtil.NewUUID(2, true)}.${fileExtension}`;

        const s3File = s3.file(uploadName, {
            acl: perm,
            type: image.type
        })

        await Bun.write(s3File, buffer);
        return `${bucket_config.endpoint}/${bucket_config.bucket}/${uploadName}`;
    };

    export async function deleteImage(path: string): Promise<boolean> {
        const file = new URL(path).pathname.slice(15);
        const s3File = s3.file(file);

        const fileExist = await s3File.exists();
        if (!fileExist) {
            console.error(`File ${file} does not exist.`)
            return false;
        }

        await s3File.delete();
        const doubleCheck = await s3File.exists();
        if (doubleCheck) {
            console.error(`File ${file} unable to be delete.`)
            return false;
        };

        return true;
    };

    export async function visibilityConfig(path: string, expireIn: number = 900) {
        const s3File = s3.presign(path, {
            acl: "public-read",
            expiresIn: expireIn
        });

        return s3File;
    };
};
