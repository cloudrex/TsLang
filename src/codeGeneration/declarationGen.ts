import Generator from "./generator";
import {AllocaInst, Type, ConstantInt, ConstantFP} from "llvm-node";
import {types} from "../core/constant";

export const declarationGen: Generator = ($, stream) => {
    /**
     * Generator legend:
     * 
     * [0] Token.Id : Declaration type
     * [1] Token.Id : Name allocation
     * [2] Token.OpAssign : Prepare assignment
     * [3] Token.NumLiteral : Assign value
     */

    const typeValue: string = stream.get().value;

    if (!types.has(typeValue)) {
        throw new Error("Invalid variable declaration type specified");
    }

    const type: Type = types.get(typeValue)!($.pointer.context);
    const allocaInst: AllocaInst = $.builder.createAlloca(type);

    // Assign name.
    allocaInst.name = stream!.at(1)!.value;

    // Create value.
    // TODO: parseInt or parseFloat (also ConstantInt/ConstantFP). Should decide automatically.
    const value: ConstantInt = ConstantFP.get($.pointer.context, parseFloat(stream!.at(3)!.value));

    // Assign value.
    $.builder.createStore(value, allocaInst);
};
