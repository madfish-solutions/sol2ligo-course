/* Hacky script to concat all the compiler files in the correct order */

const path = require("path");
const fs = require("fs");

const libs = [
  "/common/fy.js",
  "/common/codegen.js",
  "/lib/config.js",
  "/common/type.js",
  "/lib/type_safe.js",
  "/common/ast4gen.js",
  "/lib/ast.js",
  "/lib/type_generalize.js",
  "/lib/translate_var_name.js",

  "/lib/type_inference/common.js",
  "/lib/type_inference/stage1.js",
  "/lib/type_inference/stage2.js",
  "/lib/type_inference.js",

  "/lib/translate_ligo.js",
  "/lib/translate_ligo_default_state.js",
  "/lib/solidity_to_ast4gen.js",
  "/lib/ast_builder.js",
  "/lib/transforms/default_walk.js",
  "/lib/transforms/collect_fn_call.js",
  "/lib/transforms/placeholder_replace.js",

  "/lib/transforms/var_translate.js",
  "/lib/transforms/require_distinguish.js",
  "/lib/transforms/fix_missing_emit.js",
  "/lib/transforms/fix_modifier_order.js",
  "/lib/transforms/for3_unpack.js",
  "/lib/transforms/math_funcs_convert.js",
  "/lib/transforms/ass_op_unpack.js",
  "/lib/transforms/modifier_unpack.js",
  "/lib/transforms/inheritance_unpack.js",
  "/lib/transforms/deep_check_storage_and_oplist_use.js",
  "/lib/transforms/decl_storage_and_oplist_inject.js",
  "/lib/transforms/mark_last.js",
  "/lib/transforms/router_collector.js",
  "/lib/transforms/add_router.js",
  "/lib/transforms/collect_fn_decl.js",
  "/lib/transforms/call_storage_and_oplist_inject.js",
  "/lib/transforms/replace_enums_by_nat.js",
  "/lib/transforms/intrinsics_converter.js",
  "/lib/transforms/erc20_converter.js",
  "/lib/transforms/erc721_converter.js",
  "/lib/transforms/return_op_list_count.js",
  "/lib/transforms/address_calls_converter.js",
  "/lib/transforms/split_nested_index_access.js",
  "/lib/transforms/erc_detector.js",
  "/lib/transforms/make_calls_external.js",
  "/lib/transforms/add_burn_address.js",
  "/lib/transforms/cast_to_address.js",
  "/lib/transforms/contract_object_to_address.js",
  "/lib/transforms/add_pow.js",
  "/lib/transforms/erc20_interface_converter.js",
  "/lib/transforms/erc721_interface_converter.js",
  "/lib/transforms/split_chain_assignment.js",

  "/lib/ast_transform.js",
];

const output = "/public/sol2ligo.js";

fs.writeFileSync(__dirname + output, ""); // truncate tho

for (const lib of libs) {
  const libContent = fs.readFileSync(__dirname + `/public${lib}`);
  fs.appendFileSync(__dirname + output, `/*${lib}*/${libContent}`);
}
