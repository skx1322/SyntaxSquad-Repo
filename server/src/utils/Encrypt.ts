export namespace HuaUtil {
    export async function Bcrypt(password: string): Promise<string> {
        const hashPass = await Bun.password.hash(password, {
            algorithm: "bcrypt",
            cost: 16,
        })
        return hashPass;
    };

    export async function VerifyBcrypt(password: string, hash: string): Promise<boolean> {
        const passVeri = await Bun.password.verify(password, hash);
        return passVeri;
    };
};

