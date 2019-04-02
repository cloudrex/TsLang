import Generator from "./generator";
import {AllocaInst, Type, ConstantInt, IRBuilder} from "llvm-node";

export const declarationGen: Generator<IRBuilder> = ($, seq) => {
    /**
     * Generator legend:
     * 
     * [0] Token.TypeInt : Allocate INT32
     * [1] Token.Id : Name allocation
     * [2] Token.OpAssign : Prepare assignment
     * [3] Token.NumLiteral : Assign value
     */

    const intType: Type = Type.getInt32Ty($.pointer.context);
    const allocaInst: AllocaInst = $.target.createAlloca(intType);

    // Assign name.
    allocaInst.name = seq![1];

    // Create value.
    const value: ConstantInt = ConstantInt.get($.pointer.context, parseInt(seq![3]));

    // Assign value.
    $.target.createStore(value, allocaInst);
};
