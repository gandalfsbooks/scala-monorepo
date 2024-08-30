const Ajv = require("ajv");
const yaml = require("js-yaml");
const fs = require("fs");

if (process.argv.length < 3) {
    console.error("Usage: node validate.js <path to opslevel.yml>");
    process.exit(1);
}

const filePath = process.argv[2];

try {
    // Load the schema from the opslevel.schema.yml file
    const schemaContents = fs.readFileSync("opslevel.schema.yml", "utf8");
    const schema = yaml.load(schemaContents);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    // Load and validate the specified opslevel.yml file
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents);

    const valid = validate(data);

    if (!valid) {
        console.error(`Validation errors in ${filePath}:`, validate.errors);
        process.exit(1);
    } else {
        console.log(`${filePath} is valid.`);
    }
} catch (e) {
    console.error(`Error reading or parsing ${filePath}:`, e);
    process.exit(1);
}
