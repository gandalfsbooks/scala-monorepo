const Ajv = require("ajv");
const yaml = require("js-yaml");
const fs = require("fs");

try {
    // Load the schema from the opslevel.schema.yml file
    const schemaContents = fs.readFileSync("opslevel.schema.yml", "utf8");
    const schema = yaml.load(schemaContents);

    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    // Load and validate the opslevel.yml file
    const fileContents = fs.readFileSync("opslevel.yml", "utf8");
    const data = yaml.load(fileContents);

    const valid = validate(data);

    if (!valid) {
        console.error("Validation errors:", validate.errors);
        process.exit(1);
    } else {
        console.log("opslevel.yml is valid.");
    }
} catch (e) {
    console.error("Error reading or parsing files:", e);
    process.exit(1);
}
