export namespace FileUtil {
    export async function getFileBuffer(i: File) {
        try {
            const buffer = await i.arrayBuffer();
            const fileBuffer = Buffer.from(buffer);
            return fileBuffer;
        } catch (error) {
            throw Error("Failed to convert file into buffers.")
        }
    }
};

