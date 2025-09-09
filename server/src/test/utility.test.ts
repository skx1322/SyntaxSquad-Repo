import { IDUtil } from "../utils/UUID";

let i = 0;
while (i < 10) {
    console.log(await IDUtil.NewUUID(4, false));
    i++;
}
console.log(await IDUtil.NewUUID(4, false));