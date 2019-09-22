/**
 * The definition of the Bril language.
 */

/**
 * A variable name.
 */
export type Ident = string;

/**
 * Value types.
 */
export type Type = "int" | "bool" | Ident;

/**
 * An instruction that does not produce any result.
 */
export interface EffectOperation {
  op: "br" | "jmp" | "print" | "ret";
  args: Ident[];
}

/**
 * An operation that produces a value and places its result in the
 * destination variable.
 */
export interface ValueOperation {
  op: "add" | "mul" | "sub" | "div" |
      "id" | "nop" | "access" |
      "eq" | "lt" | "gt" | "ge" | "le" | "not" | "and" | "or";
  args: Ident[];
  dest: Ident;
  type: Type;
}

/**
 * An operation that produces a record value and places its result in the
 * destination variable.
 */
export interface RecordValueOperation {
  op: "record";
  args: {[index: string]: Ident};
  dest: Ident;
  type: Type;
}

/**
 * The type of Bril values that may appear in constants.
 */
export type Value = number | boolean;

/**
 * An instruction that places a literal value into a variable.
 */
export interface Constant {
  op: "const";
  value: Value;
  dest: Ident;
  type: Type;
}

export interface RecordType {
  [field:string] : Type;
}

export interface RecordDef {
  op: "type";
  name: Ident;
  fields: RecordType;
}

/**
 * Operations take arguments, which come from previously-assigned identifiers.
 */
export type Operation = EffectOperation | ValueOperation | RecordValueOperation;

/**
 * Instructions can be operations (which have arguments) or constants (which
 * don't). Both produce a value in a destination variable.
 */
export type Instruction = Operation | Constant | RecordDef;

/**
 * Both constants and value operations produce results.
 */
export type ValueInstruction = Constant | ValueOperation;

/**
 * The valid opcodes for value-producing instructions.
 */
export type ValueOpCode = ValueOperation["op"];

/**
 * The valid opcodes for effecting operations.
 */
export type EffectOpCode = EffectOperation["op"];

/**
 * All valid operation opcodes.
 */
export type OpCode = ValueOpCode | EffectOpCode;

/**
 * Jump labels just mark a position with a name.
 */
export interface Label {
  label: Ident;
}

/**
 * A function consists of a sequence of instructions.
 */
export interface Function {
  name: Ident;
  instrs: (Instruction | Label)[];
}

/**
 * A program consists of a set of functions, one of which must be named
 * "main".
 */
export interface Program {
  functions: Function[];
}
