import { SegmentLimit } from "../types/other.type";
import { randomUUIDv5, randomUUIDv7 } from "bun";

export namespace IDUtil {
        /** 
        *@default
        *@param {SegmentLength} Number Range 0, 1, 2, 3, 4.
        *@param {Symbol} Boolean true/false, if true then output ID will have '-' else none.
        *@return {NewUUID(1, true)} 
        */
    export async function NewUUID(SegmentLength: SegmentLimit = 2, Symbol: boolean = true): Promise<string> {
        const uuid = randomUUIDv7("hex");
        if (!uuid) {
            throw Error("Something with wrong generating UUID HEX");
        }

        const idSegment = Symbol ? uuid.split("-").slice(SegmentLength, 5).join("-") : uuid.split("-").slice(SegmentLength, 5).join("");
        return idSegment
    }

    export async function FixedID(Reference: string, SegmentLength: SegmentLimit = 2, Symbol: boolean = true) {
        const uuid = randomUUIDv5(Reference, "oid", "hex");
        if (!uuid) {
            console.error("Something with wrong generating UUID HEX");
        };

        const idSegment = Symbol ? uuid.split("-").slice(SegmentLength, 5).join("-") : uuid.split("-").slice(SegmentLength, 5).join("");
        return idSegment
    }
}

