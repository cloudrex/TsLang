import {IToken, TokenDefinition, TokenDef} from "./SyntaxAnalysis/token";
import {Tokenizer} from "./SyntaxAnalysis/tokenizer";
import fs from "fs";
import path from "path";

/* import llvm, {BasicBlock} from "llvm-node";

function enterTopLevelFn() {
    //
}

const context = new llvm.LLVMContext();
const mod = new llvm.Module("Entry", context);

const fn = mod.getOrInsertFunction("main", llvm.FunctionType.get(llvm.Type.getVoidTy(context), false)) as llvm.Function;
const body = BasicBlock.create(context);

fn.addBasicBlock(body);

const b = new llvm.IRBuilder(context);

b.setInsertionPoint(body);
b.createRetVoid();

const intType = llvm.Type.getInt32Ty(context);
const initializer = llvm.ConstantInt.get(context, 0);

console.log(mod.print()); */

/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

const input: string = "fn _iD9 { }";
const tokenDefsPath: string = path.resolve("src/Tokens.json");
const tokenDefs: Array<TokenDef> = TokenDefinition.fromObj(JSON.parse(fs.readFileSync(tokenDefsPath).toString()));
const tokenizer: Tokenizer = Tokenizer.create(new Map(tokenDefs));
const tokens: IToken[] = tokenizer.tokenize(input);

console.log(tokens);
