import {IToken, TokenDefinition, TokenDef} from "./syntaxAnalysis/token";
import {Tokenizer} from "./syntaxAnalysis/tokenizer";
import TokenTypeUtil, {Token} from "./syntaxAnalysis/tokenType";
import TokenSequence from "./syntaxAnalysis/tokenSequence";
import Sequence from "./syntaxAnalysis/sequence";
import {LLVMContext, Module, IRBuilder, BasicBlock, FunctionType, Type} from "llvm-node";
import {declarationGen, IGeneratorContext, GeneratorBuilder, returnGen} from "./codeGeneration/generator";
import CodeMap from "./syntaxAnalysis/codeMap";
import colors from "colors";

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

// Things to consider:
/**
 * ConstantInt.getTrue()
 * ConstantInt.getFalse()
 * ConstantInt.getNullValue()
 */

/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

// TODO: "import \"path\";export fn main : int { ret }", comes out:
/**
 * [ { type: 'KeywordImport', value: 'import' },
  { type: 'Id', value: 'path' },
  { type: 'SymbolSemiColon', value: ';' },
  { type: 'Id', value: 'xport' },

  As we can see, the 'e' is skipped from 'export' when bunched together.
 */

const input: string = `int num4 = 5`;

const tokenDefs: Array<TokenDef> = TokenDefinition.fromObjLike(TokenTypeUtil.parseEnum(Token));
const tokenizer: Tokenizer = Tokenizer.create(new Map(tokenDefs));
const tokens: IToken[] = tokenizer.tokenize(input);
const sequenceHandler: TokenSequence = new TokenSequence(Sequence.declaration);

// Print out the tokenized tokens.
console.log("Tokens:", tokens);

const seq: string[] | null = sequenceHandler.exec(tokens);

// Ensure sequence was met.
if (seq === null) {
    console.log("Test sequence was not met");
    process.exit(-1);
}

// Create LLVM entities.
const context = new LLVMContext();
const mod = new Module("Entry", context);
const mainFn = mod.getOrInsertFunction("main", FunctionType.get(Type.getVoidTy(context), false)) as llvm.Function;
const body = BasicBlock.create(context);

mainFn.addBasicBlock(body);

// Create the IR builder.
const $ = new IRBuilder(context);

// Prepare the IR builder.
$.setInsertionPoint(body);

// Create the generator context.
const genContext: IGeneratorContext<IRBuilder> = {
    // Builder won't be used for now.
    builder: new GeneratorBuilder(null as any),

    context,
    map: new CodeMap(),
    target: $
};

// Invoke the assignment generator.
declarationGen(genContext, seq!);

// Generate required return statement.
returnGen(genContext);

// Print the LLVM IR code.
console.log("\n--- LLVM IR CODE OUTPUT ---\n");
console.log(colors.cyan(mod.print()));
