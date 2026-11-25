// Build-time inventory shared by sitemap and sample metadata generation.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

export function readSamples(root) {
  const file = ts.createSourceFile("samples.ts", readFileSync(join(root, "src/lib/samples.ts"), "utf8"), ts.ScriptTarget.Latest, true);
  const declaration = file.statements.flatMap((statement) => ts.isVariableStatement(statement) ? [...statement.declarationList.declarations] : []).find((item) => item.name.getText(file) === "SAMPLES");
  if (!declaration || !ts.isArrayLiteralExpression(declaration.initializer)) throw new Error("SAMPLES array missing");
  return declaration.initializer.elements.map((element) => {
    const item = {};
    for (const prop of element.properties ?? []) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = prop.name.getText(file).replaceAll('"', "");
      const value = prop.initializer;
      if (ts.isStringLiteral(value)) item[key] = value.text;
      else if (value.kind === ts.SyntaxKind.TrueKeyword) item[key] = true;
      else if (ts.isArrayLiteralExpression(value)) item[key] = value.elements.filter(ts.isStringLiteral).map((entry) => entry.text);
    }
    return item;
  }).filter((item) => item.slug);
}

export function readIndustryKeys(root, samples = readSamples(root)) {
  const source = readFileSync(join(root, "src/lib/industryLanding.ts"), "utf8");
  return [...source.matchAll(/^ {2}"?([a-z-]+)"?: \{$/gm)].map((match) => match[1]).filter((key) => samples.some((sample) => sample.premium && (sample.industryKey === key || (key === "real-estate" && sample.industryKey === "estate"))));
}
