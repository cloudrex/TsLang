import {IToken, TokenDefinition, TokenDef} from "./syntaxAnalysis/token";
import {Tokenizer} from "./syntaxAnalysis/tokenizer";
import fs from "fs";
import path from "path";
import Util from "./core/util";

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

// TODO: "import \"path\";export fn main : int { ret }", comes out:
/**
 * [ { type: 'KeywordImport', value: 'import' },
  { type: 'Id', value: 'path' },
  { type: 'SymbolSemiColon', value: ';' },
  { type: 'Id', value: 'xport' },

  As we can see, the 'e' is skipped from 'export' when bunched together.
 */

const input: string = `import 'a' "a b c" export ; : { } fn`;
const tokenDefsPath: string = path.resolve("src/tokens.json");
const tokenDefs: Array<TokenDef> = TokenDefinition.fromObj(JSON.parse(Util.removeJsonComments(fs.readFileSync(tokenDefsPath).toString())));
const tokenizer: Tokenizer = Tokenizer.create(new Map(tokenDefs));
const tokens: IToken[] = tokenizer.tokenize(input);

console.log(tokens);
