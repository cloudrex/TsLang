import Generator from "./generator";
import {AllocaInst, Type, ConstantFP, LLVMContext, ConstantInt, Constant} from "llvm-node";
import {types, constantFactories} from "../core/constant";
import Util from "../core/util";

export type ConstantFactory = ConstantInt | ConstantFP;

export type ConstantFactoryCallback = (context: LLVMContext, value: number) => ConstantFactory;

export const declarationGen: Generator = ($, stream) => {
    /**
     * Generator legend:
     * 
     * [0] Token.Id : Declaration type
     * [1] Token.Id : Name allocation
     * [2] Token.OpAssign : Prepare assignment
     * [3] Token.NumLiteral : Assign value
     * [4] Token.SymbolSemiColon : void
     */

    const typeValue: string = stream.get().value;

    if (!types.has(typeValue)) {
        throw new Error(`Invalid variable declaration type: ${typeValue}`);
    }

    const type: Type = types.get(typeValue)!($.pointer.context);
    const allocaInst: AllocaInst = $.builder.createAlloca(type);

    // Assign name.
    allocaInst.name = stream.next().value;

    // Ensure corresponding constant factory exists.
    if (!constantFactories.has(typeValue)) {
        throw new Error(`No corresponding constant factory exists for type: ${typeValue}`);
    }

    // Create the constant factory.
    const constantFactory: ConstantFactoryCallback =  constantFactories.get(typeValue)!;

    // Create the value.
    const value: ConstantFactory = constantFactory($.pointer.context, Util.parseNumeric(stream!.at(3)!.value));

    // Create the store instruction & assign the value.
    $.builder.createStore(value, allocaInst);

    // Skip remaining tokens.
    stream.skip(5);
};
