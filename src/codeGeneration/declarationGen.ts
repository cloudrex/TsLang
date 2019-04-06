import Generator from "./generator";
import {AllocaInst, Type, ConstantInt, IRBuilder} from "llvm-node";

export const declarationGen: Generator = ($, stream) => {
    /**
     * Generator legend:
     * 
     * [0] Token.TypeInt : Allocate INT32
     * [1] Token.Id : Name allocation
     * [2] Token.OpAssign : Prepare assignment
     * [3] Token.NumLiteral : Assign value
     */

    const intType: Type = Type.getInt32Ty($.pointer.context);
    const allocaInst: AllocaInst = $.builder.createAlloca(intType);

    // Assign name.
    allocaInst.name = stream!.at(1)!.value;

    // Create value.
    const value: ConstantInt = ConstantInt.get($.pointer.context, parseInt(stream!.at(3)!.value));

    // Assign value.
    $.builder.createStore(value, allocaInst);
};
