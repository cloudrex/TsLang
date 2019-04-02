import Generator from "./generator";
import {IRBuilder} from "llvm-node";

export const returnGen: Generator<IRBuilder> = ($) => {
    /**
     * Generator legend:
     * 
     * -
     */

    // TODO: Temporarily force-return void.
    $.target.createRetVoid();
};
